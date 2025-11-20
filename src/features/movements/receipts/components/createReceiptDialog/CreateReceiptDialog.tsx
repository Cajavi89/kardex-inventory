'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { SelectDropdown } from '@/components/SelectDropdown'
import { useState, useEffect, Activity } from 'react'
import { getAllSuppliersSimple } from '@/features/suppliers/services/suppliers.service'
import { X } from 'lucide-react'
import { BiSolidAddToQueue } from 'react-icons/bi'
import { addReceipt } from '../../services/receipts.service'
import { InputMoney } from '@/components/inputMoney/InputMoney'

/* ------------------ SCHEMAS ------------------ */

// schema del item
const itemSchema = z.object({
  product: z.string().min(1, 'Requerido'),
  qty: z.number().min(1),
  price: z.number().min(0)
})

// STEP 1: solo datos de la factura
const step1Schema = z.object({
  id: z.uuid().optional(),
  supplier_id: z.string().min(1, 'El proveedor es obligatorio'),
  receipt_code: z.string().min(1, 'El código de recibo es obligatorio'),
  receipt_date: z.string().min(1, 'La fecha de recibo es obligatoria'),
  reference_document: z.string().optional(),
  subtotal: z.number().optional(),
  tax: z.number().optional(),
  total: z.number().optional(),
  transport: z.number().optional(),
  discount: z.number().optional(),
  status: z
    .enum(['pending', 'completed', 'cancelled', 'in_progress'])
    .optional(),
  comments: z.string().optional()
})

// STEP 2: solo items
const step2Schema = z.object({
  items: z.array(itemSchema).min(1, 'Debes agregar al menos 1 item')
})

// schema final
const formSchema = step1Schema.merge(step2Schema)

type TFormValues = z.output<typeof formSchema>

/* ------------------------------------------------------------- */

