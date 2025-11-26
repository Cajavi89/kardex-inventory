export type IItem = {
  id: string
  name: string
  code: string
  stock: number | null
  cost: number | null
  active: boolean | null
  created_at: string | null
  unit: string | null
}

export type ICreateItem = {
  name: string
  code: string
  category_id: string
  unit_id: string
  min_stock?: number
}
