'use server'

import { Tables, TablesInsert } from '@/interfaces/supabase'
import { handleSupabaseError } from '@/utils/handleErrors'
import { createSupabaseClientSR } from '@/utils/supabase/server'
import { ICreateItem } from '../interfaces/items'
import { revalidatePath } from 'next/cache'

// ========== GET ALL ITEMS ==========
export async function getAllItems() {
  const supabase = await createSupabaseClientSR()
  const { data, error } = await supabase
    .from('items')
    .select(
      `
      id,
      name,
      code,
      stock,
      cost,
      active,
      created_at,
      total_cost,
      unit:units (
        name
      )
    `
    )
    .order('name', { ascending: true })

  if (error) {
    throw handleSupabaseError({ error })
  }

  return data.map((item) => ({
    id: item.id,
    name: item.name,
    code: item.code,
    stock: item.stock,
    cost: item.cost,
    active: item.active,
    created_at: item.created_at,
    total_cost: item.total_cost,
    unit: item.unit?.name ?? 'N/A'
  }))
}

// ========== GET ALL ITEMS SIMPLE ==========
export async function getAllItemsSimple() {
  const supabase = await createSupabaseClientSR()
  const { data, error } = await supabase
    .from('items')
    .select(
      `
      id,
      name
    `
    )
    .order('name', { ascending: true })

  if (error) {
    throw handleSupabaseError({ error })
  }

  return data
}

// ========== CREATE ITEM ==========
export async function createItem({ itemData }: { itemData: ICreateItem }) {
  const supabase = await createSupabaseClientSR()

  const newItemData: TablesInsert<'items'> = {
    ...itemData,
    active: true
  }
  const { error } = await supabase.from('items').insert(newItemData)

  if (error) {
    throw handleSupabaseError({ error })
  }

  revalidatePath('/inventory/items')
}

// ========== GET ALL UNITS ==========

export async function getAllUnits(): Promise<
  Omit<Tables<'units'>, 'created_at'>[]
> {
  const supabase = await createSupabaseClientSR()
  const { data, error } = await supabase
    .from('units')
    .select(
      `
      id,
      name,
      symbol
    `
    )
    .order('name', { ascending: true })
  if (error) {
    throw handleSupabaseError({ error })
  }
  return data
}
