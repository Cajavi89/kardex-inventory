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
import { ISuppliers } from '../../interfaces/suppliers'

export const suppliersColumns: ColumnDef<ISuppliers>[] = [
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
    accessorKey: 'name',
    // header: 'Nombre del ítem',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Ítem
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>
  },
  {
    accessorKey: 'contact_name',
    header: 'Nombre de contacto',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('contact_name')}</div>
    )
  },
  {
    accessorKey: 'phone',
    header: () => <div className="text-center">Teléfono</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue('phone')}</div>
    )
  },
  {
    accessorKey: 'email',
    header: () => <div className="text-center">Correo electrónico</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue('email')}</div>
    )
  },
  {
    accessorKey: 'address',
    header: () => <div className="text-center">Dirección</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue('address')}</div>
    )
  },

  {
    accessorKey: 'active',
    header: () => <div className="text-center">Activo</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('active') ? 'Sí' : 'No'}</div>
    )
  },
  {
    accessorKey: 'created_at',
    header: () => <div className="text-center">Creado el</div>,
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
