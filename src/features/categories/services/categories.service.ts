'use server'

import { createSupabaseClientSR } from '@/utils/supabase/server'

export async function getAllCategoriesSimple() {
  const supabase = await createSupabaseClientSR()
  const { data, error } = await supabase
    .from('categories')
    .select('id, name')
    .order('name', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return data
}
