'use server'

import { createSupabaseClientSR } from '@/utils/supabase/server'

export const getAllSuppliers = async () => {
  const supabase = await createSupabaseClientSR()
  const { data, error } = await supabase.from('suppliers').select('*')
  if (error) {
    throw new Error(error.message)
  }
  return data
}
