import type { MouseEventHandler, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type ButtonVariant = 'primary' | 'secondary' | 'compact' | 'submit' | 'partner'

interface SharedProps {
  variant: ButtonVariant
  children: ReactNode
  icon?: ReactNode
  className?: string
}

interface LinkButtonProps extends SharedProps {
  href: string
  external?: boolean
  onClick?: MouseEventHandler<HTMLAnchorElement>
  to?: never
  type?: never
  disabled?: never
}

interface RouteButtonProps extends SharedProps {
  to: string
  current?: boolean
  onClick?: MouseEventHandler<HTMLAnchorElement>
  href?: never
  external?: never
  type?: never
  disabled?: never
}

interface ActionButtonProps extends SharedProps {
  type: 'submit' | 'button'
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  href?: never
  to?: never
  external?: never
}

type ButtonProps = LinkButtonProps | RouteButtonProps | ActionButtonProps

const BASE =
  'inline-flex items-center justify-center whitespace-nowrap transition-colors'

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'gap-2 rounded-button bg-surface px-6 py-3.5 font-ui text-button font-medium text-on-surface shadow-button',
  secondary:
    'gap-2 rounded-button border border-border-on-dark bg-surface-dark px-6 py-3.5 font-ui text-button font-medium text-on-dark shadow-button',
  compact:
    'rounded-control bg-action px-4.5 py-1.75 font-body text-cta font-medium text-on-action',
  partner:
    'gap-2 rounded-button border border-border-on-dark bg-action-green px-6 py-3.5 font-ui text-button font-medium text-on-dark shadow-button',
  submit:
    'gap-2 rounded-button border border-border-on-dark bg-progress px-6 py-3.5 font-ui text-button font-medium text-ink disabled:cursor-not-allowed disabled:opacity-60',
}

export function Button(props: ButtonProps) {
  const { variant, children, icon, className = '' } = props
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`

  if (props.to !== undefined) {
    return (
      <Link
        to={props.to}
        aria-current={props.current ? 'page' : undefined}
        onClick={props.onClick}
        className={classes}
      >
        {children}
        {icon}
      </Link>
    )
  }

  if (props.href !== undefined) {
    return (
      <a
        href={props.href}
        target={props.external ? '_blank' : undefined}
        rel={props.external ? 'noopener noreferrer' : undefined}
        onClick={props.onClick}
        className={classes}
      >
        {children}
        {icon}
      </a>
    )
  }

  return (
    <button
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
      className={classes}
    >
      {children}
      {icon}
    </button>
  )
}
