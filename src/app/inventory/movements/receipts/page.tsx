import { TableComponent } from '@/components/table/ComponentTable'
import { receiptColumns } from '@/features/movements/receipts/components/table/columns'
import { getAllReceipts } from '@/features/movements/receipts/services/receipts.service'
import { FilterConfig } from '@/interfaces/filters'

export default async function ReceiptsPage() {
  const receipts = await getAllReceipts()

  // Configuración de filtros avanzados para Receipts
  const advancedFilters: FilterConfig[] = [
    {
      id: 'status',
      label: 'Estado',
      type: 'select',
      placeholder: 'Seleccionar estado',
      options: [
        { label: 'Pendiente', value: 'pending' },
        { label: 'Completado', value: 'completed' },
        { label: 'Cancelado', value: 'cancelled' },
        { label: 'En proceso', value: 'in_progress' }
      ]
    },
    {
      id: 'supplier_name',
      label: 'Proveedor',
      type: 'text',
      placeholder: 'Buscar por proveedor'
    },
    {
      id: 'receipt_date',
      label: 'Fecha de recepción',
      type: 'dateRange'
    },
    {
      id: 'reference_document',
      label: 'Número de factura',
      type: 'text',
      placeholder: 'Ej: FAC-001'
    },
    {
      id: 'active',
      label: 'Estado activo',
      type: 'select',
      placeholder: 'Todos',
      options: [
        { label: 'Activos', value: 'true' },
        { label: 'Inactivos', value: 'false' }
      ]
    },
    {
      id: 'total',
      label: 'Costo mínimo',
      type: 'number',
      placeholder: '0'
    }
  ]

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Recibos de Inventario</h1>

      <TableComponent
        data={receipts}
        columns={receiptColumns}
        searchColumn="supplier_name"
        searchPlaceholder="Buscar por proveedor..."
        advancedFilters={advancedFilters}
      />
    </div>
  )
}
