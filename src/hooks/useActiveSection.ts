import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import type { SectionId } from '../types/navigation'

const VIEWPORT_BAND = '-45% 0px -50% 0px'

interface ActiveState {
  pathname: string
  id: SectionId
}

export function useActiveSection(ids: readonly SectionId[]): SectionId | null {
  const { pathname } = useLocation()
  const [active, setActive] = useState<ActiveState | null>(null)

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) {
          setActive({ pathname, id: visible.target.id as SectionId })
        }
      },
      { rootMargin: VIEWPORT_BAND },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [ids, pathname])

  return active?.pathname === pathname ? active.id : null
}
