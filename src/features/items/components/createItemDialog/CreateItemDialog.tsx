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
import { useState, useEffect } from 'react'
import { getAllCategoriesSimple } from '@/features/categories/services/categories.service'

/* ------------------ SCHEMAS ------------------ */

// schema del item
const itemSchema = z.object({
  name: z.string().min(1, 'Requerido'),
  code: z.string().min(1, 'Requerido'),
  category_id: z.string().min(1, 'Requerido'),
  unit_id: z.number().min(1, 'Requerido'),
  min_stock: z.string().min(0).optional(),
  active: z.boolean().optional()
})

// schema final

type TFormValues = z.output<typeof itemSchema>

/* ------------------------------------------------------------- */

export const CreateItemDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [categoriesList, setCategoriesList] = useState<
    { id: string; name: string }[]
  >([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)

  const form = useForm<TFormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: '',
      code: '',
      category_id: undefined,
      unit_id: undefined,
      min_stock: '',
      active: true
    }
  })

  /* ------------------ SUBMIT all (Step 2) ------------------ */

  const onSubmit = async (values: TFormValues) => {
    console.log('en el submit')
    const check = itemSchema.safeParse(values)

    if (!check.success) {
      console.log('dentro')
      check.error.issues.forEach((issue) => {
        form.setError(issue.path.join('.') as never, { message: issue.message })
      })
      return
    }
    console.log('🚀 ~ onSubmit ~ values:', values)
    onCancelHandler()
  }

  /* ------------------ Cancel ------------------ */

  const onCancelHandler = () => {
    form.reset()
    setIsOpen(false)
  }

  /* ------------------ load DATA ------------------ */

  useEffect(() => {
    getAllCategoriesSimple()
      .then((list) => setCategoriesList(list || []))
      .finally(() => setIsLoadingCategories(false))
  }, [])

  /* ============================================================= */

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Agregar ítem</Button>
      </DialogTrigger>

      <DialogContent className="w-full min-w-[600px] min-h-[400px] max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Agregar ítem</DialogTitle>
          <DialogDescription className="flex flex-row justify-between items-center">
            Agregar un nuevo tipo de ítem al inventario
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col flex-1 min-h-0"
          >
            <div className="flex-1 overflow-y-auto px-1 pb-4">
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="category_id"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Categoría</FormLabel>
                          <SelectDropdown
                            className="min-w-full max-w-full"
                            defaultValue={field.value?.toString()}
                            onValueChange={field.onChange}
                            placeholder="Seleccionar categoría"
                            activeFilter={true}
                            isPending={isLoadingCategories}
                            options={categoriesList.map((category) => ({
                              value: category.id.toString(),
                              label: category.name.toString()
                            }))}
                          />

                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Propalcote 150" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código</FormLabel>
                        <FormControl>
                          <Input placeholder="PCT-150" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="min_stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock mínimo</FormLabel>
                        <FormControl>
                          <Input placeholder="10" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* <FormField
                    control={form.control}
                    name="active"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Activo</FormLabel>
                        <SelectDropdown
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                          placeholder="Seleccionar estado"
                          options={[
                            { label: 'Activo', value: true },
                            { label: 'Inactivo', value: false }
                          ]}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </div>
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
