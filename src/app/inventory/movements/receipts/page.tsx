import { TableComponent } from '@/components/table/ComponentTable'
import { receiptColumns } from '@/features/movements/receipts/components/table/columns'
import { getAllReceipts } from '@/features/movements/receipts/services/receipts.service'

export default async function ReceiptsPage() {
  const receipts = await getAllReceipts()

  return (
    <div>
      <h1>Receipts</h1>
      <TableComponent data={receipts} columns={receiptColumns} />
    </div>
  )
}
