export interface ICustomers {
  id: string
  address: string | null
  created_at: string | null
  document: string | null
  email: string | null
  name: string
  phone: string | null
  updated_at: string | null
}

export interface ICreateCustomer {
  name: string
  address?: string
  document?: string
  email?: string
  phone?: string
}
