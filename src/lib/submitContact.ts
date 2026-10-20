import { SUBMIT_TIMEOUT_MS } from '../config/contact'
import type { ContactPayload } from '../types/contact'

export const submitJson = async (
  endpoint: string | undefined,
  payload: object,
): Promise<{ ok: boolean }> => {
  if (!endpoint) return { ok: false }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS)
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    return { ok: response.ok }
  } catch {
    return { ok: false }
  } finally {
    clearTimeout(timer)
  }
}

export const submitContact = (payload: ContactPayload) =>
  submitJson(import.meta.env.VITE_CONTACT_ENDPOINT, payload)
