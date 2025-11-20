/* eslint-disable no-unused-vars */
import { cn } from '@/lib/utils'
import { ClipLoader } from 'react-spinners'
import { FormControl } from '@/components/ui/form'
import { TooltipAssign } from './TooltipAssign'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useState, useMemo } from 'react'

interface SelectDropdownProps {
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
  placeholder?: string
  isPending?: boolean
  options: { label: string; value: string }[] | undefined
  disabled?: boolean
  className?: string
  isControlled?: boolean
  disabledTooltip?: string
  activeFilter?: boolean
}

export function SelectDropdown({
  value,
  defaultValue,
  onValueChange,
  isPending,
  options,
  placeholder,
  disabled,
  className = '',
  isControlled = false,
  disabledTooltip = 'Datos no disponibles',
  activeFilter = false // Por defecto desactivado
}: SelectDropdownProps) {
  const [filterValue, setFilterValue] = useState('')

  const selectProps = isControlled
    ? { value, onValueChange }
    : { defaultValue, onValueChange }

  // Filtrar opciones basándose en el texto ingresado
  const filteredOptions = useMemo(() => {
    if (!activeFilter || !filterValue || !options) return options

    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(filterValue.toLowerCase()) ||
        option.value.toLowerCase().includes(filterValue.toLowerCase())
    )
  }, [options, filterValue, activeFilter])

  return (
    <Select {...selectProps}>
      <FormControl>
        <TooltipAssign tooltipMsg={disabled ? disabledTooltip : ''}>
          <SelectTrigger disabled={disabled} className={cn(className)}>
            <SelectValue placeholder={placeholder ?? 'Seleccionar'} />
          </SelectTrigger>
        </TooltipAssign>
      </FormControl>
      <SelectContent>
        {activeFilter && (
          <div className="px-2 pb-2 pt-1">
            <Input
              placeholder="Buscar..."
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="h-8"
              onKeyDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()} // Evita que se cierre el dropdown
            />
          </div>
        )}
        {isPending ? (
          <SelectItem disabled value="loading" className="h-14">
            <div className="flex items-center justify-center gap-2">
              <ClipLoader className="h-5 w-5 animate-spin" />
            </div>
          </SelectItem>
        ) : filteredOptions && filteredOptions.length > 0 ? (
          filteredOptions.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))
        ) : (
          <div className="px-2 py-6 text-center text-sm text-muted-foreground">
            No se encontraron resultados
          </div>
        )}
      </SelectContent>
    </Select>
  )
}
