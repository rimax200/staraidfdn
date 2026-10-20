import type { IconType } from 'react-icons'

export type FieldName =
  'firstName' | 'companyName' | 'interest' | 'email' | 'message'

export type FieldKind = 'text' | 'email' | 'select' | 'textarea'
export type ErrorCode = 'required' | 'invalid' | 'tooLong'
export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export type ContactValues = Record<FieldName, string>
export type ContactErrors = Partial<Record<FieldName, ErrorCode>>

export interface FieldContent {
  kind: FieldKind
  label: string
  placeholder: string
  autoComplete?: string
}

export interface SelectOption {
  value: string
  label: string
}

export interface ContactLinkValue {
  text: string
  href?: string
}

export interface ContactRow {
  id: string
  label: string
  values: readonly ContactLinkValue[]
  icon: IconType
}

export interface SocialLink {
  id: string
  label: string
  icon: IconType
  url?: string
}

export interface ContactPayload {
  firstName: string
  companyName: string
  interest: string
  email: string
  message: string
}
