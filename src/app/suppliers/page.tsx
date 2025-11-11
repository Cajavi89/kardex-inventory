import { TableComponent } from '@/components/table/ComponentTable'
import { suppliersColumns } from '@/features/suppliers/components/table/columns'
import { getAllSuppliers } from '@/features/suppliers/services/suppliers.service'

export default async function SuppliersPage() {
  const suppliers = await getAllSuppliers()

  return (
    <div>
      <h1>Proveedores</h1>
      <TableComponent data={suppliers} columns={suppliersColumns} />
    </div>
  )
}
