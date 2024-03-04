const fs = require('fs')
const path = require('path')

const envPath = path.join(__dirname, '..', '..', '.env')

fs.readFile(envPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading .env file', err)
    return
  }

  const lines = data.split(/\r?\n/)

  const updatedLines = lines.map((line) => {
    if (line.startsWith('KUN_VISUAL_NOVEL_VERSION')) {
      const versionComponents = line
        .split('=')[1]
        .split('.')
        .map((component) => component.replace(/[^0-9]/g, ''))

      if (versionComponents.length === 3) {
        const patch = parseInt(versionComponents[2], 10) + 1
        const newVersion = `'${versionComponents[0]}.${versionComponents[1]}.${patch}'`
        return `KUN_VISUAL_NOVEL_VERSION = ${newVersion}`
      }
    }
    return line
  })

  const updatedData = updatedLines.join('\n')

  fs.writeFile(envPath, updatedData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing .env file', err)
      return
    }
    console.log('KUN_VISUAL_NOVEL_VERSION updated successfully.')
  })
})
