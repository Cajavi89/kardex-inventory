'use client'

import { Badge } from '@/components/ui/badge'

export enum EReceiptStatus {
  CANCELLED = 'cancelled',
  PAID = 'paid',
  DRAFT = 'draft',
  UNPAID = 'unpaid'
}

interface ReceiptStatusBadgeProps {
  status: EReceiptStatus
}

export function transformReceiptStatus({ status }: ReceiptStatusBadgeProps) {
  switch (status) {
    case EReceiptStatus.CANCELLED:
      return (
        <Badge
          variant="destructive"
          className="bg-red-100 text-red-700 border-none"
        >
          Cancelada
        </Badge>
      )

    case EReceiptStatus.PAID:
      return (
        <Badge className="bg-green-100 text-green-700 border-none">
          Pagada
        </Badge>
      )

    case EReceiptStatus.UNPAID:
      return (
        <Badge className="bg-yellow-300 text-yellow-800 border-none">
          No Pagada
        </Badge>
      )

    case EReceiptStatus.DRAFT:
      return (
        <Badge className="bg-gray-200 text-gray-700 border-none">
          Borrador
        </Badge>
      )

    default:
      return (
        <Badge className="bg-gray-100 text-gray-500 border-none">
          Desconocido
        </Badge>
      )
  }
}
