import { useCallback, useEffect, useRef, useState } from 'react'
import { SITE } from '../content/site'

const FOCUSABLE = 'a[href], button:not([disabled])'

export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => {
    setIsOpen(false)
    buttonRef.current?.focus()
  }, [])

  const toggle = useCallback(() => {
    if (isOpen) close()
    else setIsOpen(true)
  }, [isOpen, close])

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
        return
      }
      if (event.key !== 'Tab' || !containerRef.current) return

      const items =
        containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      const first = items[0]
      const last = items[items.length - 1]
      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    const onOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) close()
    }

    const desktop = window.matchMedia(SITE.desktopMediaQuery)
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('click', onOutsideClick)
    desktop.addEventListener('change', onBreakpoint)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('click', onOutsideClick)
      desktop.removeEventListener('change', onBreakpoint)
    }
  }, [isOpen, close])

  return { isOpen, close, toggle, containerRef, buttonRef, panelRef }
}
