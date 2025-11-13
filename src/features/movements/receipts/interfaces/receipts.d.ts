export type IStatus = 'draft' | 'pending' | 'completed' | 'canceled'

export interface IReceipt {
  id: string // UUID
  supplier_name: string | null // referencia a suppliers.id (puede ser null si aún no se asigna)
  receipt_code: string // código único del recibo o factura
  receipt_date: string // formato ISO (YYYY-MM-DD)
  reference_document: string | null // número de factura, guía externa, etc.
  //   subtotal: number // suma de ítems sin impuestos
  //   tax: number // IVA u otros impuestos
  //   transport: number | null // transporte, fletes opcionales
  //   discount: number | null // descuentos opcionales
  total: number // campo calculado: subtotal + tax + transport - discount
  status: IStatus // estado del recibo
  created_at: string // timestamp ISO (ej: 2025-11-10T22:15:00Z)
}

export interface IReceiptDetail extends IReceipt {
  subtotal: number // suma de ítems sin impuestos
  tax: number // IVA u otros impuestos
  transport: number | null // transporte, fletes opcionales
  discount: number | null // descuentos opcionales
}
