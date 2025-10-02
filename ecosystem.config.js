import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

module.exports = {
  apps: [
    {
      name: 'kun-visual-novel',
      port: 7777,
      cwd: path.join(__dirname),
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      script: './.output/server/index.mjs'
    }
  ]
}
