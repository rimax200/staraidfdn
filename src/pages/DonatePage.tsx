import { useEffect, useRef } from 'react'
import { useNavigationType } from 'react-router-dom'
import { CopyButton } from '../components/ui/CopyButton'
import {
  ENTRY_DURATION,
  ENTRY_EASE,
  ENTRY_OFFSET_Y,
  ENTRY_STAGGER,
  REDUCED_MOTION_QUERY,
} from '../config/motion'
import { DONATE } from '../content/donate'
import { usePageMeta } from '../hooks/usePageMeta'
import { gsap, useGSAP } from '../lib/gsap'

const { background, accountNumber, notice } = DONATE
const LABEL = 'font-ui text-contact-row text-paragraph'
const VALUE = 'font-ui text-donate-value font-semibold text-ink capitalize'
const DIVIDER = 'border-t border-dashed border-divider'
const srcSet = background.variants
  .map(({ src, width }) => `${src} ${width}w`)
  .join(', ')

export function DonatePage() {
  const scope = useRef<HTMLElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const number = useRef<HTMLParagraphElement>(null)
  const navigationType = useNavigationType()

  usePageMeta(DONATE.meta)

  useEffect(() => {
    if (navigationType === 'PUSH')
      heading.current?.focus({ preventScroll: true })
  }, [navigationType])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(REDUCED_MOTION_QUERY, () => {
        const targets = gsap.utils.toArray<Element>('[data-donate-reveal]')
        gsap.set(targets, { opacity: 0, y: ENTRY_OFFSET_Y })
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: ENTRY_DURATION,
          ease: ENTRY_EASE,
          stagger: ENTRY_STAGGER,
        })
      })
      return () => mm.revert()
    },
    { scope },
  )

  return (
    <main ref={scope}>
      <div className="relative min-h-svh overflow-hidden">
        <img
          src={background.fallbackSrc}
          srcSet={srcSet}
          sizes={background.sizes}
          width={background.width}
          height={background.height}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 size-full object-cover object-(--object-position-donate)"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-overlay opacity-(--opacity-overlay) md:hidden"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden bg-(image:--gradient-donate-overlay) md:block"
        />
        <div className="relative mx-auto grid w-full max-w-hero gap-y-2 px-(--content-inset) pt-32 pb-20 lg:grid-cols-[var(--width-donate-card)_minmax(0,1fr)] lg:gap-x-12 lg:pt-40 lg:pb-24">
          <div className="mb-6 flex flex-col gap-5 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mb-0 lg:self-center">
            <h1
              ref={heading}
              tabIndex={-1}
              data-donate-reveal
              className="bg-(image:--gradient-donate-title) bg-clip-text font-heading text-hero-title font-semibold text-transparent"
            >
              {DONATE.heading.map((line, index) => (
                <span key={line}>
                  {index > 0 ? ' ' : null}
                  <span className="block">{line}</span>
                </span>
              ))}
            </h1>
            <p
              data-donate-reveal
              className="max-w-donate-text font-ui text-donate-lede font-medium text-on-dark"
            >
              {DONATE.paragraph}
            </p>
          </div>
          <div
            data-donate-reveal
            className="flex flex-col gap-6 rounded-xl border border-card-border bg-surface p-6 md:p-12 lg:col-start-1 lg:row-start-1"
          >
            <h2 className="font-serif text-donate-card-title font-medium text-on-surface">
              {DONATE.cardTitle}
            </h2>
            {DONATE.rows.map((row, index) => (
              <div key={row.id} className="flex flex-col gap-6">
                {index > 0 ? <hr className={DIVIDER} /> : null}
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
                  <div className="flex min-w-0 flex-1 basis-52 flex-col gap-0.5">
                    <p className={LABEL}>{row.label}</p>
                    <p className={VALUE}>{row.value}</p>
                  </div>
                  {row.logo ? (
                    <img
                      src={row.logo.src}
                      alt=""
                      width={row.logo.width}
                      height={row.logo.height}
                      loading="lazy"
                      decoding="async"
                      className="h-auto w-28.5 shrink-0"
                    />
                  ) : null}
                </div>
              </div>
            ))}
            <hr className={DIVIDER} />
            <div className="flex flex-col gap-3.5 pb-7">
              <p className={LABEL}>{accountNumber.label}</p>
              <div className="relative flex items-center justify-between gap-2 rounded-2xl bg-faq-surface px-4 py-5 shadow-donate-number md:px-5 md:py-6">
                <p
                  ref={number}
                  className="font-ui text-donate-number font-semibold whitespace-nowrap text-ink tabular-nums select-all"
                >
                  {accountNumber.value}
                </p>
                <CopyButton value={accountNumber.value} source={number} />
              </div>
            </div>
          </div>
          <p
            data-donate-reveal
            className="rounded-xl bg-surface px-6 py-7 font-heading text-donate-notice font-medium text-faq-question lg:col-start-1 lg:row-start-2"
          >
            {notice.segments.map(({ text, emphasis, href }) => {
              if (href) {
                return (
                  <a
                    key={text}
                    href={href}
                    className="rounded-control underline underline-offset-4"
                  >
                    {text}
                  </a>
                )
              }
              return emphasis ? (
                <strong key={text} className="font-bold">
                  {text}
                </strong>
              ) : (
                <span key={text}>{text}</span>
              )
            })}
          </p>
        </div>
      </div>
    </main>
  )
}
