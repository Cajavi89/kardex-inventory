export interface ISuppliers {
  id: string // UUID
  active: boolean | null // Estado del proveedor
  address: string | null // Dirección física
  contact_name: string | null // Nombre de contacto
  created_at: string | null // Fecha de creación (timestamp ISO)
  email: string | null // Correo electrónico
  name: string // Nombre del proveedor
  phone: string | null // Teléfono de contacto
}
