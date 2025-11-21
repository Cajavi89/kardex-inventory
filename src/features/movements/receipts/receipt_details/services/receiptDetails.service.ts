'use server'

import { TablesInsert, TablesUpdate } from '@/interfaces/supabase'
import { handleSupabaseError } from '@/utils/handleErrors'
import { createSupabaseClientSR } from '@/utils/supabase/server'
import { IGetReceiptItemsById } from '../interfaces/receiptItems'
import { revalidatePath } from 'next/cache'

// ========== OBTENER RECEIPT ITEMS BY ID ==========
export async function getReceiptItemsById(
  receiptId: string
): Promise<IGetReceiptItemsById[]> {
  const supabase = await createSupabaseClientSR()
  const { data, error } = await supabase
    .from('receipt_items')
    .select(
      `
      id,
      item_id:items(id,name),
      receipt_id,
      item_id,
      batch,
      quantity,
      unit_cost,
      created_at
      `
    )
    .eq('receipt_id', receiptId)
    .order('id', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return data.map(({ item_id, ...ri }) => ({
    ...ri,
    item_name: item_id?.name ?? '',
    item_id: item_id?.id ?? ''
  }))
}

// ========== CREATE RECEIPT ITEMS ==========
export async function createReceiptItems({
  items
}: {
  items: TablesInsert<'receipt_items'>[]
}) {
  const supabase = await createSupabaseClientSR()
  const { error } = await supabase.from('receipt_items').insert(items)

  if (error) {
    handleSupabaseError({ error })
  }
}

// ========== UPDATE RECEIPT ITEMS BY ID ==========
export async function updateReceiptItemsById({
  itemId,
  updatedData,
  receiptId
}: {
  itemId: string
  updatedData: Partial<TablesUpdate<'receipt_items'>>
  receiptId: string
}) {
  const supabase = await createSupabaseClientSR()
  const { error } = await supabase
    .from('receipt_items')
    .update(updatedData)
    .eq('id', itemId)

  if (error) {
    handleSupabaseError({ error })
  }
  revalidatePath(`/inventory/movements/receipts/${receiptId}`)
}
