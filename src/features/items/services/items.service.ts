'use server'

import { createSupabaseClientSR } from '@/utils/supabase/server'

export async function getAllItems() {
  const supabase = await createSupabaseClientSR()
  const { data, error } = await supabase.from('items').select(`
      id,
      name,
      code,
      stock,
      cost,
      active,
      created_at,
      unit:units (
        name
      )
    `)

  if (error) {
    throw new Error(error.message)
  }

  return data.map((item) => ({
    id: item.id,
    name: item.name,
    code: item.code,
    stock: item.stock,
    cost: item.cost,
    active: item.active,
    created_at: item.created_at,
    unit: item.unit?.name ?? 'N/A'
  }))
}
