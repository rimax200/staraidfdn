/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_ENDPOINT?: string
  readonly VITE_NEWSLETTER_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
