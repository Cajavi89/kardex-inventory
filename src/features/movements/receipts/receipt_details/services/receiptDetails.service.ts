'use server'

import { createSupabaseClientSR } from '@/utils/supabase/server'

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
