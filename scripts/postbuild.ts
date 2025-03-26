import { exec } from 'child_process'

const buildSitemap = () => {
  exec('pnpm build:sitemap', async (error, stdout, stderr) => {
    if (error) {
      console.error('Error generating sitemap:', error)
      process.exit(1)
    }
    if (stdout) console.log(stdout)
    if (stderr) console.error(stderr)
  })
}

buildSitemap()
