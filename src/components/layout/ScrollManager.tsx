import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import { ScrollTrigger } from '../../lib/gsap'

const positions = new Map<string, number>()

export function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const navigationType = useNavigationType()
  const currentKey = useRef(key)
  const previousPath = useRef<string>()

  useLayoutEffect(() => {
    currentKey.current = key
  }, [key])

  useEffect(() => {
    history.scrollRestoration = 'manual'
    const remember = () => positions.set(currentKey.current, window.scrollY)
    window.addEventListener('scroll', remember, { passive: true })
    return () => window.removeEventListener('scroll', remember)
  }, [])

  useEffect(() => {
    const crossRoute = previousPath.current !== pathname
    previousPath.current = pathname
    const saved = positions.get(key)

    if (!hash && !(navigationType === 'POP' && saved !== undefined)) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return
    }

    let frame = 0
    let cancelled = false
    document.fonts.ready.then(() => {
      if (cancelled) return
      ScrollTrigger.refresh()
      frame = requestAnimationFrame(() => {
        if (!hash && saved !== undefined) {
          window.scrollTo({ top: saved, left: 0, behavior: 'instant' })
          return
        }
        document
          .getElementById(decodeURIComponent(hash.slice(1)))
          ?.scrollIntoView({
            behavior: crossRoute ? 'instant' : 'smooth',
            block: 'start',
          })
      })
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
    }
  }, [pathname, hash, key, navigationType])

  return null
}
