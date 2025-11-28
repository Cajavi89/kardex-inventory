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
import { useState } from 'react'
import { toast } from 'sonner'
import { createCustomer } from '../../services/customers.service'
import { customersColumnsNames } from '../../constants/itemsColumnsNames'

/* ------------------ SCHEMAS ------------------ */

// schema del item
const customerSchema = z.object({
  name: z.string().min(1, 'Requerido'),
  address: z.string().optional(),
  document: z.string().optional(),
  email: z.email('Correo inválido').optional(),
  phone: z.string().optional()
})

// schema final

type TFormValues = z.output<typeof customerSchema>

/* ------------------------------------------------------------- */

export const CreateCustomerDialog = () => {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<TFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      address: '',
      document: '',
      email: '',
      phone: ''
    }
  })

  /* ------------------ SUBMIT all (Step 2) ------------------ */

  const onSubmit = async (values: TFormValues) => {
    const check = customerSchema.safeParse(values)

    if (!check.success) {
      check.error.issues.forEach((issue) => {
        form.setError(issue.path.join('.') as never, { message: issue.message })
      })
      return
    }
    const createNewCustomer = createCustomer({ payload: values })

    toast.promise(createNewCustomer, {
      loading: 'Creando cliente...',
      success: 'Cliente creado con éxito',
      error: 'Error al crear el cliente'
    })
    onCancelHandler()
  }

  /* ------------------ Cancel ------------------ */

  const onCancelHandler = () => {
    form.reset()
    setIsOpen(false)
  }

  /* ============================================================= */

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Agregar cliente</Button>
      </DialogTrigger>

      <DialogContent className="w-full min-h-[400px] max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Agregar cliente</DialogTitle>
          <DialogDescription className="flex flex-row justify-between items-center">
            Agregar un nuevo cliente al sistema
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col flex-1 min-h-0"
          >
            <div className="flex-1 overflow-y-auto px-1 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{customersColumnsNames.name}</FormLabel>
                        <FormControl>
                          <Input placeholder="Alpina" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="document"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{customersColumnsNames.document}</FormLabel>
                      <FormControl>
                        <Input placeholder="11232345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{customersColumnsNames.phone}</FormLabel>
                      <FormControl>
                        <Input placeholder="(123) 456-7890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{customersColumnsNames.address}</FormLabel>
                      <FormControl>
                        <Input placeholder="Calle 123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{customersColumnsNames.email}</FormLabel>
                      <FormControl>
                        <Input placeholder="correo@ejemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* ====================== FOOTER ====================== */}
            <DialogFooter className="border-t border-gray-200 p-4">
              <div className="flex justify-between w-full">
                <DialogClose asChild>
                  <Button type="button" onClick={onCancelHandler}>
                    Cancelar
                  </Button>
                </DialogClose>

                <Button type="submit" variant="secondary">
                  Crear
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
