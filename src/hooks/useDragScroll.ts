import { useEffect, type RefObject } from 'react'

const DRAG_THRESHOLD_PX = 5

export function useDragScroll<T extends HTMLElement>(ref: RefObject<T>) {
  useEffect(() => {
    const element = ref.current
    if (!element) return

    let startX = 0
    let startScroll = 0
    let pointerId: number | null = null
    let moved = false

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return
      pointerId = event.pointerId
      startX = event.clientX
      startScroll = element.scrollLeft
      moved = false
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return
      const delta = event.clientX - startX
      if (!moved && Math.abs(delta) > DRAG_THRESHOLD_PX) {
        moved = true
        element.setPointerCapture(event.pointerId)
        element.style.scrollSnapType = 'none'
        element.style.cursor = 'grabbing'
        element.style.userSelect = 'none'
      }
      if (moved) element.scrollLeft = startScroll - delta
    }

    const onPointerEnd = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return
      pointerId = null
      if (!moved) return
      element.style.scrollSnapType = ''
      element.style.cursor = ''
      element.style.userSelect = ''
    }

    const onClickCapture = (event: MouseEvent) => {
      if (!moved) return
      event.preventDefault()
      event.stopPropagation()
      moved = false
    }

    element.addEventListener('pointerdown', onPointerDown)
    element.addEventListener('pointermove', onPointerMove)
    element.addEventListener('pointerup', onPointerEnd)
    element.addEventListener('pointercancel', onPointerEnd)
    element.addEventListener('click', onClickCapture, true)

    return () => {
      element.removeEventListener('pointerdown', onPointerDown)
      element.removeEventListener('pointermove', onPointerMove)
      element.removeEventListener('pointerup', onPointerEnd)
      element.removeEventListener('pointercancel', onPointerEnd)
      element.removeEventListener('click', onClickCapture, true)
    }
  }, [ref])
}
