import { Tables } from '@/interfaces/supabase'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export const DetailReceipt = ({
  receiptData
}: {
  receiptData: Tables<'receipts'>
}) => {
  return (
    <div className="bg-card text-card-foreground rounded-2xl p-6 sm:p-8 full-w">
      {/* título */}
      <div className="px-4 sm:px-0 ">
        <h6 className="text-base  font-semibold text-foreground">
          {`Código: ${receiptData?.receipt_code}`}
        </h6>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          {receiptData?.created_at &&
            format(new Date(receiptData.created_at), 'MMMM d, yyyy', {
              locale: es
            })}
        </p>
      </div>

      {/* información */}
      <div className="mt-6 border-t border-border">
        <dl className="divide-y divide-border">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 px-4 py-6 sm:px-0">
            {/* Proveedor */}
            <div>
              <dt className="text-sm font-medium text-foreground">Proveedor</dt>
              <dd className="mt-1 text-sm text-secondary sm:col-span-2 sm:mt-0">
                {receiptData?.supplier_id}
              </dd>
            </div>
            {/* Código de la entrada */}
            <div>
              <dt className="text-sm font-medium text-foreground">
                Código de la entrada
              </dt>
              <dd className="mt-1 text-sm text-secondary sm:col-span-2 sm:mt-0">
                {receiptData?.receipt_code}
              </dd>
            </div>

            {/* Fecha recepción */}
            <div>
              <dt className="text-sm font-medium text-foreground">
                Fecha de recepción
              </dt>
              <dd className="mt-1 text-sm text-secondary sm:col-span-2 sm:mt-0">
                {receiptData?.created_at &&
                  format(new Date(receiptData.created_at), 'MMMM d, yyyy', {
                    locale: es
                  })}
              </dd>
            </div>
            {/* Referencia del documento */}
            <div>
              <dt className="text-sm font-medium text-foreground">
                Referencia del documento
              </dt>
              <dd className="mt-1 text-sm text-secondary sm:col-span-2 sm:mt-0">
                {receiptData?.reference_document}
              </dd>
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 px-4 py-6 sm:px-0">
            {/* Subtotal */}
            <div>
              <dt className="text-sm font-medium text-foreground">Subtotal</dt>
              <dd className="mt-1 text-sm text-secondary sm:col-span-2 sm:mt-0">
                {receiptData?.subtotal &&
                  receiptData.subtotal.toLocaleString('es-CO', {
                    style: 'currency',
                    currency: 'COP'
                  })}
              </dd>
            </div>
            {/* IVA */}
            <div>
              <dt className="text-sm font-medium text-foreground">IVA</dt>
              <dd className="mt-1 text-sm text-secondary sm:col-span-2 sm:mt-0">
                {receiptData?.tax &&
                  receiptData.tax.toLocaleString('es-CO', {
                    style: 'currency',
                    currency: 'COP'
                  })}
              </dd>
            </div>

            {/* Descuentos*/}
            <div>
              <dt className="text-sm font-medium text-foreground">
                Descuentos
              </dt>
              <dd className="mt-1 text-sm text-secondary sm:col-span-2 sm:mt-0">
                {receiptData?.discount &&
                  receiptData.discount.toLocaleString('es-CO', {
                    style: 'currency',
                    currency: 'COP'
                  })}
              </dd>
            </div>
            {/* TOtal */}
            <div>
              <dt className="text-sm font-medium text-foreground">Total</dt>
              <dd className="mt-1 text-sm text-secondary sm:col-span-2 sm:mt-0">
                {receiptData?.total &&
                  receiptData.total.toLocaleString('es-CO', {
                    style: 'currency',
                    currency: 'COP'
                  })}
              </dd>
            </div>
          </div>

          {/* Comentarios */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-foreground">Comentarios</dt>
            <dd className="mt-1 text-sm text-secondary sm:col-span-2 sm:mt-0">
              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
              incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
              consequat sint. Sit id mollit nulla mollit nostrud in ea officia
              proident. Irure nostrud pariatur mollit ad adipisicing
              reprehenderit deserunt qui eu.
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
