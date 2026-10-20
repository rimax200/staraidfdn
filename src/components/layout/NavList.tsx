import { Link } from 'react-router-dom'
import { NAV_LINKS } from '../../content/navigation'
import type { SectionId } from '../../types/navigation'
import { toAnchor } from '../../utils/anchor'

interface NavListProps {
  active: SectionId | null
  onNavigate?: () => void
  className?: string
  linkClassName?: string
}

const ACTIVE_CHIP =
  'before:absolute before:inset-y-0 before:-inset-x-1 before:-z-10 before:rounded-control before:bg-surface-active'

export function NavList({
  active,
  onNavigate,
  className = '',
  linkClassName = '',
}: NavListProps) {
  return (
    <ul className={className}>
      {NAV_LINKS.map((link) => {
        const isActive = link.sectionId === active
        return (
          <li key={link.sectionId}>
            <Link
              to={toAnchor(link.sectionId)}
              onClick={onNavigate}
              aria-current={isActive ? 'location' : undefined}
              className={`relative isolate block font-body text-nav text-on-surface ${isActive ? ACTIVE_CHIP : ''} ${linkClassName}`}
            >
              {link.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
