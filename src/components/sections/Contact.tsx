import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { FIELD_ORDER, FIELD_RULES, FIRST_FIELD } from '../../config/contact'
import {
  CONTACT_BLOCK_STACKED_START,
  CONTACT_BLOCKS_START,
  CONTACT_HEADER_START,
  CONTACT_WIDE_QUERY,
  ENTRY_STAGGER,
  REDUCED_MOTION_QUERY,
  REVEAL_STAGGER,
} from '../../config/motion'
import { CONTACT } from '../../content/contact'
import { SECTION_IDS } from '../../content/navigation'
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap'
import { reveal } from '../../lib/reveal'
import { submitContact } from '../../lib/submitContact'
import { validateContact, validateField } from '../../lib/validateContact'
import type {
  ContactErrors,
  ContactValues,
  FieldName,
  FormStatus,
} from '../../types/contact'
import { ArrowRightIcon } from '../ui/ArrowRightIcon'
import { Button } from '../ui/Button'
import { ContactCard } from '../ui/ContactCard'
import { FormField } from '../ui/FormField'
import { SectionLabel } from '../ui/SectionLabel'

const HEADING_ID = 'contact-heading'
const { form, success, failure } = CONTACT

const EMPTY_VALUES: ContactValues = {
  firstName: '',
  companyName: '',
  interest: '',
  email: '',
  message: '',
}

const refreshSoon = () => {
  requestAnimationFrame(() => ScrollTrigger.refresh())
}

