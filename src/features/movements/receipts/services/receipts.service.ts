'use server'

import { createSupabaseClientSR } from '@/utils/supabase/server'
import { IReceipt, IReceiptDetail, IStatus } from '../interfaces/receipts'
// import { Tables } from '@/interfaces/supabase'

export async function getAllReceipts(): Promise<IReceipt[]> {
  const supabase = await createSupabaseClientSR()
  const { data, error } = await supabase.from('receipts').select(`
        id,
        supplier_id:suppliers (
            name
        ),
        reference_document,
        receipt_code,
        receipt_date,
        total,
        status,
        created_at
    `)

  if (error) {
    throw new Error(error.message)
  }

  return data.map((receipt) => ({
    id: receipt.id,
    supplier_name: receipt.supplier_id?.name ?? null,
    reference_document: receipt.reference_document ?? null,
    receipt_code: receipt.receipt_code,
    receipt_date: receipt.receipt_date,
    total: receipt.total ?? 0,
    status: (receipt.status as IStatus) ?? 'borrador',
    created_at: receipt.created_at ?? ''
  }))
}

export async function getReceiptById({
  receiptId
}: {
  receiptId: string
}): Promise<IReceiptDetail[]> {
  const supabase = await createSupabaseClientSR()
  const { data, error } = await supabase
    .from('receipts')
    .select(
      `
        id,
        supplier_id:suppliers (
            name
        ),
        receipt_code,
        receipt_date,
        reference_document,
        total,
        status,
        created_at,
        subtotal,
        tax,
        transport,
        discount,
        created_at,
        comments
      `
    )
    .eq('id', receiptId)

  if (error) {
    throw new Error(error.message)
  }

  return data.map(({ total, status, created_at, ...receipt }) => ({
    ...receipt,
    total: total ?? 0,
    status: (status as IStatus) ?? 'draft',
    created_at: created_at ?? '',
    supplier_name: receipt.supplier_id?.name ?? null
  }))
}
