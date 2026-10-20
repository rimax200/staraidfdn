import type { FieldName } from '../types/contact'

interface FieldRule {
  required: boolean
  max?: number
}

export const FIELD_RULES: Record<FieldName, FieldRule> = {
  firstName: { required: true, max: 80 },
  companyName: { required: false, max: 120 },
  interest: { required: true },
  email: { required: true, max: 254 },
  message: { required: true, max: 2000 },
}

export const FIELD_ORDER: readonly FieldName[] = [
  'firstName',
  'companyName',
  'interest',
  'email',
  'message',
]

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const SUBMIT_TIMEOUT_MS = 15000

export const FIRST_FIELD: FieldName = 'firstName'
