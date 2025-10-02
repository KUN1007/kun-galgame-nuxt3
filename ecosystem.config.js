module.exports = {
  apps: [
    {
      name: 'kun-visual-novel',
      port: 7777,
      cwd: process.cwd(),
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      script: './.output/server/index.mjs'
    }
  ]
}
