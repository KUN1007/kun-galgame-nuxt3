import type { H3Event } from 'h3'

export const getRemoteIp = (event: H3Event) => {
  const ipForwarded = () => {
    const ip = event.node.req.headers['x-forwarded-for']
    if (Array.isArray(ip)) {
      return ip[0]
    } else {
      return ip?.split(',')[0].trim()
    }
  }

  const xRealIp = event.node.req.headers['x-real-ip']
  const cfConnectingIp = event.node.req.headers['CF-Connecting-IP']

  return cfConnectingIp || ipForwarded() || xRealIp || ''
}
