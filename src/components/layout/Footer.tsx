import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { FOOTER_ENTRY_START, REDUCED_MOTION_QUERY } from '../../config/motion'
import { FOOTER } from '../../content/footer'
import { gsap, useGSAP } from '../../lib/gsap'
import { reveal } from '../../lib/reveal'
import { toAnchor } from '../../utils/anchor'
import { NewsletterForm } from '../ui/NewsletterForm'
import { Logo } from './Logo'

const LINK_CLASS =
  'inline-block rounded-control py-0.5 font-body text-footer-link text-on-dark-soft transition-colors hover:text-on-dark motion-reduce:transition-none'

export function Footer() {
  const scope = useRef<HTMLElement>(null)
  const content = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(REDUCED_MOTION_QUERY, () => {
        if (!scope.current || !content.current) return
        reveal([content.current], {
          trigger: scope.current,
          start: FOOTER_ENTRY_START,
        })
      })
      return () => mm.revert()
    },
    { scope },
  )

  return (
    <footer ref={scope} className="relative overflow-hidden bg-action">
      <div
        aria-hidden="true"
        className="absolute inset-0 flex shadow-banner-inset"
      >
        {FOOTER.stripOpacities.map((opacity, index) => (
          <div
            key={index}
            style={{ opacity }}
            className="h-full flex-1 bg-(image:--gradient-banner-strip) backdrop-blur-sm"
          />
        ))}
      </div>
      <div
        ref={content}
        className="relative mx-auto flex w-full max-w-hero flex-col gap-10 px-gutter pt-12 md:gap-20 md:px-12.5 md:pt-20"
      >
        <div className="grid gap-10 md:grid-cols-2 md:gap-x-12 xl:flex xl:items-start xl:gap-16">
          <div className="flex max-w-sm flex-col gap-5 xl:min-w-0 xl:flex-1">
            <Logo variant="footer" />
            <p className="font-body text-footer-link text-on-dark-soft">
              {FOOTER.description}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 md:gap-12 xl:flex xl:shrink-0 xl:gap-27.5">
            {FOOTER.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="font-body text-footer-title font-medium text-on-dark">
                  {column.title}
                </p>
                <ul className="mt-8 flex flex-col gap-3">
                  {column.links
                    .filter((link) => !link.pending)
                    .map((link) => (
                      <li key={link.label}>
                        <Link
                          to={toAnchor(link.sectionId)}
                          className={LINK_CLASS}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </nav>
            ))}
          </div>
          <div className="flex flex-col gap-5 md:col-span-2 md:max-w-120 xl:w-120 xl:shrink">
            <h2 className="font-heading text-newsletter-title font-semibold text-on-dark">
              {FOOTER.newsletter.title}
            </h2>
            <div className="flex flex-col gap-3">
              <NewsletterForm />
              <p className="font-body text-footer-link text-on-dark">
                {FOOTER.newsletter.helper}
              </p>
            </div>
          </div>
        </div>
        <p className="border-t border-border-on-dark py-6 text-center font-ui text-footer-link font-semibold text-on-dark-soft">
          {FOOTER.copyrightMark} {new Date().getFullYear()} {FOOTER.copyright}
        </p>
      </div>
    </footer>
  )
}
