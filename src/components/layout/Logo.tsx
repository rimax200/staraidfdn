import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'
import { FOOTER } from '../../content/footer'
import { SECTION_IDS } from '../../content/navigation'
import { SITE } from '../../content/site'
import { toAnchor } from '../../utils/anchor'

interface LogoProps {
  variant?: 'header' | 'footer'
}

export function Logo({ variant = 'header' }: LogoProps) {
  if (variant === 'footer') {
    return (
      <Link
        to={toAnchor(SECTION_IDS.home)}
        className="flex items-center gap-4 rounded-control font-logo text-footer-logo text-on-dark"
      >
        <img
          src={logo}
          alt=""
          width={FOOTER.logoSize}
          height={FOOTER.logoSize}
          className="shrink-0"
        />
        {FOOTER.brand}
      </Link>
    )
  }

  return (
    <Link
      to={toAnchor(SECTION_IDS.home)}
      className="flex items-center gap-2 font-logo text-logo text-ink-soft"
    >
      <img src={logo} alt="" width={SITE.logoSize} height={SITE.logoSize} />
      {SITE.logoText}
    </Link>
  )
}
