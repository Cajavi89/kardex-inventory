'use server'

import { TablesInsert } from '@/interfaces/supabase'
import { handleSupabaseError } from '@/utils/handleErrors'
import { createSupabaseClientSR } from '@/utils/supabase/server'

// ========== OBTENER RECEIPT ITEMS BY ID ==========
export const getReceiptItemsById = async (receiptId: string) => {
  const supabase = await createSupabaseClientSR()
  const { data, error } = await supabase
    .from('receipt_items')
    .select('*')
    .eq('receipt_id', receiptId)

  if (error) {
    throw new Error(error.message)
  }

  return data
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
