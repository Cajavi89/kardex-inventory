'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Pencil, Check, X } from 'lucide-react'
import { IGetReceiptItemsById } from '../interfaces/receiptItems'
import { InputWithError } from '@/components/InputWithError'
import { toast } from 'sonner'
import { updateReceiptItemsById } from '../services/receiptDetails.service'

export const rowSchema = z.object({
  batch: z.string().min(1, 'El lote es obligatorio'),
  quantity: z.number().min(1, 'La cantidad debe ser mayor a 0'),
  unit_cost: z.number().min(1, 'El costo debe ser mayor a 0')
})

export type RowSchema = z.infer<typeof rowSchema>

export const TableItemsDetail = ({
  receiptItemsData,
  receiptId
}: {
  receiptItemsData: IGetReceiptItemsById[]
  receiptId: string
}) => {
  const [editingRowId, setEditingRowId] = useState<string | null>(null)

  const [errors, setErrors] = useState<{
    batch?: string
    quantity?: string
    unit_cost?: string
  }>({})

  const [formData, setFormData] = useState<{
    batch: string
    quantity: number
    unit_cost: number
  }>({
    batch: '',
    quantity: 0,
    unit_cost: 0
  })

  const startEdit = (item: IGetReceiptItemsById) => {
    setErrors({})
    setEditingRowId(item.id)
    setFormData({
      batch: item.batch ?? '',
      quantity: item.quantity,
      unit_cost: item.unit_cost
    })
  }

  const cancelEdit = () => {
    setEditingRowId(null)
    setErrors({})
  }

  const saveEdit = async (rowId: string, itemId: string) => {
    const result = rowSchema.safeParse(formData)

    if (!result.success) {
      const tree = z.treeifyError(result.error)

      setErrors({
        batch: tree.properties?.batch?.errors?.[0],
        quantity: tree.properties?.quantity?.errors?.[0],
        unit_cost: tree.properties?.unit_cost?.errors?.[0]
      })

      return
    }

    const updateItemPromise = updateReceiptItemsById({
      rowReceiptId: rowId,
      itemId,
      updatedData: formData,
      receiptId
    })

    toast.promise(updateItemPromise, {
      loading: 'Guardando cambios...',
      success: 'Cambios guardados',
      error: 'Error al guardar los cambios'
    })

    // Si no hay errores
    setErrors({})
    setEditingRowId(null)
  }

  return (
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
          {receiptItemsData.map((item) => {
            const isEditing = editingRowId === item.id

            return (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">
                  {item.item_name}
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
                <td className="px-4 py-3 flex gap-2">
                  {isEditing ? (
                    <>
                      <Button
                        size="sm"
                        onClick={() => saveEdit(item.id, item.item_id!)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>

                      <Button size="sm" variant="outline" onClick={cancelEdit}>
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => startEdit(item)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}
