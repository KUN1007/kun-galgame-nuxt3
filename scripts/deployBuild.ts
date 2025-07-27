import { execSync } from 'child_process'
import { config } from 'dotenv'
import { envSchema } from '../validations/dotenv-check'
import * as fs from 'fs'
import * as path from 'path'

const envPath = path.resolve(__dirname, '..', '.env')
if (!fs.existsSync(envPath)) {
  console.error('.env file not found in the project root.')
  process.exit(1)
}

config({ path: envPath })

try {
  envSchema.safeParse(process.env)

  console.log('Environment variables are valid.')
  console.log('Executing the commands...')

  execSync(
    'git pull && pnpm prisma:push && pnpm build:limit && pnpm stop && pnpm start && pnpm build:sitemap',
    {
      stdio: 'inherit'
    }
  )
} catch (error) {
  console.error('Invalid environment variables', error)
  process.exit(1)
}
