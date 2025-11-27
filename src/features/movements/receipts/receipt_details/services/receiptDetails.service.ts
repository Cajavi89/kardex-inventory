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
      created_at,
      updated_at
      `
    )
    .eq('receipt_id', receiptId)
    .order('id', { ascending: true })

  if (error) {
    throw handleSupabaseError({ error })
  }

  return data.map(({ item_id, ...ri }) => ({
    ...ri,
    item_name: item_id?.name ?? '',
    item_id: item_id?.id ?? '',
    updated_at: ri.updated_at ?? ''
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
    throw handleSupabaseError({ error })
  }
  revalidatePath(`/inventory/movements/receipts/${items[0].receipt_id}`)
}

// ========== UPDATE RECEIPT ITEMS BY ID ==========
export async function updateReceiptItemsById({
  rowReceiptId,
  updatedData,
  receiptId,
  itemId
}: {
  rowReceiptId: string
  updatedData: Partial<TablesUpdate<'receipt_items'>>
  receiptId: string
  itemId: string
}) {
  const supabase = await createSupabaseClientSR()

  const updateData: TablesUpdate<'receipt_items'> = {
    ...updatedData,
    item_id: itemId
  }
  const { error } = await supabase
    .from('receipt_items')
    .update(updateData)
    .eq('id', rowReceiptId)

  if (error) {
    throw handleSupabaseError({ error })
  }
  revalidatePath(`/inventory/movements/receipts/${receiptId}`)
}

// ========== DELETE RECEIPT ITEMS BY ID ==========
export async function deleteReceiptItemsById({
  rowReceiptId,
  receiptId
}: {
  rowReceiptId: string
  receiptId: string
}) {
  const supabase = await createSupabaseClientSR()
  const { error } = await supabase
    .from('receipt_items')
    .delete()
    .eq('id', rowReceiptId)

  if (error) {
    throw handleSupabaseError({ error })
  }
  revalidatePath(`/inventory/movements/receipts/${receiptId}`)
}