export function Contact() {
  const scope = useRef<HTMLElement>(null)
  const header = useRef<HTMLDivElement>(null)
  const row = useRef<HTMLDivElement>(null)
  const cardCell = useRef<HTMLDivElement>(null)
  const formCell = useRef<HTMLDivElement>(null)
  const formEl = useRef<HTMLFormElement>(null)
  const statusEl = useRef<HTMLDivElement>(null)

  const [values, setValues] = useState<ContactValues>(EMPTY_VALUES)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [attempted, setAttempted] = useState(false)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [footprint, setFootprint] = useState<number>()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        { motion: REDUCED_MOTION_QUERY, wide: CONTACT_WIDE_QUERY },
        (context) => {
          const { motion, wide } = context.conditions as {
            motion: boolean
            wide: boolean
          }
          const card = cardCell.current
          const formColumn = formCell.current
          if (!motion || !scope.current || !card || !formColumn || !row.current)
            return

          reveal(gsap.utils.toArray<Element>(header.current?.children ?? []), {
            trigger: scope.current,
            start: CONTACT_HEADER_START,
            stagger: ENTRY_STAGGER,
          })

          if (wide) {
            reveal([card, formColumn], {
              trigger: row.current,
              start: CONTACT_BLOCKS_START,
              stagger: REVEAL_STAGGER,
            })
          } else {
            for (const block of [card, formColumn]) {
              reveal([block], {
                trigger: block,
                start: CONTACT_BLOCK_STACKED_START,
              })
            }
          }
        },
      )
      return () => mm.revert()
    },
    { scope },
  )

  useEffect(() => {
    if (status === 'success') statusEl.current?.focus()
  }, [status])

  const updateError = (name: FieldName, next: ContactValues) => {
    const code = validateField(name, next)
    setErrors((current) => {
      const updated = { ...current }
      if (code) updated[name] = code
      else delete updated[name]
      return updated
    })
  }

  const handleChange = (name: FieldName, value: string) => {
    if (status === 'submitting') return
    const next = { ...values, [name]: value }
    setValues(next)
    if (attempted) updateError(name, next)
  }

  const handleBlur = (name: FieldName) => {
    if (attempted) updateError(name, values)
  }

  const showSuccess = () => {
    setFootprint(formCell.current?.offsetHeight)
    setStatus('success')
    refreshSoon()
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'submitting') return

    const formData = new FormData(event.currentTarget)
    if (formData.get(form.honeypotName)) {
      showSuccess()
      return
    }

    const found = validateContact(values)
    setErrors(found)
    setAttempted(true)
    const firstInvalid = FIELD_ORDER.find((name) => found[name])
    if (firstInvalid) {
      const control = formEl.current?.elements.namedItem(firstInvalid)
      if (control instanceof HTMLElement) control.focus()
      return
    }

    setStatus('submitting')
    const result = await submitContact({
      firstName: values.firstName.trim(),
      companyName: values.companyName.trim(),
      interest: values.interest,
      email: values.email.trim(),
      message: values.message.trim(),
    })
    if (result.ok) {
      showSuccess()
    } else {
      setStatus('error')
    }
  }

  const handleReset = () => {
    setValues(EMPTY_VALUES)
    setErrors({})
    setAttempted(false)
    setFootprint(undefined)
    setStatus('idle')
    refreshSoon()
    requestAnimationFrame(() => {
      const first = formEl.current?.elements.namedItem(FIRST_FIELD)
      if (first instanceof HTMLElement) first.focus()
    })
  }

  const isSubmitting = status === 'submitting'

  const renderField = (name: FieldName) => {
    const code = errors[name]
    return (
      <FormField
        name={name}
        field={form.fields[name]}
        value={values[name]}
        error={code ? form.errors[name][code] : undefined}
        required={FIELD_RULES[name].required}
        readOnly={isSubmitting}
        options={name === 'interest' ? form.interestOptions : undefined}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    )
  }

  return (
    <section
      ref={scope}
      id={SECTION_IDS.contact}
      aria-labelledby={HEADING_ID}
      className="bg-surface px-gutter py-12 md:px-15 md:py-17.5"
    >
      <div className="mx-auto flex w-full max-w-contact flex-col gap-10 md:gap-20">
        <div
          ref={header}
          className="mx-auto flex w-full max-w-content flex-col gap-4 md:flex-row-reverse md:items-start md:justify-between"
        >
          <div>
            <SectionLabel>{CONTACT.label}</SectionLabel>
          </div>
          <h2
            id={HEADING_ID}
            className="font-serif text-section-heading font-medium text-on-surface md:max-w-programs-heading"
          >
            {CONTACT.heading}
          </h2>
        </div>
        <div
          ref={row}
          className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12 xl:gap-31.75"
        >
          <div ref={cardCell}>
            <ContactCard />
          </div>
          <div ref={formCell}>
            {status === 'success' ? (
              <div
                style={{ minHeight: footprint }}
                className="flex flex-col items-start justify-center gap-6"
              >
                <div
                  ref={statusEl}
                  role="status"
                  aria-live="polite"
                  tabIndex={-1}
                  className="flex flex-col gap-3"
                >
                  <h3 className="font-heading text-step-title font-medium text-on-surface">
                    {success.heading}
                  </h3>
                  <p className="font-ui text-base text-ink-soft">
                    {success.text}
                  </p>
                </div>
                <Button type="button" variant="compact" onClick={handleReset}>
                  {success.reset}
                </Button>
              </div>
            ) : (
              <form
                ref={formEl}
                noValidate
                onSubmit={handleSubmit}
                className="flex flex-col gap-8"
              >
                <div className="grid gap-8 sm:grid-cols-2 sm:gap-6">
                  {renderField('firstName')}
                  {renderField('companyName')}
                </div>
                {renderField('interest')}
                {renderField('email')}
                {renderField('message')}
                <div aria-hidden="true" className="sr-only">
                  <input
                    type="text"
                    name={form.honeypotName}
                    tabIndex={-1}
                    autoComplete="off"
                    defaultValue=""
                  />
                </div>
                {status === 'error' ? (
                  <p role="alert" className="font-ui text-field-sm text-error">
                    {failure.before}
                    <a
                      href={failure.email.href}
                      className="underline underline-offset-4"
                    >
                      {failure.email.text}
                    </a>
                    {failure.after}
                  </p>
                ) : null}
                <Button
                  type="submit"
                  variant="submit"
                  disabled={isSubmitting}
                  icon={<ArrowRightIcon />}
                  className="w-full md:ml-auto md:w-auto"
                >
                  {isSubmitting ? form.submitting : form.submit}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
