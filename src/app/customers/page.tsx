import { TableComponent } from '@/components/table/ComponentTable'
import { CreateCustomerDialog } from '@/features/customers/components/createCustomerDialog/CreateCustomerDialog'
import { customersColumns } from '@/features/customers/components/table/columns'
import { customersColumnsNames } from '@/features/customers/constants/itemsColumnsNames'
import { getAllCustomers } from '@/features/customers/services/customers.service'

export default async function CustomersPage() {
  const customers = await getAllCustomers()
  return (
    <div>
      <h1>Clientes</h1>
      <TableComponent
        data={customers}
        columns={customersColumns}
        columnsNames={customersColumnsNames}
        searchColumn="name"
        searchPlaceholder="Buscar por cliente..."
        createDialog={<CreateCustomerDialog />}
      />
    </div>
  )
}
