export type TitleResult = {
  url: string
  finalUrl?: string
  ok: boolean
  status?: number
  contentType?: string | null
  title: string | null
  error?: string
}

export type FetchBothResult = {
  domain: string
  root: TitleResult
  www: TitleResult
  best: TitleResult | null
}

export const _fetchTitle = async (
  domain: string,
  timeoutMs = 5000,
  tryHttpFallback = false
): Promise<FetchBothResult> => {
  const normalizedDomain = normalizeDomain(domain)

  const rootUrl = ensureProtocol(`https://${normalizedDomain}`)
  const wwwUrl = ensureProtocol(`https://www.${normalizedDomain}`)

  const [root, www] = await Promise.all([
    fetchUrl(rootUrl, timeoutMs),
    fetchUrl(wwwUrl, timeoutMs)
  ])

  let root2 = root
  let www2 = www
  if (tryHttpFallback && !root.ok && !www.ok) {
    const [rRoot, rWww] = await Promise.all([
      fetchUrl(rootUrl.replace(/^https:/, 'http:'), timeoutMs),
      fetchUrl(wwwUrl.replace(/^https:/, 'http:'), timeoutMs)
    ])
    root2 = rRoot
    www2 = rWww
  }

  const candidates = [root2, www2]
  const withTitle = candidates.filter(
    (c) => c.title && c.title.trim().length > 0 && c.ok
  )
  let best: TitleResult | null = null
  if (withTitle.length > 0) {
    best =
      withTitle.find((c) => c.url === rootUrl || c.url === root2.url) ??
      withTitle[0]
  } else {
    const anyTitle = candidates.find(
      (c) => c.title && c.title.trim().length > 0
    )
    if (anyTitle) best = anyTitle
    else {
      best = candidates.find((c) => c.ok) ?? candidates[0] ?? null
    }
  }

  return {
    domain: normalizedDomain,
    root: root2,
    www: www2,
    best
  }
}
const normalizeDomain = (d: string) => {
  return d
    .replace(/(^\w+:)|(^\/\/)/, '')
    .replace(/^https?:\/\//, '')
    .replace(/\/+$/, '')
}
const ensureProtocol = (u: string) => {
  if (/^https?:\/\//i.test(u)) return u
  return `https://${u}`
}

const fetchUrl = async (
  url: string,
  timeoutMs: number
): Promise<TitleResult> => {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      redirect: 'follow'
    })
    clearTimeout(id)

    const status = response.status
    const contentType = response.headers.get('content-type')

    let text: string
    try {
      text = await response.text()
    } catch (e) {
      return {
        url,
        finalUrl: (response as { url: string }).url ?? undefined,
        ok: response.ok,
        status,
        contentType,
        title: null,
        error: `Failed to read body text: ${String(e)}`
      }
    }

    const title = extractTitleOrMeta(text)

    return {
      url,
      finalUrl: (response as { url: string }).url ?? undefined,
      ok: response.ok,
      status,
      contentType,
      title: title ? title.trim() : null
    }
  } catch (err) {
    clearTimeout(id)
    const errMsg = err instanceof Error ? err.message : String(err)
    return {
      url,
      ok: false,
      title: null,
      error: errMsg
    }
  }
}

const extractTitleOrMeta = (html: string): string | null => {
  if (!html) return null

  const titleRe = /<title[^>]*>([\s\S]*?)<\/title>/i
  const m = titleRe.exec(html)
  if (m && m[1]) return decodeHtmlEntities(m[1].trim())

  const ogRe =
    /<meta[^>]+property=["']og:title["'][^>]*content=["']([^"']+)["'][^>]*>/i
  const ogAltRe =
    /<meta[^>]+content=["']([^"']+)["'][^>]*property=["']og:title["'][^>]*>/i
  const og = ogRe.exec(html) ?? ogAltRe.exec(html)
  if (og && og[1]) return decodeHtmlEntities(og[1].trim())

  const twRe =
    /<meta[^>]+name=["']twitter:title["'][^>]*content=["']([^"']+)["'][^>]*>/i
  const twAltRe =
    /<meta[^>]+content=["']([^"']+)["'][^>]*name=["']twitter:title["'][^>]*>/i
  const tw = twRe.exec(html) ?? twAltRe.exec(html)
  if (tw && tw[1]) return decodeHtmlEntities(tw[1].trim())

  const h1Re = /<h1[^>]*>([\s\S]*?)<\/h1>/i
  const h1 = h1Re.exec(html)
  if (h1 && h1[1]) return decodeHtmlEntities(stripTags(h1[1]).trim())

  return null
}

const stripTags = (str: string) => {
  return str.replace(/<[^>]+>/g, '')
}

const decodeHtmlEntities = (str: string) => {
  if (!str) return str
  // Web Browser
  if (typeof document !== 'undefined') {
    const ta = document.createElement('textarea')
    ta.innerHTML = str
    return ta.value
  }
  // Node.js
  const named: Record<string, string> = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    nbsp: ' ',
    rsquo: '’',
    ldquo: '“',
    rdquo: '”',
    ndash: '–',
    mdash: '—',
    hellip: '…'
  }
  return str.replace(/&(#?)(x?)([0-9a-zA-Z]+);/g, (_m, isHash, isHex, code) => {
    if (!isHash) {
      return named[code] ?? `&${code};`
    }
    try {
      const num = isHex ? parseInt(code, 16) : parseInt(code, 10)
      if (!Number.isNaN(num)) return String.fromCodePoint(num)
    } catch {
      /* fallthrough */
    }
    return _m
  })
}
