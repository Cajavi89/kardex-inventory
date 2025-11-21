import { Tables } from '@/interfaces/supabase'

export interface IGetReceiptItemsById extends Tables<'receipt_items'> {
  item_name?: string
}
