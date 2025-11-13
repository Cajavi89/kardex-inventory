// types/filters.ts

export type FilterType =
  | 'text'
  | 'select'
  | 'date'
  | 'dateRange'
  | 'number'
  | 'boolean'

export interface FilterOption {
  label: string
  value: string
}

export interface FilterConfig {
  id: string
  label: string
  type: FilterType
  placeholder?: string
  options?: FilterOption[] // Solo para type='select'
}

export interface FilterValues {
  [key: string]: string | number | boolean | { from: string; to: string }
}
