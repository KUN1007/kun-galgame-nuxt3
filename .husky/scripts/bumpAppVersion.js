const fs = require('fs')
const path = require('path')

const packagePath = path.join(__dirname, '..', '..', 'package.json')

const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'))

const versionParts = packageJson.version
  .split('.')
  .map((part) => parseInt(part, 10))

versionParts[2] += 1

packageJson.version = versionParts.join('.')
fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n')
