import { getAllItems } from '@/features/items/services/items.service'
import { TableComponent } from '@/components/table/ComponentTable'
import { itemsColumns } from '@/features/items/components/table/columns'

export default async function ItemsPage() {
  const items = await getAllItems()

  return (
    <div>
      <h1>Items</h1>
      <TableComponent data={items} columns={itemsColumns} />
    </div>
  )
}
