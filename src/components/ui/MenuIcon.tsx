interface MenuIconProps {
  open: boolean
}

export function MenuIcon({ open }: MenuIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d={open ? 'M6 6L18 18M18 6L6 18' : 'M4 7H20M4 12H20M4 17H20'} />
    </svg>
  )
}
