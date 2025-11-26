'use client'

import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
// import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { IItem } from '../../interfaces/items'
import { itemsColumnsNames } from '../../constants/itemsColumnsNames'

export const itemsColumns: ColumnDef<IItem>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && 'indeterminate')
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false
  // },
  {
    accessorKey: 'name',
    // header: 'Nombre del ítem',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {itemsColumnsNames.name}
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>
  },
  {
    accessorKey: 'code',
    header: itemsColumnsNames.code,
    cell: ({ row }) => <div className="uppercase">{row.getValue('code')}</div>
  },
  {
    accessorKey: 'stock',
    header: () => <div className="text-center">Stock</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue('stock')}</div>
    )
  },
  {
    accessorKey: 'unit',
    header: () => <div className="text-center">{itemsColumnsNames.unit}</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue('unit')}</div>
    )
  },
  {
    accessorKey: 'cost',
    header: () => <div className="text-center">{itemsColumnsNames.cost}</div>,
    cell: ({ row }) => {
      const cost = parseFloat(row.getValue('cost'))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP'
      }).format(cost)

      return <div className="text-center font-medium">{formatted}</div>
    }
  },
  {
    accessorKey: 'total_cost',
    header: () => (
      <div className="text-center">{itemsColumnsNames.total_cost}</div>
    ),
    cell: ({ row }) => {
      const totalCost = parseFloat(row.getValue('total_cost'))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP'
      }).format(totalCost)

      return <div className="text-center font-medium">{formatted}</div>
    }
  },
  {
    accessorKey: 'active',
    header: () => <div className="text-center">{itemsColumnsNames.active}</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('active') ? 'Sí' : 'No'}</div>
    )
  },
  {
    accessorKey: 'created_at',
    header: () => (
      <div className="text-center">{itemsColumnsNames.created_at}</div>
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
