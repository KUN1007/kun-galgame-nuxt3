import fs from 'fs'
import path from 'path'

import { TAG_MAP } from './lib'
import { fileURLToPath } from 'url'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const API_BASE_URL = 'https://api.vndb.org/kana'
const CHUNK_SIZE = 50
const DELAY_MS = 2000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const OUTPUT_FILE = path.join(__dirname, 'vndb_data.json')

const TAG_CATEGORY_MAP: Record<string, string> = {
  cont: 'content',
  ero: 'sexual',
  tech: 'technical'
}

const PRODUCER_TYPE_MAP: Record<string, string> = {
  co: 'company',
  in: 'individual',
  ng: 'amateur'
}

interface VndbExtLink {
  id: string | number
  url: string
  label: string
  name: string
}

interface VndbProducer {
  id: string
  name: string
  original: string | null
  aliases: string[]
  lang: string
  type: 'co' | 'in' | 'ng'
  description: string | null
  extlinks: VndbExtLink[]
}

interface VndbTag {
  id: string
  name: string
  aliases: string[]
  description: string
  category: 'cont' | 'ero' | 'tech'
}

interface VnResult {
  id: string
  developers: VndbProducer[]
  tags: VndbTag[]
}

interface ReleaseResult {
  vns: { id: string }[]
  engine: string | null
}

interface OutputData {
  engines: Record<string, { name: string }>

  officials: Record<
    string,
    {
      id: string
      name: string
      category: string
      lang: string
      aliases: string[]
      link: string
    }
  >

  tags: Record<
    string,
    {
      id: string
      name: string
      category: string
      aliases: string[]
    }
  >

  galgames: Record<
    string,
    {
      officials: string[]
      engines: string[]
      tags: string[]
      links: { name: string; link: string }[]
    }
  >
}

async function fetchVnData(vndbIds: string[]): Promise<VnResult[]> {
  const response = await fetch(`${API_BASE_URL}/vn`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filters: ['or', ...vndbIds.map((id) => ['id', '=', id])],

      fields:
        'id, developers{id,name,original,aliases,lang,type,extlinks{id,url,label,name}}, tags{id,name,aliases,category}',
      results: vndbIds.length
    })
  })

  if (!response.ok) {
    throw new Error(
      `Failed to fetch VN data: ${response.status} ${await response.text()}`
    )
  }
  const data = await response.json()
  return data.results
}

async function fetchReleaseData(vndbIds: string[]): Promise<ReleaseResult[]> {
  const response = await fetch(`${API_BASE_URL}/release`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filters: ['vn', '=', ['or', ...vndbIds.map((id) => ['id', '=', id])]],
      fields: 'engine, vns{id}',
      results: 100
    })
  })

  if (!response.ok) {
    throw new Error(
      `Failed to fetch Release data: ${response.status} ${await response.text()}`
    )
  }
  const data = await response.json()

  return data.results
}

