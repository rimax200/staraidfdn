import { EMAIL_PATTERN, FIELD_ORDER, FIELD_RULES } from '../config/contact'
import type {
  ContactErrors,
  ContactValues,
  ErrorCode,
  FieldName,
} from '../types/contact'

export const validateEmail = (raw: string): ErrorCode | undefined => {
  const value = raw.trim()
  const { required, max } = FIELD_RULES.email

  if (value === '') return required ? 'required' : undefined
  if (max !== undefined && value.length > max) return 'tooLong'
  if (!EMAIL_PATTERN.test(value)) return 'invalid'
  return undefined
}

export const validateField = (
  name: FieldName,
  values: ContactValues,
): ErrorCode | undefined => {
  if (name === 'email') return validateEmail(values.email)

  const value = values[name].trim()
  const { required, max } = FIELD_RULES[name]

  if (value === '') return required ? 'required' : undefined
  if (max !== undefined && value.length > max) return 'tooLong'
  return undefined
}

export const validateContact = (values: ContactValues): ContactErrors => {
  const errors: ContactErrors = {}
  for (const name of FIELD_ORDER) {
    const code = validateField(name, values)
    if (code) errors[name] = code
  }
  return errors
}
