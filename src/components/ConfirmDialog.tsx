// components/AlertDialogComponent.tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { AlertTriangle, Trash2, Edit, XCircle } from 'lucide-react'

// Definimos los tipos posibles de alerta
type AlertType = 'delete' | 'edit' | 'close'

interface AlertDialogProps {
  // Parámetros obligatorios para el control y el tipo
  alertType: AlertType
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void

  // Parámetros opcionales (anulan los valores por defecto)
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
}

// 1. DEFINICIÓN DE MENSAJES Y ESTILOS POR DEFECTO
const ALERT_CONFIG = {
  delete: {
    icon: <Trash2 className="h-6 w-6 text-red-500 mr-2" />,
    colorClass: 'border-l-4 border-red-500',
    confirmButtonClass: 'bg-red-500 hover:bg-red-600 text-white',
    defaultTitle: 'Está a punto de eliminar esta entrada, ¿desea continuar?',
    defaultMessage:
      'Una vez se elimine este recurso, no podrá recuperarlo. Esta acción es irreversible.',
    defaultConfirmText: 'Sí, Eliminar',
    defaultCancelText: 'Cancelar'
  },
  edit: {
    icon: <Edit className="h-6 w-6 text-blue-500 mr-2" />,
    colorClass: 'border-l-4 border-blue-500',
    confirmButtonClass: 'bg-blue-500 hover:bg-blue-600 text-white',
    defaultTitle: 'Está a punto de guardar los cambios, ¿desea continuar?',
    defaultMessage: 'Una vez que guardes, los cambios serán permanentes.',
    defaultConfirmText: 'Guardar Cambios',
    defaultCancelText: 'Descartar'
  },
  close: {
    icon: <XCircle className="h-6 w-6 text-yellow-500 mr-2" />,
    colorClass: 'border-l-4 border-yellow-500',
    confirmButtonClass: 'bg-yellow-500 hover:bg-yellow-600 text-black',
    defaultTitle: 'Aún hay cambios sin guardar, ¿desea cerrar?',
    defaultMessage:
      'Si cierra ahora, se perderán todos los cambios no guardados.',
    defaultConfirmText: 'Cerrar y Descartar',
    defaultCancelText: 'Permanecer'
  }
}

export function ConfirmDialog({
  alertType,
  isOpen,
  onClose,
  onConfirm,

  // Usamos el operador de coalescencia nula (??) para las props opcionales
  title,
  message,
  confirmText,
  cancelText
}: AlertDialogProps) {
  // OBTENER CONFIGURACIÓN POR TIPO
  const config = ALERT_CONFIG[alertType] || {
    icon: <AlertTriangle className="h-6 w-6 text-gray-500 mr-2" />,
    colorClass: '',
    confirmButtonClass: 'bg-primary text-primary-foreground',
    defaultTitle: 'Acción Requerida',
    defaultMessage: 'Por favor, confirma la acción a realizar.',
    defaultConfirmText: 'Confirmar',
    defaultCancelText: 'Cancelar'
  }

  // ASIGNAR VALORES (Personalizado O Por Defecto)
  const finalTitle = title ?? config.defaultTitle
  const finalMessage = message ?? config.defaultMessage
  const finalConfirmText = confirmText ?? config.defaultConfirmText
  const finalCancelText = cancelText ?? config.defaultCancelText

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center">
            <div className="mr-2 ">{config.icon}</div>
            <div className="text-lg font-semibold">{finalTitle}</div>
          </AlertDialogTitle>
          <AlertDialogDescription>{finalMessage}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>
            {finalCancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={config.confirmButtonClass}
          >
            {finalConfirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
