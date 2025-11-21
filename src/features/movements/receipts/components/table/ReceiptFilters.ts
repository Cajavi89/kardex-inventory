import { FilterConfig } from '@/interfaces/filters'

export const receiptFilters: FilterConfig[] = [
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
