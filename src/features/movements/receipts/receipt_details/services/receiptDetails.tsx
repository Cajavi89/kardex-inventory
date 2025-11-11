'use server'

import { createSupabaseClientSR } from '@/utils/supabase/server'

export const getReceiptById = async (receiptId: string) => {
  console.log('🚀 ~ getReceiptById ~ id:', receiptId)
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
