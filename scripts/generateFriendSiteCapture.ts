import { existsSync, mkdirSync } from 'node:fs'
import { join } from 'pathe'
import captureWebsite from 'capture-website'
import { friendArray } from '~/config/friend'

export const generateFriendSiteCapture = async () => {
  const friendsDir = join(process.cwd(), 'public/friends')
  if (!existsSync(friendsDir)) {
    mkdirSync(friendsDir, { recursive: true })
  }

  for (const category of friendArray) {
    for (const friend of category.value) {
      const filename = join(friendsDir, `${friend.banner}.webp`)

      if (existsSync(filename)) {
        console.log(`Screenshot already exists for ${friend.name}, skipping...`)
        continue
      }

      if (friend.status === 'down') {
        console.log(`Site ${friend.name} is marked as down, skipping...`)
        continue
      }

      try {
        console.log(
          `Generating screenshot for ${friend.name} (${category.label}) from ${friend.link}...`
        )
        await captureWebsite.file(friend.link, filename, {
          type: 'webp',
          quality: 80,
          width: 1280,
          height: 720,
          scaleFactor: 1,
          launchOptions: {
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
          },
          timeout: 60,
          overwrite: true
        })
        console.log(`Screenshot generated successfully for ${friend.name}`)
      } catch (error) {
        console.error(
          `Failed to generate screenshot for ${friend.name}:`,
          error
        )
      }
    }
  }
}

generateFriendSiteCapture()
