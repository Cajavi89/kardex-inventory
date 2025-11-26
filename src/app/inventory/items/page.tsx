import { getAllItems } from '@/features/items/services/items.service'
import { TableComponent } from '@/components/table/ComponentTable'
import { itemsColumns } from '@/features/items/components/table/columns'
import { CreateItemDialog } from '@/features/items/components/createItemDialog/CreateItemDialog'
import { itemsColumnsNames } from '@/features/items/constants/itemsColumnsNames'

export default async function ItemsPage() {
  const items = await getAllItems()

  return (
    <div>
      <h1>Items</h1>
      <TableComponent
        data={items}
        columns={itemsColumns}
        columnsNames={itemsColumnsNames}
        searchColumn="name"
        searchPlaceholder="Buscar por ítem..."
        createDialog={<CreateItemDialog />}
      />
    </div>
  )
}
