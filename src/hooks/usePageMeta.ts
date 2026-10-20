import { useEffect } from 'react'

interface PageMeta {
  title: string
  description: string
}

export function usePageMeta({ title, description }: PageMeta) {
  useEffect(() => {
    const previousTitle = document.title
    let tag = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    )
    const created = tag === null
    if (!tag) {
      tag = document.createElement('meta')
      tag.name = 'description'
      document.head.append(tag)
    }
    const previousDescription = tag.content

    document.title = title
    tag.content = description

    return () => {
      document.title = previousTitle
      if (created) tag.remove()
      else tag.content = previousDescription
    }
  }, [title, description])
}
