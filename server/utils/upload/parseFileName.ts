export const sanitizeFileName = (fileName: string) => {
  const match = fileName.match(/^(.*?)(\.[^.]+)?$/)
  if (!match) {
    return fileName
  }

  const baseName = match[1] || 'kun'
  const extension = match[2] || 'ren'

  const sanitizedBaseName = baseName.replace(/[^\p{L}\p{N}_-]/gu, '')

  return `${sanitizedBaseName.slice(0, 100)}${extension}`
}

export const parseFileName = (filename: string) => {
  const raw = filename.replace(/\\/g, '/').split('/').pop() || 'kun.ren'
  const dot = raw.lastIndexOf('.')

  const base = dot > 0 ? raw.slice(0, dot) : raw
  const ext = dot > 0 ? raw.slice(dot + 1).toLowerCase() : 'ren'

  const normalizedFilename = sanitizeFileName(base)
  const normalizedExtension = sanitizeFileName(ext)

  return { base: normalizedFilename, ext: normalizedExtension, raw }
}
