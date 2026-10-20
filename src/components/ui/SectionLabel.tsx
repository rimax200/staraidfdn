import logo from '../../assets/images/logo.svg'
import { SITE } from '../../content/site'

interface SectionLabelProps {
  children: string
  className?: string
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <p
      className={`flex items-center gap-3 font-ui text-label font-semibold uppercase ${className}`}
    >
      <img src={logo} alt="" width={SITE.logoSize} height={SITE.logoSize} />
      {children}
    </p>
  )
}
