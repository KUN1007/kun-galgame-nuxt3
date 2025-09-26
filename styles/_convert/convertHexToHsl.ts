// color variables powered by heroui

import fs from 'fs'
import path from 'path'
import { blue } from './blue'
import { cyan } from './cyan'
import { green } from './green'
import { pink } from './pink'
import { purple } from './purple'
import { red } from './red'
import { yellow } from './yellow'
import { zinc } from './zinc'

const hexToHsl = (hex: string) => {
  const r = parseInt(hex.substring(1, 3), 16) / 255
  const g = parseInt(hex.substring(3, 5), 16) / 255
  const b = parseInt(hex.substring(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const diff = max - min

  let l = (max + min) / 2
  let h = 0
  let s = 0

  if (diff !== 0) {
    if (max === r) {
      h = (g - b) / diff
    } else if (max === g) {
      h = (b - r) / diff + 2
    } else {
      h = (r - g) / diff + 4
    }

    s = diff / (1 - Math.abs(2 * l - 1))
  }

  h = (h * 60 + 360) % 360
  s = Math.round(s * 100)
  l = Math.round(l * 100)

  return `${Math.round(h)} ${s}% ${l}%`
}

const writeColorsToTxt = (
  colors: Record<string, Record<string, string>>,
  outputPath: string
) => {
  let output = ''
  const categories: Record<string, string> = {
    zinc: 'default',
    blue: 'primary',
    pink: 'secondary',
    green: 'success',
    yellow: 'warning',
    red: 'danger',
    cyan: 'info'
  }

  for (const [filename, colorData] of Object.entries(colors)) {
    const category = categories[filename] || 'default'
    output += `/* ${category.charAt(0).toUpperCase() + category.slice(1)} colors - ${filename.charAt(0).toUpperCase() + filename.slice(1)} */\n`
    for (const [key, hex] of Object.entries(colorData)) {
      const hsl = hexToHsl(hex)
      output += `    --${category}-${key}: ${hsl};\n`
    }
    output += '\n'
  }

  fs.writeFileSync(outputPath, output)
}

const processColors = () => {
  const dir = path.resolve(__dirname)
  const colors: Record<string, Record<string, string>> = {
    blue,
    cyan,
    green,
    pink,
    purple,
    red,
    yellow,
    zinc
  }

  writeColorsToTxt(colors, path.join(dir, 'colors-output.txt'))
}

processColors()
