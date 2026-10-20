import { useLocation } from 'react-router-dom'
import { DONATE_LINK, NAV_LINKS } from '../../content/navigation'
import { SITE } from '../../content/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useMobileMenu } from '../../hooks/useMobileMenu'
import type { SectionId } from '../../types/navigation'
import { Button } from '../ui/Button'
import { MenuIcon } from '../ui/MenuIcon'
import { Logo } from './Logo'
import { NavList } from './NavList'

const SECTION_IDS_IN_NAV: readonly SectionId[] = NAV_LINKS.map(
  (link) => link.sectionId,
)

export function Header() {
  const isDonate = useLocation().pathname === DONATE_LINK.href
  const active = useActiveSection(SECTION_IDS_IN_NAV)
  const { isOpen, close, toggle, containerRef, buttonRef, panelRef } =
    useMobileMenu()

  return (
    <header className="fixed inset-x-0 top-header-inset z-50 px-header-inset lg:px-header-gutter">
      <div ref={containerRef} className="relative mx-auto max-w-content">
        <div className="flex items-center justify-between rounded-panel bg-surface px-4 py-2 lg:px-6 lg:py-3.5">
          <Logo />
          <nav aria-label={SITE.primaryNavLabel} className="hidden lg:block">
            <NavList
              active={active}
              className="flex items-center"
              linkClassName="px-3 py-1.5"
            />
          </nav>
          <div className="hidden lg:block">
            <Button to={DONATE_LINK.href} current={isDonate} variant="compact">
              {DONATE_LINK.label}
            </Button>
          </div>
          <button
            ref={buttonRef}
            type="button"
            onClick={toggle}
            aria-expanded={isOpen}
            aria-controls={SITE.mobileMenuId}
            aria-label={isOpen ? SITE.closeMenuLabel : SITE.openMenuLabel}
            className="flex size-10 items-center justify-center rounded-control text-on-surface lg:hidden"
          >
            <MenuIcon open={isOpen} />
          </button>
        </div>
        {isOpen && (
          <div
            ref={panelRef}
            id={SITE.mobileMenuId}
            className="absolute inset-x-0 top-full mt-2 flex flex-col gap-4 rounded-panel bg-surface p-4 lg:hidden"
          >
            <nav aria-label={SITE.mobileNavLabel}>
              <NavList
                active={active}
                onNavigate={close}
                className="flex flex-col"
                linkClassName="py-3"
              />
            </nav>
            <Button
              to={DONATE_LINK.href}
              current={isDonate}
              variant="compact"
              onClick={close}
              className="w-full py-3"
            >
              {DONATE_LINK.label}
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
