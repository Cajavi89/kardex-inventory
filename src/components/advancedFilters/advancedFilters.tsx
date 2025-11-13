'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { FilterConfig, FilterValues } from '@/interfaces/filters'
import { Filter } from 'lucide-react'
import { useState } from 'react'

interface AdvancedFiltersProps {
  filters: FilterConfig[]
  onApplyFilters: (values: FilterValues) => void
  onResetFilters?: () => void
}

export function AdvancedFilters({
  filters,
  onApplyFilters,
  onResetFilters
}: AdvancedFiltersProps) {
  const [filterValues, setFilterValues] = useState<FilterValues>({})
  const [open, setOpen] = useState(false)

  const handleValueChange = (
    filterId: string,
    value: string | number | boolean | { from: string; to: string }
  ) => {
    setFilterValues((prev) => ({
      ...prev,
      [filterId]: value
    }))
  }

  const handleDateRangeChange = (
    filterId: string,
    type: 'from' | 'to',
    value: string
  ) => {
    setFilterValues((prev) => {
      const currentRange = (prev[filterId] as { from: string; to: string }) || {
        from: '',
        to: ''
      }
      return {
        ...prev,
        [filterId]: {
          ...currentRange,
          [type]: value
        }
      }
    })
  }

  const handleApply = () => {
    onApplyFilters(filterValues)
    setOpen(false)
  }

  const handleReset = () => {
    setFilterValues({})
    if (onResetFilters) {
      onResetFilters()
    }
  }

  const renderFilter = (filter: FilterConfig) => {
    switch (filter.type) {
      case 'text':
        return (
          <div key={filter.id} className="grid gap-2">
            <Label htmlFor={filter.id}>{filter.label}</Label>
            <Input
              id={filter.id}
              placeholder={filter.placeholder}
              value={(filterValues[filter.id] as string) || ''}
              onChange={(e) => handleValueChange(filter.id, e.target.value)}
            />
          </div>
        )

      case 'select':
        return (
          <div key={filter.id} className="grid gap-2">
            <Label htmlFor={filter.id}>{filter.label}</Label>
            <Select
              value={(filterValues[filter.id] as string) || ''}
              onValueChange={(v) => handleValueChange(filter.id, v)}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={filter.placeholder || 'Seleccionar'}
                />
              </SelectTrigger>
              <SelectContent>
                {filter.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )

      case 'date':
        return (
          <div key={filter.id} className="grid gap-2">
            <Label htmlFor={filter.id}>{filter.label}</Label>
            <Input
              id={filter.id}
              type="date"
              value={(filterValues[filter.id] as string) || ''}
              onChange={(e) => handleValueChange(filter.id, e.target.value)}
            />
          </div>
        )

      case 'dateRange':
        const dateRange = (filterValues[filter.id] as {
          from: string
          to: string
        }) || { from: '', to: '' }
        return (
          <div key={filter.id} className="grid gap-2">
            <Label>{filter.label}</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-1">
                <Label
                  htmlFor={`${filter.id}-from`}
                  className="text-xs text-muted-foreground"
                >
                  Desde
                </Label>
                <Input
                  id={`${filter.id}-from`}
                  type="date"
                  value={dateRange.from}
                  onChange={(e) =>
                    handleDateRangeChange(filter.id, 'from', e.target.value)
                  }
                />
              </div>
              <div className="grid gap-1">
                <Label
                  htmlFor={`${filter.id}-to`}
                  className="text-xs text-muted-foreground"
                >
                  Hasta
                </Label>
                <Input
                  id={`${filter.id}-to`}
                  type="date"
                  value={dateRange.to}
                  onChange={(e) =>
                    handleDateRangeChange(filter.id, 'to', e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        )

      case 'number':
        return (
          <div key={filter.id} className="grid gap-2">
            <Label htmlFor={filter.id}>{filter.label}</Label>
            <Input
              id={filter.id}
              type="number"
              placeholder={filter.placeholder}
              value={(filterValues[filter.id] as number) || ''}
              onChange={(e) =>
                handleValueChange(filter.id, parseFloat(e.target.value) || 0)
              }
            />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filtros avanzados
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[400px] space-y-6">
        <SheetHeader>
          <SheetTitle>Filtros avanzados</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 px-3 max-h-[calc(100vh-200px)] overflow-y-auto">
          {filters.map((filter) => renderFilter(filter))}
        </div>

        <SheetFooter className="mt-auto border-t pt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={handleReset}>
            Limpiar
          </Button>
          <Button onClick={handleApply}>Aplicar filtros</Button>
          <SheetClose asChild>
            <Button variant="outline">Cerrar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
