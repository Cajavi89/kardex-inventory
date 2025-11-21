import { Input } from '@/components/ui/input'
import { AlertCircle } from 'lucide-react'
import { TooltipAssign } from './TooltipAssign'

export function InputWithError({
  error,
  children,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string
}) {
  return (
    <div className="relative flex items-center">
      <Input
        {...props}
        className={`pr-10 ${
          error ? 'border-red-500 focus-visible:ring-red-500' : ''
        }`}
      />

      {error && (
        <TooltipAssign tooltipMsg={error} side="top">
          <AlertCircle className="absolute right-2 h-4 w-4 text-red-500 cursor-pointer" />
        </TooltipAssign>
      )}
    </div>
  )
}
