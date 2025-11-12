import { Tables } from '@/interfaces/supabase'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export const TableItemsDetail = ({
  receiptItemsData
}: {
  receiptItemsData: Tables<'receipt_items'>[]
}) => {
  return (
    <section className="overflow-x-auto rounded-2xl shadow-md border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
        <thead className="bg-gray-100 text-gray-900">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">
              Código de lote
            </th>
            <th className="px-4 py-3 text-left font-semibold">Cantidad</th>
            <th className="px-4 py-3 text-left font-semibold">
              Costo unitario
            </th>
            <th className="px-4 py-3 text-left font-semibold">Subtotal</th>
            <th className="px-4 py-3 text-left font-semibold">
              Fecha creación
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {receiptItemsData.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-800">
                {item.lot_code}
              </td>
              <td className="px-4 py-3">{item.quantity}</td>
              <td className="px-4 py-3">
                {item.unit_cost.toLocaleString('es-CO', {
                  style: 'currency',
                  currency: 'COP'
                })}
              </td>
              <td className="px-4 py-3 font-semibold text-gray-900">
                {(item.quantity * item.unit_cost).toLocaleString('es-CO', {
                  style: 'currency',
                  currency: 'COP'
                })}
              </td>
              <td className="px-4 py-3 text-gray-500">
                {item.created_at &&
                  format(new Date(item.created_at), 'MMMM d, yyyy', {
                    locale: es
                  })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
