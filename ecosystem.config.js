module.exports = {
  apps: [
    {
      name: 'kun-visual-novel',
      port: 7777,
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
    },
  ],
}
