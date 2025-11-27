'use client'

import React, { useState } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Pencil, Check, X } from 'lucide-react'
import { IGetReceiptItemsById } from '../interfaces/receiptItems'
import { InputWithError } from '@/components/InputWithError'
import { toast } from 'sonner'
import {
  createReceiptItems,
  deleteReceiptItemsById,
  getReceiptItemsById,
  updateReceiptItemsById
} from '../services/receiptDetails.service'
import { FaRegTrashAlt } from 'react-icons/fa'
import { TooltipAssign } from '@/components/TooltipAssign'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { getAllItemsSimple } from '@/features/items/services/items.service'
import { SelectDropdown } from '@/components/SelectDropdown'
import { useForm, FormProvider, Controller } from 'react-hook-form'

export const rowSchemaBase = z.object({
  item_id: z.string().optional(),
  batch: z.string().min(1, 'El lote es obligatorio'),
  quantity: z.number().min(1, 'La cantidad debe ser mayor a 0'),
  unit_cost: z.number().min(1, 'El costo debe ser mayor a 0')
})

// Esquema de Creación: item_id es obligatorio
export const creationRowSchema = rowSchemaBase.extend({
  item_id: z.string().min(1, 'El ítem es obligatorio para la creación')
})

export type RowSchema = z.infer<typeof rowSchemaBase>

