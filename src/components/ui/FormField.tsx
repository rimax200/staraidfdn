import type { ChangeEvent } from 'react'
import chevronDown from '../../assets/icons/chevron-down.svg'
import type { FieldContent, FieldName, SelectOption } from '../../types/contact'
import { MASK_ICON_CLASS, maskStyle } from '../../utils/css'

interface FormFieldProps {
  name: FieldName
  field: FieldContent
  value: string
  error?: string
  required: boolean
  readOnly: boolean
  options?: readonly SelectOption[]
  onChange: (name: FieldName, value: string) => void
  onBlur: (name: FieldName) => void
}

const CONTROL =
  'w-full min-h-11 rounded-lg border bg-surface px-3 py-2.5 font-ui text-field text-ink placeholder:text-field-hint md:text-field-sm'

export function FormField({
  name,
  field,
  value,
  error,
  required,
  readOnly,
  options,
  onChange,
  onBlur,
}: FormFieldProps) {
  const id = `contact-${name}`
  const errorId = `${id}-error`
  const shared = {
    id,
    name,
    value,
    readOnly,
    'aria-required': required,
    'aria-invalid': error !== undefined,
    'aria-describedby': error ? errorId : undefined,
    onBlur: () => onBlur(name),
  }
  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => onChange(name, event.target.value)
  const border = error ? 'border-error' : 'border-divider'
  const className = `${CONTROL} ${border}`

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label
        htmlFor={id}
        className="font-ui text-field-sm font-normal text-field-hint"
      >
        {field.label}
      </label>
      {field.kind === 'select' ? (
        <div className="relative">
          <select
            {...shared}
            onChange={handleChange}
            className={`${className} appearance-none pr-10 ${value === '' ? 'text-field-hint' : ''}`}
          >
            <option value="" disabled>
              {field.placeholder}
            </option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span
            aria-hidden="true"
            style={maskStyle(chevronDown)}
            className={`${MASK_ICON_CLASS} pointer-events-none absolute top-1/2 right-3 size-5.5 -translate-y-1/2 text-field-hint`}
          />
        </div>
      ) : field.kind === 'textarea' ? (
        <textarea
          {...shared}
          onChange={handleChange}
          placeholder={field.placeholder}
          className={`${className} min-h-36 resize-y`}
        />
      ) : (
        <input
          {...shared}
          type={field.kind}
          onChange={handleChange}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          className={className}
        />
      )}
      {error ? (
        <p id={errorId} className="font-ui text-field-sm text-error">
          {error}
        </p>
      ) : null}
    </div>
  )
}
