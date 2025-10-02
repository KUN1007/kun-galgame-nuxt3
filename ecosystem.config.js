const path = require('path')

module.exports = {
  apps: [
    {
      name: 'kun-visual-novel',
      port: 7777,
      cwd: path.resolve(__dirname),
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      script: './.output/server/index.mjs',
      interpreter: 'node',
      node_args: '--experimental-specifier-resolution=node'
    }
  ]
}
