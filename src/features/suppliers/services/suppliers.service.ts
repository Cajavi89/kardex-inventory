'use server'

import { createSupabaseClientSR } from '@/utils/supabase/server'
import { handleSupabaseError } from '@/utils/handleErrors'

export const getAllSuppliers = async () => {
  const supabase = await createSupabaseClientSR()
  const { data, error } = await supabase.from('suppliers').select('*')
  if (error) {
    throw new Error(error.message)
  }
  return data
}

// obtiene una lista simple de proveedores con solo id y name
export const getAllSuppliersSimple = async () => {
  const supabase = await createSupabaseClientSR()
  const { data, error } = await supabase
    .from('suppliers')
    .select('id, name')
    .order('name', { ascending: true })

  if (error) {
    handleSupabaseError({ error })
  }
  return data
}
