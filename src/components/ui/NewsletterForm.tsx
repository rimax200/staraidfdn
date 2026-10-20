import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { FOOTER } from '../../content/footer'
import { ScrollTrigger } from '../../lib/gsap'
import { submitJson } from '../../lib/submitContact'
import { validateEmail } from '../../lib/validateContact'
import type { NewsletterError, NewsletterStatus } from '../../types/footer'
import { ArrowRightIcon } from './ArrowRightIcon'
import { Button } from './Button'

const { newsletter } = FOOTER
const INPUT_ID = 'newsletter-email'
const ERROR_ID = 'newsletter-email-error'

const refreshSoon = () => {
  requestAnimationFrame(() => ScrollTrigger.refresh())
}

export function NewsletterForm() {
  const wrap = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const statusEl = useRef<HTMLParagraphElement>(null)

  const [email, setEmail] = useState('')
  const [error, setError] = useState<NewsletterError>()
  const [attempted, setAttempted] = useState(false)
  const [status, setStatus] = useState<NewsletterStatus>('idle')
  const [footprint, setFootprint] = useState<number>()

  useEffect(() => {
    if (status === 'success') statusEl.current?.focus()
  }, [status])

  const isSubmitting = status === 'submitting'

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isSubmitting) return
    const value = event.target.value
    setEmail(value)
    if (attempted) setError(validateEmail(value))
  }

  const handleBlur = () => {
    if (attempted) setError(validateEmail(email))
  }

  const succeed = () => {
    setFootprint(wrap.current?.offsetHeight)
    setStatus('success')
    refreshSoon()
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return

    const formData = new FormData(event.currentTarget)
    if (formData.get(newsletter.honeypotName)) {
      succeed()
      return
    }

    const found = validateEmail(email)
    setError(found)
    setAttempted(true)
    if (found) {
      input.current?.focus()
      return
    }

    setStatus('submitting')
    const result = await submitJson(import.meta.env.VITE_NEWSLETTER_ENDPOINT, {
      email: email.trim(),
    })
    if (result.ok) succeed()
    else setStatus('error')
  }

  return (
    <div ref={wrap}>
      {status === 'success' ? (
        <p
          ref={statusEl}
          role="status"
          aria-live="polite"
          tabIndex={-1}
          style={{ minHeight: footprint }}
          className="flex items-center font-body text-footer-link text-on-dark"
        >
          {newsletter.success}
        </p>
      ) : (
        <form
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col gap-3"
        >
          {status === 'error' ? (
            <p role="alert" className="font-body text-footer-link text-on-dark">
              {newsletter.failure}
            </p>
          ) : null}
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-5">
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <label htmlFor={INPUT_ID} className="sr-only">
                {newsletter.label}
              </label>
              <input
                ref={input}
                id={INPUT_ID}
                name="email"
                type="email"
                autoComplete="email"
                placeholder={newsletter.placeholder}
                value={email}
                readOnly={isSubmitting}
                aria-required="true"
                aria-invalid={error !== undefined}
                aria-describedby={error ? ERROR_ID : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`min-h-11 w-full rounded-button border bg-action px-5 py-3.5 font-ui text-field text-on-dark placeholder:text-on-dark-soft md:text-field-sm ${error ? 'border-on-dark' : 'border-border-on-dark'}`}
              />
              {error ? (
                <p
                  id={ERROR_ID}
                  className="font-body text-footer-link text-on-dark"
                >
                  {newsletter.errors[error]}
                </p>
              ) : null}
            </div>
            <div aria-hidden="true" className="sr-only">
              <input
                type="text"
                name={newsletter.honeypotName}
                tabIndex={-1}
                autoComplete="off"
                defaultValue=""
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              icon={<ArrowRightIcon />}
              className="w-full disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
            >
              {isSubmitting ? newsletter.submitting : newsletter.submit}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