export const CreateReceiptDialog = () => {
  const [step, setStep] = useState(1)
  const [suppliers, setSuppliers] = useState<{ name: string; id: string }[]>([])
  const [isLoadingSuppliers, setIsLoadingSuppliers] = useState(true)

  const form = useForm<TFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplier_id: '',
      receipt_code: '',
      receipt_date: '',
      reference_document: '',
      subtotal: undefined,
      tax: undefined,
      total: undefined,
      transport: undefined,
      discount: undefined,
      status: undefined,
      comments: '',
      items: []
    }
  })

  /* ------------------ Items logic (step 2) ------------------ */

  const items = form.watch('items')

  const addItem = () => {
    const blank = { product: '', qty: 1, price: 0 }
    form.setValue('items', [...items, blank])
  }

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index)
    form.setValue('items', newItems)
  }

  /* ------------------ Handle NEXT step ------------------ */

  const handleNextStep = async () => {
    if (step === 1) {
      // Validar SOLO Step 1
      const values = form.getValues()
      const check = step1Schema.safeParse(values)

      if (!check.success) {
        // forzar que react-hook-form muestre errores
        check.error.issues.forEach((issue) => {
          form.setError(issue.path.join('.') as never, {
            message: issue.message
          })
        })
        return
      }

      // --------------------
      // Crear factura en Supabase
      // --------------------
      const payload = { ...check.data }
      delete payload.id // no enviar id vacío
      // delete payload.items // no existe aquí

      const receiptId = await addReceipt({ receiptData: payload })

      // Guardar ID en el form para Step 2
      form.setValue('id', receiptId)

      // Avanzar
      setStep(2)
    }
  }

  /* ------------------ SUBMIT all (Step 2) ------------------ */

  const onSubmit = async (values: TFormValues) => {
    // Validar SOLO Step 2
    const check = step2Schema.safeParse({ items: values.items })

    if (!check.success) {
      check.error.issues.forEach((issue) => {
        form.setError(issue.path.join('.') as never, { message: issue.message })
      })
      return
    }

    // Insertar items en Supabase
    const receipt_id = values.id
    if (!receipt_id) {
      console.error('No hay id de factura')
      return
    }

    const inserts = values.items.map((item) => ({
      receipt_id,
      product: item.product,
      qty: item.qty,
      price: item.price
    }))
    console.log('🚀 ~ onSubmit ~ inserts:', inserts)

    // const { error } = await addReceiptItemsDB(inserts)

    // if (error) {
    //   console.error(error)
    //   return
    // }

    console.log('FACTURA COMPLETA', values)
    onCancelHandler()
  }

  /* ------------------ Cancel ------------------ */

  const onCancelHandler = () => {
    form.reset()
    setStep(1)
  }

  /* ------------------ load suppliers ------------------ */

  useEffect(() => {
    getAllSuppliersSimple()
      .then((list) => setSuppliers(list || []))
      .finally(() => setIsLoadingSuppliers(false))
  }, [])

  /* ============================================================= */

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Agregar entrada de</Button>
      </DialogTrigger>

      <DialogContent className="w-full min-h-[400px] max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Agregar entrada de inventario</DialogTitle>
          <DialogDescription className="flex flex-row justify-between items-center">
            <span>Paso {step} de 2</span>
            <Activity mode={step === 1 ? 'hidden' : 'visible'}>
              <Button type="button" onClick={addItem}>
                <BiSolidAddToQueue />
                Agregar item
              </Button>
            </Activity>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col flex-1 min-h-0"
          >
            <div className="flex-1 overflow-y-auto px-1 pb-4">
              {/* ====================== STEP 1 ====================== */}
              {step === 1 && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="supplier_id"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Proveedor</FormLabel>
                            <SelectDropdown
                              className="min-w-full max-w-full"
                              defaultValue={field.value?.toString()}
                              onValueChange={field.onChange}
                              placeholder="Seleccionar proveedor"
                              activeFilter={true}
                              isPending={isLoadingSuppliers}
                              options={suppliers.map((supplier) => ({
                                value: supplier.id.toString(),
                                label: supplier.name.toString()
                              }))}
                            />

                            <FormMessage />
                          </FormItem>
                        )
                      }}
                    />
                    <FormField
                      control={form.control}
                      name="receipt_code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Código de recibo</FormLabel>
                          <FormControl>
                            <Input placeholder="PR-001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="receipt_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha de recibo</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="reference_document"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Documento de referencia</FormLabel>
                          <FormControl>
                            <Input placeholder="FAC-123" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subtotal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subtotal</FormLabel>
                          <FormControl>
                            <InputMoney
                              value={field.value}
                              onChange={field.onChange}
                              maxIntegers={15} // opcional
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tax"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Impuesto (IVA)</FormLabel>
                          <FormControl>
                            <InputMoney
                              value={field.value}
                              onChange={field.onChange}
                              maxIntegers={15} // opcional
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="total"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total</FormLabel>
                          <FormControl>
                            <InputMoney
                              value={field.value}
                              onChange={field.onChange}
                              maxIntegers={15} // opcional
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="transport"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Transporte</FormLabel>
                          <FormControl>
                            <InputMoney
                              value={field.value}
                              onChange={field.onChange}
                              maxIntegers={15} // opcional
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="discount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descuento</FormLabel>
                          <FormControl>
                            <InputMoney
                              value={field.value}
                              onChange={field.onChange}
                              maxIntegers={15} // opcional
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado</FormLabel>
                          <SelectDropdown
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                            placeholder="Seleccionar estado"
                            options={[
                              { label: 'Pendiente', value: 'pending' },
                              { label: 'Completado', value: 'completed' },
                              { label: 'Cancelado', value: 'cancelled' },
                              { label: 'En progreso', value: 'in_progress' }
                            ]}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-6">
                    <FormField
                      control={form.control}
                      name="comments"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Comentarios</FormLabel>
                          <FormControl>
                            <textarea
                              className="border rounded-md px-3 py-2 w-full min-h-[100px] resize-y"
                              placeholder="Opcional"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {/* ====================== STEP 2 - ITEMS ====================== */}
              {step === 2 && (
                <div className="space-y-4 min-h-full">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">
                      Items de la factura
                    </h3>
                  </div>

                  {items.length === 0 && (
                    <p className="text-sm text-gray-500">
                      No has agregado ningún item aún.
                    </p>
                  )}

                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="border p-4 rounded-md grid grid-cols-12 gap-3"
                    >
                      {/* PRODUCTO */}
                      <FormField
                        control={form.control}
                        name={`items.${index}.product`}
                        render={({ field }) => (
                          <FormItem className="col-span-5">
                            <FormLabel>Producto</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Nombre / Código" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* CANTIDAD */}
                      <FormField
                        control={form.control}
                        name={`items.${index}.qty`}
                        render={({ field }) => (
                          <FormItem className="col-span-3">
                            <FormLabel>Cantidad</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                value={field.value}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* PRECIO */}
                      <FormField
                        control={form.control}
                        name={`items.${index}.price`}
                        render={({ field }) => (
                          <FormItem className="col-span-3">
                            <FormLabel>Precio</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                value={field.value}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* REMOVE */}
                      <div className="col-span-1 flex items-end">
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeItem(index)}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ====================== FOOTER ====================== */}
            <DialogFooter className="border-t border-gray-200 p-4">
              <div className="flex justify-between w-full">
                <DialogClose asChild>
                  <Button type="button" onClick={onCancelHandler}>
                    Cancelar
                  </Button>
                </DialogClose>

                <div className="space-x-2">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setStep(step - 1)}
                    >
                      Volver
                    </Button>
                  )}

                  {step === 1 && (
                    <Button type="button" onClick={handleNextStep}>
                      Siguiente
                    </Button>
                  )}

                  {step === 2 && (
                    <Button type="submit" variant="secondary">
                      Crear
                    </Button>
                  )}
                </div>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
