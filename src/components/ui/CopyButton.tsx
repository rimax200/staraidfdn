import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { FaCheck, FaRegCopy } from 'react-icons/fa6'
import { DONATE } from '../../content/donate'

type CopyStatus = 'idle' | 'copied' | 'failed'

interface CopyButtonProps {
  value: string
  source: RefObject<HTMLElement>
}

const { copy } = DONATE

const selectContents = (element: HTMLElement) => {
  const selection = window.getSelection()
  const range = document.createRange()
  range.selectNodeContents(element)
  selection?.removeAllRanges()
  selection?.addRange(range)
  return selection
}

const copyWithFallback = (element: HTMLElement | null): boolean => {
  if (!element) return false
  const selection = selectContents(element)
  try {
    const done = document.execCommand('copy')
    if (done) selection?.removeAllRanges()
    return done
  } catch {
    return false
  }
}

const copyText = async (
  value: string,
  element: HTMLElement | null,
): Promise<boolean> => {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value)
      return true
    } catch {
      return copyWithFallback(element)
    }
  }
  return copyWithFallback(element)
}

export function CopyButton({ value, source }: CopyButtonProps) {
  const [status, setStatus] = useState<CopyStatus>('idle')
  const timer = useRef<number>()

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const handleClick = async () => {
    const ok = await copyText(value, source.current)
    window.clearTimeout(timer.current)
    setStatus(ok ? 'copied' : 'failed')
    timer.current = window.setTimeout(() => setStatus('idle'), copy.resetMs)
  }

  const announcement =
    status === 'copied' ? copy.copied : status === 'failed' ? copy.failed : ''
  const visible =
    status === 'copied'
      ? copy.copiedVisible
      : status === 'failed'
        ? copy.failed
        : ''

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label={copy.label}
        className="flex size-11 shrink-0 items-center justify-center rounded-control text-ink"
      >
        {status === 'copied' ? (
          <FaCheck aria-hidden="true" className="size-6" />
        ) : (
          <FaRegCopy aria-hidden="true" className="size-6" />
        )}
      </button>
      <span aria-live="polite" className="sr-only">
        {announcement}
      </span>
      <span
        aria-hidden="true"
        className={`absolute top-full right-0 left-0 mt-2 text-right font-ui text-footer-link ${status === 'failed' ? 'text-error' : 'text-brand'}`}
      >
        {visible}
      </span>
    </>
  )
}
