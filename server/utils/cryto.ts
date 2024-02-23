import crypto from 'node:crypto'

type HashAlgorithmIdentifier = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512'

export async function digestMessage(
  message: string,
  algorithm: HashAlgorithmIdentifier = 'SHA-256'
) {
  const msgUint8 = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest(algorithm, msgUint8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}
