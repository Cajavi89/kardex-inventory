'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle({ isExpanded }: { isExpanded: boolean }) {
  const { theme, setTheme } = useTheme()
  const [selected, setSelected] = useState(1) // Por defecto, "system" está seleccionado
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const themes = [
    { id: 1, name: 'dark', icon: <Moon size={16} /> },
    { id: 2, name: 'light', icon: <Sun size={18} /> }
  ]

  /**
   * Función encargada de manejar los eventos de estado para cambiar de theme
   * entre system, dark o light
   * @param { string | undefined } name nombre del theme seleccionado
   */
  const onClickHandler = (name: string | undefined = undefined) => {
    if (isExpanded && name) {
      setTheme(name)
    } else if (!isExpanded) {
      // Encontrar el índice del tema actual
      const currentIndex = themes.findIndex((t) => t.id === selected)
      // Calcular el siguiente índice (rotar al inicio si llega al final)
      const nextIndex = (currentIndex + 1) % themes.length
      const nextTheme = themes[nextIndex]
      setTheme(nextTheme.name)
      setSelected(nextTheme.id)
    }
  }

  if (!mounted) return null // Evita que se renderice antes de montar
  return (
    <div className={`flex gap-1 ${!isExpanded && 'mx-auto'} px-2`}>
      {themes.map(({ id, name, icon }) => (
        <button
          key={id}
          onClick={() => onClickHandler(name)}
          className={`p-1 rounded ${theme === name ? 'bg-gray-400 bg-opacity-30' : ''} ${
            !isExpanded && selected !== id ? 'hidden' : ''
          }`}
        >
          {icon}
        </button>
      ))}
    </div>
  )
}
