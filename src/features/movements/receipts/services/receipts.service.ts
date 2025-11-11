'use server'

import { createSupabaseClientSR } from '@/utils/supabase/server'
import { IReceipt, IStatus } from '../interfaces/receipts'

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
