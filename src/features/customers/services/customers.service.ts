'use server'

import { createSupabaseClientSR } from '@/utils/supabase/server'
import { handleSupabaseError } from '@/utils/handleErrors'
import { ICreateCustomer } from '../interfaces/customers'
import { revalidatePath } from 'next/cache'

// ========== GET ALL CUSTOMERS ==========
export const getAllCustomers = async () => {
  const supabase = await createSupabaseClientSR()
  const { data, error } = await supabase.from('customers').select('*')
  if (error) {
    handleSupabaseError({ error })
  }
  return data ?? []
}

// ========== GET ALL CUSTOMERS SIMPLE ==========
export const getAllCustomersSimple = async () => {
  const supabase = await createSupabaseClientSR()
  const { data, error } = await supabase
    .from('customers')
    .select('id, name')
    .order('name', { ascending: true })

  if (error) {
    handleSupabaseError({ error })
  }
  return data
}

// ========== CREATE CUSTOMER ==========
export const createCustomer = async ({
  payload
}: {
  payload: ICreateCustomer
}) => {
  const supabase = await createSupabaseClientSR()
  const { error } = await supabase.from('customers').insert([payload])

  if (error) {
    handleSupabaseError({ error })
  }

  revalidatePath('/customers')
}
