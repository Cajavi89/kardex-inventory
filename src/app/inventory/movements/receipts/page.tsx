import { TableComponent } from '@/components/table/ComponentTable'
import { CreateReceiptDialog } from '@/features/movements/receipts/components/createReceiptDialog/CreateReceiptDialog'
import { receiptColumns } from '@/features/movements/receipts/components/table/columns'
import { receiptFilters } from '@/features/movements/receipts/components/table/ReceiptFilters'
import { getAllReceipts } from '@/features/movements/receipts/services/receipts.service'

export default async function ReceiptsPage() {
  const receipts = await getAllReceipts()

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Recibos de Inventario</h1>

      <TableComponent
        data={receipts}
        columns={receiptColumns}
        searchColumn="supplier_name"
        searchPlaceholder="Buscar por proveedor..."
        advancedFilters={receiptFilters}
        createDialog={<CreateReceiptDialog />}
      />
    </div>
  )
}
