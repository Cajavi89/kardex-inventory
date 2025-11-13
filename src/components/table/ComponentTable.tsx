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

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { ChevronDown, Filter } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export function TableComponent<T>({
  data,
  columns
}: {
  data: T[]
  columns: ColumnDef<T>[]
}) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const [advancedFilters, setAdvancedFilters] = useState({
    status: '',
    supplier: '',
    dateFrom: '',
    dateTo: ''
  })

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

  const applyAdvancedFilters = () => {
    if (advancedFilters.status) {
      table.getColumn('status')?.setFilterValue(advancedFilters.status)
    }
    if (advancedFilters.supplier) {
      table.getColumn('supplier')?.setFilterValue(advancedFilters.supplier)
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-2">
        {/* Filtro rápido */}
        {table.getColumn('name') && (
          <Input
            placeholder="Buscar por nombre..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}

        {/* Sheet de filtros avanzados */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Filtros avanzados
            </Button>
          </SheetTrigger>

          {/* REMOVIDAS las clases de animación redundantes */}
          <SheetContent side="right" className="w-[400px] space-y-6">
            <SheetHeader>
              <SheetTitle>Filtros avanzados</SheetTitle>
            </SheetHeader>

            <div className="space-y-4 px-3">
              {/* Estado */}
              <div className="grid gap-2">
                <Label htmlFor="status">Estado</Label>
                <Select
                  value={advancedFilters.status}
                  onValueChange={(v) =>
                    setAdvancedFilters((prev) => ({ ...prev, status: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="unpaid">Unpaid</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Proveedor */}
              <div className="grid gap-2">
                <Label htmlFor="supplier">Proveedor</Label>
                <Input
                  id="supplier"
                  placeholder="Nombre del proveedor"
                  value={advancedFilters.supplier}
                  onChange={(e) =>
                    setAdvancedFilters((prev) => ({
                      ...prev,
                      supplier: e.target.value
                    }))
                  }
                />
              </div>

              {/* Fechas */}
              <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="dateFrom">Desde</Label>
                  <Input
                    type="date"
                    id="dateFrom"
                    value={advancedFilters.dateFrom}
                    onChange={(e) =>
                      setAdvancedFilters((prev) => ({
                        ...prev,
                        dateFrom: e.target.value
                      }))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dateTo">Hasta</Label>
                  <Input
                    type="date"
                    id="dateTo"
                    value={advancedFilters.dateTo}
                    onChange={(e) =>
                      setAdvancedFilters((prev) => ({
                        ...prev,
                        dateTo: e.target.value
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <SheetFooter className="mt-auto border-t pt-4 flex justify-end gap-2">
              <Button onClick={applyAdvancedFilters}>Aplicar filtros</Button>
              <SheetClose asChild>
                <Button variant="outline">Cerrar</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

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