export const TableItemsDetail = ({
  receiptItemsData,
  receiptId
}: {
  receiptItemsData: IGetReceiptItemsById[]
  receiptId: string
}) => {
  const [editingRowId, setEditingRowId] = useState<string | null>(null)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [rowIdSelected, setRowIdSelected] = useState<string | null>(null)
  const [itemsList, setItemsList] = useState<{ name: string; id: string }[]>([])
  const [rowsData, setRowsData] =
    useState<IGetReceiptItemsById[]>(receiptItemsData)

  const [errors, setErrors] = useState<{
    item_id?: string
    batch?: string
    quantity?: string
    unit_cost?: string
  }>({})

  const [formData, setFormData] = useState<{
    item_id?: string
    batch: string
    quantity: number
    unit_cost: number
  }>({
    item_id: undefined,
    batch: '',
    quantity: 0,
    unit_cost: 0
  })

  const startEdit = (item: IGetReceiptItemsById) => {
    setErrors({})
    setEditingRowId(item.id)
    setFormData({
      item_id: item.item_id ?? undefined,
      batch: item.batch ?? '',
      quantity: item.quantity,
      unit_cost: item.unit_cost
    })
  }

  const cancelEdit = () => {
    // Si el ID que se está editando es un ID temporal (sin item_id), se elimina
    const isNewRow = rowsData.find(
      (row) => row.id === editingRowId && row.item_id === null
    )

    if (isNewRow) {
      setRowsData((prev) => prev.filter((row) => row.id !== editingRowId))
    }

    setEditingRowId(null)
    setErrors({})
  }

  const saveEdit = async (rowId: string, isNew: boolean) => {
    setErrors({})

    // Determinar qué esquema usar para la validación
    const schemaToUse = isNew ? creationRowSchema : rowSchemaBase

    // Solo incluimos item_id en el formData si estamos creando o si ya existe
    const dataToValidate = {
      ...formData,
      item_id: isNew ? formData.item_id : undefined // item_id solo se valida si es nueva fila
    }

    const result = schemaToUse.safeParse(dataToValidate)

    if (!result.success) {
      // Manejo de errores Zod
      const tree = z.treeifyError(result.error)
      setErrors({
        item_id: tree.properties?.item_id?.errors?.[0], // Aseguramos el error de item_id
        batch: tree.properties?.batch?.errors?.[0],
        quantity: tree.properties?.quantity?.errors?.[0],
        unit_cost: tree.properties?.unit_cost?.errors?.[0]
      })
      return
    }

    let promise: Promise<void>

    // Determinar la acción (Creación o Edición)
    if (isNew) {
      // crear
      const dataToCreate = {
        ...result.data, // Los datos validados por creationRowSchema (item_id incluido)
        receipt_id: receiptId
      }
      promise = createReceiptItems({ items: [dataToCreate] }) // Servicio POST
    } else {
      // editar
      // se usa el item_id original de la fila existente
      const existingRow = rowsData.find((r) => r.id === rowId)

      if (!existingRow?.item_id) {
        toast.error('Error: Item ID de fila existente no encontrado.')
        return
      }

      const updatedData = result.data // Los datos validados por rowSchemaBase

      promise = updateReceiptItemsById({
        rowReceiptId: rowId,
        itemId: existingRow.item_id,
        updatedData: {
          batch: updatedData.batch,
          quantity: updatedData.quantity,
          unit_cost: updatedData.unit_cost
        },
        receiptId
      })
    }
    toast.promise(promise, {
      loading: isNew ? 'Creando ítem...' : 'Guardando cambios...',
      success: isNew ? 'Ítem creado exitosamente' : 'Cambios guardados',
      error: isNew ? 'Error al crear el ítem' : 'Error al guardar los cambios'
    })
    // Se regresca la data fresca después de la operación
    promise.finally(() => {
      getReceiptItemsById(receiptId).then((freshData) => setRowsData(freshData))
    })

    // Si no hay errores, cerramos el modo de edición (asumiendo éxito inicial)
    setEditingRowId(null)
  }

  const addItemReceipt = () => {
    if (itemsList.length === 0) {
      getAllItemsSimple().then((list) => setItemsList(list || []))
    }
    const newRowId = crypto.randomUUID()

    const newRow: IGetReceiptItemsById = {
      id: newRowId,
      item_id: null, // Indicador de que es nueva fila y necesita item_id
      item_name: 'Seleccione Ítem...', // Placeholder para el ítem
      batch: '',
      quantity: 0,
      unit_cost: 0,
      receipt_id: receiptId,
      created_at: new Date().toISOString(),
      updated_at: null
    }

    setRowsData((prev) => [newRow, ...prev]) // Añadimos al inicio para que se vea
    setEditingRowId(newRowId) // Activamos modo edición

    // Inicializamos el formData para la nueva fila
    setFormData({
      item_id: undefined,
      batch: '',
      quantity: 0,
      unit_cost: 0
    })
    setErrors({}) // Limpiamos errores
  }

  const onDeleteHandler = (rowId: string) => {
    setRowIdSelected(rowId)
    setIsConfirmDialogOpen(true)
  }

  const deleteReceiptItem = async (rowId: string) => {
    // Si la fila a eliminar es una fila temporal, se elimina del estado
    const itemToDelete = rowsData.find((r) => r.id === rowId)
    if (itemToDelete && itemToDelete.item_id === null) {
      setRowsData((prev) => prev.filter((row) => row.id !== rowId))
      setRowIdSelected(null)
      setIsConfirmDialogOpen(false)
      toast.success('Fila temporal eliminada correctamente.')
      return
    }

    // Si tiene item_id, es una eliminación de base de datos
    const deleteItemPromise = deleteReceiptItemsById({
      rowReceiptId: rowId,
      receiptId
    })
    toast.promise(deleteItemPromise, {
      loading: 'Eliminando ítem...',
      success: 'Ítem eliminado',
      error: 'Error al eliminar el ítem'
    })
    setRowIdSelected(null)
    setIsConfirmDialogOpen(false)

    deleteItemPromise.finally(() => {
      getReceiptItemsById(receiptId).then((freshData) => setRowsData(freshData))
    })
  }

  const ItemSelectorWrapper = () => {
    // Nombre del campo dummy que usaremos con RHF
    const DUMMY_FIELD_NAME = 'item_id_dummy'

    // Inicializamos un contexto de formulario dummy
    const methods = useForm({
      // Usamos el valor real de item_id como valor por defecto para RHF
      defaultValues: { [DUMMY_FIELD_NAME]: formData.item_id ?? '' },
      resolver: undefined, // Desactivar el resolver para el dummy form
      mode: 'onChange'
    })

    // Si el SelectDropdown está usando FormField, el valor por defecto debe estar en RHF
    // Por eso usamos methods.setValue en un useEffect para sincronizar el estado.
    React.useEffect(() => {
      methods.setValue(DUMMY_FIELD_NAME, formData.item_id ?? '', {
        shouldValidate: false,
        shouldDirty: false
      })
    }, [methods])

    return (
      <FormProvider {...methods}>
        {/* Usamos Controller para conectar el componente SelectDropdown al contexto RHF */}
        <Controller
          name={DUMMY_FIELD_NAME} // Usamos el nombre del campo dummy
          control={methods.control}
          render={({ field }) => {
            return (
              <SelectDropdown
                key={field.value}
                isControlled={true}
                className="min-w-full max-w-full"
                // RHF pasa el valor a través de field.value
                value={field.value}
                // RHF pasa el manejador de cambio a través de field.onChange
                // Lo envolvemos para actualizar también nuestro estado local 'formData'
                onValueChange={(value) => {
                  // 1. Actualiza el estado de RHF (para que SelectDropdown muestre el valor)
                  field.onChange(value)
                  // 2. Actualiza nuestro estado local real
                  setFormData((prev) => ({ ...prev, item_id: value }))
                }}
                placeholder="Seleccionar ítem"
                activeFilter={true}
                options={itemsList.map((il) => ({
                  value: il.id.toString(),
                  label: il.name.toString()
                }))}
              />
            )
          }}
        />
      </FormProvider>
    )
  }

  return (
    <section className="flex flex-col">
      <Button
        size={'sm'}
        className="mb-4 max-w-fit self-end"
        variant={'outline'}
        onClick={addItemReceipt}
      >
        <IoIosAddCircleOutline className="w-10 h-10" />
        Agregar ítem
      </Button>
      <section className="overflow-x-auto rounded-2xl shadow-md border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-900">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Ítem</th>
              <th className="px-4 py-3 text-left font-semibold">Lote</th>
              <th className="px-4 py-3 text-left font-semibold">Cantidad</th>
              <th className="px-4 py-3 text-left font-semibold">
                Costo unitario
              </th>
              <th className="px-4 py-3 text-left font-semibold">Subtotal</th>
              <th className="px-4 py-3 text-left font-semibold">
                Fecha creación
              </th>
              <th className="px-4 py-3 text-left font-semibold"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {rowsData.map((item) => {
              const isEditing = editingRowId === item.id
              const isNewRow = item.item_id === null

              return (
                <tr
                  key={item.id}
                  className="group hover:bg-gray-100 transition-colors"
                >
                  {/* NOMBRE ÍTEM */}
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {isEditing && isNewRow ? (
                      <ItemSelectorWrapper />
                    ) : (
                      item.item_name
                    )}
                  </td>

                  {/* LOTE */}
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <InputWithError
                        value={formData.batch}
                        error={errors.batch}
                        onChange={(e) =>
                          setFormData({ ...formData, batch: e.target.value })
                        }
                      />
                    ) : (
                      item.batch
                    )}
                  </td>

                  {/* CANTIDAD */}
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <InputWithError
                        type="number"
                        value={formData.quantity}
                        error={errors.quantity}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            quantity: Number(e.target.value)
                          })
                        }
                      />
                    ) : (
                      item.quantity
                    )}
                  </td>

                  {/* COSTO UNITARIO */}
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <InputWithError
                        type="number"
                        value={formData.unit_cost}
                        error={errors.unit_cost}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            unit_cost: Number(e.target.value)
                          })
                        }
                      />
                    ) : (
                      item.unit_cost.toLocaleString('es-CO', {
                        style: 'currency',
                        currency: 'COP'
                      })
                    )}
                  </td>

                  {/* SUBTOTAL */}
                  <td className="px-4 py-3 font-semibold text-gray-900">
                    {(item.quantity * item.unit_cost).toLocaleString('es-CO', {
                      style: 'currency',
                      currency: 'COP'
                    })}
                  </td>

                  {/* FECHA */}
                  <td className="px-4 py-3 text-gray-500">
                    {item.created_at &&
                      format(new Date(item.created_at), 'MMMM d, yyyy', {
                        locale: es
                      })}
                  </td>

                  {/* ACCIONES */}
                  <td className="px-4 py-3 gap-2 flex opacity-0  group-hover:opacity-100 transition-colors ">
                    {isEditing ? (
                      <>
                        <Button
                          size="sm"
                          onClick={() => saveEdit(item.id, isNewRow)}
                          variant={isNewRow ? 'default' : 'secondary'}
                        >
                          <Check className="h-4 w-4" />
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelEdit}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        {/* Botón editar */}
                        <TooltipAssign tooltipMsg="Editar ítem">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => startEdit(item)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TooltipAssign>

                        {/* Botón eliminar */}
                        <TooltipAssign tooltipMsg="Eliminar ítem">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onDeleteHandler(item.id)}
                          >
                            <FaRegTrashAlt color="red" />
                          </Button>
                        </TooltipAssign>
                      </>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
      <ConfirmDialog
        alertType="delete"
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={() => deleteReceiptItem(rowIdSelected!)}
      />
    </section>
  )
}
