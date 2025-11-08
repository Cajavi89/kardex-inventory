import InxayLogo from './inxayLogo'

export default function Logo({
  isExpanded = true,
  logoColor
}: {
  isExpanded?: boolean
  logoColor?: string
}) {
  return (
    <div className="flex items-center gap-2 p-3">
      <InxayLogo
        className={`${'w-6 ml-1 shrink-0'} ${logoColor ? `text-blue-500` : ''}`}
      />
      <h1
        className={`text-2xl font-bold ${isExpanded ? '' : 'hidden'} ${logoColor ? `text-blue-500` : ''}`}
      >
        inxay
      </h1>
    </div>
  )
}
