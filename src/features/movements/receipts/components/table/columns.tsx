'use client'

import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { IReceipt } from '../../interfaces/receipts'
import Link from 'next/link'
import { transformReceiptStatus } from '../../utils/statusTransformer'
export const receiptColumns: ColumnDef<IReceipt>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'supplier_name',
    // header: 'Nombre del ítem',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Proveedor
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const supplierName = row.getValue('supplier_name') as string
      const receiptId = row.original.id

      return (
        <Link
          href={`/inventory/movements/receipts/${receiptId}`}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          {supplierName || '—'}
        </Link>
      )
    }
  },
  {
    accessorKey: 'reference_document',
    header: 'Factura',
    cell: ({ row }) => (
      <div className="uppercase">{row.getValue('reference_document')}</div>
    )
  },
  {
    accessorKey: 'receipt_code',
    header: () => <div className="text-center">Código de Recepción</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.getValue('receipt_code')}
      </div>
    )
  },
  {
    accessorKey: 'receipt_date',
    header: () => <div className="text-center">Recibido el</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue('receipt_date'))
      return (
        <div className="text-center">
          {format(date, 'MMMM d, yyyy', { locale: es })}
        </div>
      )
    }
  },
  {
    accessorKey: 'total',
    header: () => <div className="text-center">Costo</div>,
    cell: ({ row }) => {
      const cost = parseFloat(row.getValue('total'))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP'
      }).format(cost)

      return <div className="text-center font-medium">{formatted}</div>
    }
  },
  {
    accessorKey: 'active',
    header: () => <div className="text-center">Activo</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('active') ? 'Sí' : 'No'}</div>
    )
  },
  {
    accessorKey: 'status',
    header: () => <div className="text-center">Estado</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {transformReceiptStatus({ status: row.getValue('status') })}
      </div>
    )
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-gray-100">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
