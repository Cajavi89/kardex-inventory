import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import clsx from 'clsx'

interface InputMoneyProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value'
  > {
  value: number | undefined | null
  onChange: (value: number | undefined) => void
  maxIntegers?: number
  prefix?: string // <-- nuevo
}

export function InputMoney({
  value,
  onChange,
  placeholder = '0.00',
  maxIntegers = 15,
  prefix = '$', // <-- por defecto usamos $
  className,
  ...props
}: InputMoneyProps) {
  const [raw, setRaw] = useState('')

  React.useEffect(() => {
    if (value === null || value === undefined) {
      setRaw('')
    } else {
      setRaw(value.toString().replace('.', ','))
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(prefix, '').trim() // <-- por si el user copia el $
    input = input.replace(/[^0-9.,]/g, '')

    const dots = input.split(/[.,]/)
    if (dots.length > 2) return

    if (dots[0].length > maxIntegers) return

    setRaw(input)

    const asNumber = Number(input.replace(',', '.'))
    if (!isNaN(asNumber)) {
      onChange(Number(asNumber.toFixed(2)))
    } else {
      onChange(undefined)
    }
  }

  const handleBlur = () => {
    if (!value) {
      setRaw('')
      return
    }
    const formatted = new Intl.NumberFormat('es-CO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)

    setRaw(formatted)
  }

  return (
    <div className="relative w-full">
      {/* Prefix: $ */}
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
          {prefix}
        </span>
      )}

      <Input
        type="text"
        inputMode="decimal"
        placeholder={placeholder}
        value={raw}
        onChange={handleChange}
        onBlur={handleBlur}
        className={clsx(
          prefix && 'pl-7', // <-- espacio para el símbolo
          className
        )}
        {...props}
      />
    </div>
  )
}
