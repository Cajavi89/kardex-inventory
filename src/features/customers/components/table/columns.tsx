'use client'

import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ICustomers } from '../../interfaces/customers'
import { customersColumnsNames } from '../../constants/itemsColumnsNames'

export const customersColumns: ColumnDef<ICustomers>[] = [
  {
    accessorKey: 'name',
    // header: 'Nombre del ítem',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {customersColumnsNames.name}
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>
  },
  {
    accessorKey: 'email',
    header: customersColumnsNames.email,
    cell: ({ row }) => <div className="capitalize">{row.getValue('email')}</div>
  },
  {
    accessorKey: 'phone',
    header: () => (
      <div className="text-center">{customersColumnsNames.phone}</div>
    ),
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue('phone')}</div>
    )
  },
  {
    accessorKey: 'document',
    header: () => (
      <div className="text-center">{customersColumnsNames.document}</div>
    ),
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue('document')}</div>
    )
  },
  {
    accessorKey: 'address',
    header: () => (
      <div className="text-center">{customersColumnsNames.address}</div>
    ),
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue('address')}</div>
    )
  },
  {
    accessorKey: 'created_at',
    header: () => (
      <div className="text-center">{customersColumnsNames.created_at}</div>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('created_at'))
      return (
        <div className="text-center">
          {format(date, 'MMMM d, yyyy', { locale: es })}
        </div>
      )
    }
  },
  {
    accessorKey: 'updated_at',
    header: () => (
      <div className="text-center">{customersColumnsNames.updated_at}</div>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('updated_at'))
      return (
        <div className="text-center">
          {format(date, 'MMMM d, yyyy', { locale: es })}
        </div>
      )
    }
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
