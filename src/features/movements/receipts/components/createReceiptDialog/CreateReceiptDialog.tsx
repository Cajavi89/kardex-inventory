'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
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
import { useEffect, useState } from 'react'
import { getAllSuppliersSimple } from '@/features/suppliers/services/suppliers.service'

const formSchema = z.object({
  proveedor: z.string().min(1, 'El proveedor es obligatorio'),
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

type TFormValues = z.output<typeof formSchema>
export const CreateReceiptDialog = () => {
  const [suppliers, setSuppliers] = useState<{ name: string; id: string }[]>([])
  const [isLoadingSuppliers, setIsLoadingSuppliers] = useState(true)
  //
  const form = useForm<TFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      proveedor: '',
      receipt_code: '',
      receipt_date: '',
      reference_document: '',
      subtotal: undefined,
      tax: undefined,
      total: undefined,
      transport: undefined,
      discount: undefined,
      status: undefined,
      comments: ''
    }
  })

  const onSubmit = (values: TFormValues) => {
    console.log(values)
  }

  const onCancelHandler = () => {
    form.reset()
  }

  useEffect(() => {
    setTimeout(() => {
      getAllSuppliersSimple()
        .then((suppliersList) => setSuppliers(suppliersList || []))
        .finally(() => setIsLoadingSuppliers(false))
    }, 3000)
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Agregar entrada de</Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Agregar entrada de inventario</DialogTitle>
          <DialogDescription>
            Agregar una nueva entrada de inventario a la plataforma.
          </DialogDescription>
        </DialogHeader>
        {/* FORM */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-h-[80vh] overflow-auto p-1"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="proveedor"
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
              {/* Código de recibo */}
              <FormField
                control={form.control}
                name="receipt_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código de recibo</FormLabel>
                    <FormControl>
                      <Input placeholder="ABC-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Fecha de recibo */}
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

              {/* Documento de referencia */}
              <FormField
                control={form.control}
                name="reference_document"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Documento de referencia</FormLabel>
                    <FormControl>
                      <Input placeholder="Opcional" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Subtotal */}
              <FormField
                control={form.control}
                name="subtotal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subtotal</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={field.value ?? ''}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Impuesto */}
              <FormField
                control={form.control}
                name="tax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Impuesto</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={field.value ?? ''}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Total */}
              <FormField
                control={form.control}
                name="total"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={field.value ?? ''}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Transporte */}
              <FormField
                control={form.control}
                name="transport"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transporte</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={field.value ?? ''}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Descuento */}
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descuento</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={field.value ?? ''}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status */}
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
            {/* COMMENTS al final, full width */}
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
          </form>
        </Form>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <section>
              <Button onClick={onCancelHandler} type="button">
                Cancelar
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={form.handleSubmit(onSubmit)}
              >
                Crear
              </Button>
            </section>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
