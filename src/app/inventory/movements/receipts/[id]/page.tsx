import { DetailReceipt } from '@/features/movements/receipts/receipt_details/components/detail'
import { TableItemsDetail } from '@/features/movements/receipts/receipt_details/components/TableItemsDetail'
import { getReceiptItemsById } from '@/features/movements/receipts/receipt_details/services/receiptDetails.service'
import { getReceiptById } from '@/features/movements/receipts/services/receipts.service'

export default async function ReceiptItemsDetailsPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const receiptItemsDataPromise = getReceiptItemsById(id)
  const receiptDataPromise = getReceiptById({ receiptId: id })

  const [receiptItemsData, receiptData] = await Promise.all([
    receiptItemsDataPromise,
    receiptDataPromise
  ])

  return (
    <section className="overflow-y-auto  h-full">
      <section className="overflow-hidden pb-2">
        <h3 className="fixed bg-background w-full py-2">Detalle entrada</h3>
        <section className="pt-10 flex flex-col gap-4 ">
          {/* detalles de la entrada */}
          <DetailReceipt receiptData={receiptData[0]} />

          {/* tabla de ítems */}
          <TableItemsDetail
            receiptItemsData={receiptItemsData}
            receiptId={id}
          />
        </section>
      </section>
    </section>
  )
}
