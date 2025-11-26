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
import { receiptsColumnsNames } from '../../constants/receiptsColumnsNames'

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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {receiptsColumnsNames.supplier_name}
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="">{row.getValue('supplier_name')}</div>
  },
  {
    accessorKey: 'reference_document',
    header: receiptsColumnsNames.reference_document,
    cell: ({ row }) => {
      const receiptId = row.original.id
      const documentReference = row.getValue('reference_document') as string

      return (
        <Link
          href={`/inventory/movements/receipts/${receiptId}`}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          {documentReference || '—'}
        </Link>
      )
    }
  },
  {
    accessorKey: 'receipt_code',
    header: () => (
      <div className="text-center">{receiptsColumnsNames.receipt_code}</div>
    ),
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.getValue('receipt_code')}
      </div>
    )
  },
  {
    accessorKey: 'receipt_date',
    header: () => (
      <div className="text-center">{receiptsColumnsNames.receipt_date}</div>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('receipt_date'))
      return (
        <div className="text-center">
          {format(date, 'MMMM d, yyyy', { locale: es })}
        </div>
      )
    },
    // Filtro personalizado para rango de fechas
    filterFn: (row, id, value) => {
      if (typeof value === 'object' && 'from' in value && 'to' in value) {
        const rowDate = new Date(row.getValue(id))
        const fromDate = value.from ? new Date(value.from) : null
        const toDate = value.to ? new Date(value.to) : null

        if (fromDate && toDate) {
          return rowDate >= fromDate && rowDate <= toDate
        } else if (fromDate) {
          return rowDate >= fromDate
        } else if (toDate) {
          return rowDate <= toDate
        }
      }
      return true
    }
  },
  {
    accessorKey: 'total',
    header: () => (
      <div className="text-center">{receiptsColumnsNames.total}</div>
    ),
    cell: ({ row }) => {
      const cost = parseFloat(row.getValue('total'))

      const formatted = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP'
      }).format(cost)

      return <div className="text-center font-medium">{formatted}</div>
    },
    // Filtro personalizado para números (mayor o igual que)
    filterFn: (row, id, value) => {
      const rowValue = parseFloat(row.getValue(id))
      return rowValue >= parseFloat(value)
    }
  },
  {
    accessorKey: 'active',
    header: () => (
      <div className="text-center">{receiptsColumnsNames.active}</div>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('active') ? 'Sí' : 'No'}</div>
    ),
    // Filtro personalizado para booleanos
    filterFn: (row, id, value) => {
      if (value === true || value === false) {
        return row.getValue(id) === value
      }
      return true
    }
  },
  {
    accessorKey: 'status',
    header: () => (
      <div className="text-center">{receiptsColumnsNames.status}</div>
    ),
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
