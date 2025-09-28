import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ROOTS = [
  path.resolve(__dirname, '..', 'components'),
  path.resolve(__dirname, '..', 'pages')
]

const readAllVueFiles = (dir) => {
  const out = []
  if (!fs.existsSync(dir)) return out
  const stack = [dir]
  while (stack.length) {
    const d = stack.pop()
    const entries = fs.readdirSync(d, { withFileTypes: true })
    for (const e of entries) {
      const p = path.join(d, e.name)
      if (e.isDirectory()) stack.push(p)
      else if (e.isFile() && p.endsWith('.vue')) out.push(p)
    }
  }
  return out
}

const extractTemplate = (content) => {
  const m = content.match(/<template(?:\s[^>]*)?>([\s\S]*?)<\/template>/i)
  return m ? m[1] : null
}

const countRootNodes = (tpl) => {
  if (!tpl) return 0
  let s = tpl
  // strip html comments
  s = s.replace(/<!--([\s\S]*?)-->/g, '')
  let i = 0
  let depth = 0
  let count = 0
  const len = s.length
  while (i < len) {
    if (s.startsWith('</', i)) {
      // end tag
      i += 2
      // read tag name
      while (i < len && s[i] !== '>') i++
      depth = Math.max(0, depth - 1)
      i++
      continue
    }
    if (s[i] === '<') {
      // start or self-closing tag
      i++
      // skip leading spaces and tag name/attrs until '>'
      let isSelfClose = false
      while (i < len && s[i] !== '>') {
        i++
      }
      if (s[i - 1] === '/') isSelfClose = true
      if (depth === 0) count++
      if (!isSelfClose) depth++
      i++
      continue
    }
    // text node
    let j = i
    while (j < len && s[j] !== '<') j++
    const text = s.slice(i, j)
    if (depth === 0 && text.trim().length) count++
    i = j
  }
  return count
}

const files = ROOTS.flatMap(readAllVueFiles)
const bad = []
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8')
  const tpl = extractTemplate(content)
  if (tpl === null) continue
  const c = countRootNodes(tpl)
  if (c !== 1) bad.push({ file: f, roots: c })
}

if (!bad.length) {
  console.log('All scanned Vue SFCs have exactly one root node in <template>.')
} else {
  for (const b of bad) {
    console.log(
      `${path.relative(path.resolve(__dirname, '..'), b.file)} (roots: ${b.roots})`
    )
  }
}
