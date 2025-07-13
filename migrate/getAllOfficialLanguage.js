import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getAllOfficialLanguage = async () => {
  const data = await prisma.galgame_official.findMany({
    select: { lang: true }
  })
  const langArr = data.map((l) => l.lang)
  console.log([...new Set(langArr)])
}

getAllOfficialLanguage()
