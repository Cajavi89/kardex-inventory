import React from 'react'

import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow
} from '@radix-ui/react-tooltip'

export const TooltipAssign = ({
  children,
  tooltipMsg,
  side = 'top'
}: {
  children: React.ReactElement
  tooltipMsg?: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
}) => {
  if (!tooltipMsg) return children

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align="center"
          className="z-9999 rounded-md bg-foreground text-background text-xs px-3 py-2 shadow-lg font-medium"
        >
          {tooltipMsg}
          <TooltipArrow className="fill-foreground" /> {/* flecha */}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
