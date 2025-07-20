import { exec } from 'child_process'

const buildSitemap = () => {
  exec('esno pnpm prisma:push')
  exec('esno ./migrateData.ts')
  exec('esno ./fetchVNDBInfo.ts')
  exec('esno ./applyVndbData.ts')
  exec('esno ./restoreWebsiteData.ts')
}

buildSitemap()
