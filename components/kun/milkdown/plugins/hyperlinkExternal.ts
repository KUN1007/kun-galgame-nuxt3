import { Mark } from '@milkdown/prose/model'

const hasURLProtocol = (url: string) => {
  return (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('file://') ||
    url.startsWith('data:') ||
    url.startsWith('ts://?ts') ||
    url.startsWith('ts:?ts')
  )
}

export const handleExternal = (node: Mark) => {
  const href = node.attrs.href
  if (typeof href === 'string' && hasURLProtocol(href)) {
    return {
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  }
  return {}
}
