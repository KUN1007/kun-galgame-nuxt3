import { execSync } from 'child_process'

const runCommand = (command: string) => {
  try {
    console.log(`Running command: ${command}`)
    execSync(command, { stdio: 'inherit' })
  } catch (error) {
    console.error(`Error running command: ${command}`, error)
    process.exit(1)
  }
}

runCommand('pnpm install')

runCommand('pnpx prisma:push')
