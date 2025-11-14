'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState
} from '@tanstack/react-table'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FilterConfig, FilterValues } from '@/interfaces/filters'
import { AdvancedFilters } from '../advancedFilters/advancedFilters'
import { CreateReceiptDialog } from '@/features/movements/receipts/components/createReceiptDialog/CreateReceiptDialog'

interface TableComponentProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  searchColumn?: string // Columna para búsqueda rápida (ej: "name")
  searchPlaceholder?: string // Placeholder para el input de búsqueda
  advancedFilters?: FilterConfig[] // Configuración de filtros avanzados
}

export function TableComponent<T>({
  data,
  columns,
  searchColumn,
  searchPlaceholder = 'Buscar...',
  advancedFilters = []
}: TableComponentProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  const handleApplyFilters = (values: FilterValues) => {
    // Aplicar cada filtro a su columna correspondiente
    Object.entries(values).forEach(([columnId, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        // Convertir strings "true"/"false" a booleanos para campos booleanos
        let filterValue = value

        if (value === 'true') filterValue = true
        if (value === 'false') filterValue = false

        // Para rangos de fechas, pasar el objeto completo
        if (typeof value === 'object' && 'from' in value && 'to' in value) {
          // Solo aplicar si al menos una fecha está definida
          if (value.from || value.to) {
            filterValue = value
          } else {
            return // No aplicar filtro si ambas fechas están vacías
          }
        }

        table.getColumn(columnId)?.setFilterValue(filterValue)
      }
    })
  }

  const handleResetFilters = () => {
    // Limpiar todos los filtros excepto el de búsqueda rápida
    const searchValue = searchColumn
      ? table.getColumn(searchColumn)?.getFilterValue()
      : null

    setColumnFilters(
      searchValue && searchColumn
        ? [{ id: searchColumn, value: searchValue }]
        : []
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-2">
        {/* Filtro rápido (búsqueda) */}
        {searchColumn && table.getColumn(searchColumn) && (
          <Input
            placeholder={searchPlaceholder}
            value={
              (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn(searchColumn)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}

        {/* Botón para agregar nueva entrada */}
        <CreateReceiptDialog />

        {/* Filtros avanzados (solo si se proporcionan) */}
        {advancedFilters.length > 0 && (
          <AdvancedFilters
            filters={advancedFilters}
            onApplyFilters={handleApplyFilters}
            onResetFilters={handleResetFilters}
          />
        )}

        {/* Selector de columnas */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabla */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} de{' '}
          {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