function processApiData(
  vnResults: VnResult[],
  releaseResults: ReleaseResult[],
  outputData: OutputData
) {
  const vnToEnginesMap = new Map<string, Set<string>>()
  for (const release of releaseResults) {
    if (release.engine) {
      for (const vn of release.vns) {
        if (!vnToEnginesMap.has(vn.id)) {
          vnToEnginesMap.set(vn.id, new Set())
        }
        vnToEnginesMap.get(vn.id)!.add(release.engine)
      }
    }
  }

  for (const vn of vnResults) {
    const vndbId = vn.id

    if (!outputData.galgames[vndbId]) {
      outputData.galgames[vndbId] = {
        officials: [],
        engines: [],
        tags: [],
        links: []
      }
    }

    for (const dev of vn.developers) {
      let officialWebsite = ''
      const otherLinks: { name: string; link: string }[] = []
      if (dev.extlinks) {
        for (const link of dev.extlinks) {
          if (link.label === 'Official website') {
            officialWebsite = link.url
          } else {
            otherLinks.push({ name: link.label, link: link.url })
          }
        }
      }

      outputData.galgames[vndbId].links.push(...otherLinks)

      if (!outputData.officials[dev.id]) {
        if (PRODUCER_TYPE_MAP[dev.type]) {
          outputData.officials[dev.id] = {
            id: dev.id,
            name: dev.original || dev.name,
            category: PRODUCER_TYPE_MAP[dev.type],
            lang: dev.lang,
            aliases: dev.original ? [dev.name, ...dev.aliases] : dev.aliases,
            link: officialWebsite
          }
        }
      } else {
        if (!outputData.officials[dev.id].link && officialWebsite) {
          outputData.officials[dev.id].link = officialWebsite
        }
      }

      if (!outputData.galgames[vndbId].officials.includes(dev.id)) {
        outputData.galgames[vndbId].officials.push(dev.id)
      }
    }

    for (const tag of vn.tags) {
      if (!outputData.tags[tag.id]) {
        if (TAG_CATEGORY_MAP[tag.category]) {
          const mappedValue = TAG_MAP[tag.name] || ''
          const parts = mappedValue.split('/')
          const newName = parts[0]
          const additionalAliases = parts.slice(1)

          outputData.tags[tag.id] = {
            id: tag.id,
            name: newName,
            category: TAG_CATEGORY_MAP[tag.category],
            aliases: [tag.name, ...tag.aliases, ...additionalAliases]
          }
        }
      }

      if (!outputData.galgames[vndbId].tags.includes(tag.id)) {
        outputData.galgames[vndbId].tags.push(tag.id)
      }
    }

    const engines = vnToEnginesMap.get(vndbId) || new Set()
    for (const engineName of engines) {
      if (!outputData.engines[engineName]) {
        outputData.engines[engineName] = { name: engineName }
      }

      if (!outputData.galgames[vndbId].engines.includes(engineName)) {
        outputData.galgames[vndbId].engines.push(engineName)
      }
    }
  }
}

async function main() {
  const data = await prisma.galgame.findMany({
    select: { vndb_id: true }
  })
  const allVndbIds: string[] = data.map((d) => d.vndb_id)

  const outputData: OutputData = {
    engines: {},
    officials: {},
    tags: {},
    galgames: {}
  }

  console.log(`Starting data fetch for ${allVndbIds.length} galgames...`)

  for (let i = 0; i < allVndbIds.length; i += CHUNK_SIZE) {
    const chunk = allVndbIds.slice(i, i + CHUNK_SIZE)
    const chunkNum = i / CHUNK_SIZE + 1
    const totalChunks = Math.ceil(allVndbIds.length / CHUNK_SIZE)

    console.log(
      `\n[${new Date().toISOString()}] Processing chunk ${chunkNum} of ${totalChunks} (${chunk.length} IDs)`
    )

    try {
      const [vnResults, releaseResults] = await Promise.all([
        fetchVnData(chunk),
        fetchReleaseData(chunk)
      ])

      console.log(
        `  -> Fetched ${vnResults.length} VN details and ${releaseResults.length} release details.`
      )

      processApiData(vnResults, releaseResults, outputData)
      console.log(`  -> Processed and aggregated data for this chunk.`)
    } catch (error) {
      console.error(`  -> ERROR processing chunk ${chunkNum}:`, error)
    }

    if (i + CHUNK_SIZE < allVndbIds.length) {
      console.log(
        `  -> Waiting for ${DELAY_MS / 1000} seconds before next chunk...`
      )
      await new Promise((resolve) => setTimeout(resolve, DELAY_MS))
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(outputData, null, 2))
  console.log(
    `\n✅ Success! All data has been fetched and saved to ${OUTPUT_FILE}`
  )
}

main().catch((error) => {
  console.error('An unexpected error occurred:', error)
  process.exit(1)
})
