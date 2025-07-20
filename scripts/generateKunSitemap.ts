import { writeFile } from 'fs/promises'
import { glob } from 'tinyglobby'
import prettier from 'prettier'
import { getKunDynamicRoutes } from './dynamic-routes/getKunDynamicRoutes'
import { getKunDynamicBlog } from './dynamic-routes/getKunDynamicBlog'
import { kunCategoryAvailableItem } from '../constants/category'
import { KUN_TOPIC_SECTION_DESCRIPTION_MAP } from '../constants/section'

const WEBSITE_URL = process.env.KUN_GALGAME_URL

const generateKunSitemap = async () => {
  try {
    const pages = await glob([
      'pages/**/*.vue',
      '!pages/category.vue',
      '!pages/message.vue',
      '!pages/ranking.vue',
      '!pages/update.vue',
      '!pages/user.vue',
      '!pages/doc/*.vue',
      '!pages/user/**/*.vue',
      '!pages/edit/**/*.vue',
      '!pages/message/**/*.vue',
      '!pages/category/*.vue',
      '!pages/galgame/[gid]/*.vue',
      '!pages/section/*.vue',
      '!pages/topic/[id]/*.vue',
      '!pages/galgame-engine/[id].vue',
      '!pages/galgame-official/[id].vue',
      '!pages/galgame-series/[id].vue',
      '!pages/galgame-tag/[id].vue',
      '!pages/website/[domain].vue',
      '!pages/website-category/[name].vue',
      '!pages/website-tag/[name].vue'
    ])

    const categoryRoutes = kunCategoryAvailableItem.map((category) => ({
      path: `/category/${category.value}`,
      lastmod: new Date().toISOString()
    }))

    const sectionRoutes = Object.keys(KUN_TOPIC_SECTION_DESCRIPTION_MAP).map(
      (section) => ({
        path: `/section/${section}`,
        lastmod: new Date().toISOString()
      })
    )

    const dynamicPatches = await getKunDynamicRoutes()
    const dynamicBlogs = getKunDynamicBlog()

    const sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .concat(['pages/doc/index.vue'])
          .map((page) => {
            const path = page
              .replace('pages', '')
              .replace('/index.vue', '')
              .replace('.vue', '')
            const route = path === '/index' ? '' : path

            return `
              <url>
                <loc>${WEBSITE_URL}${route}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>daily</changefreq>
                <priority>0.7</priority>
              </url>
            `
          })
          .join('')}
        ${dynamicPatches
          .map(
            (patch) => `
              <url>
                <loc>${WEBSITE_URL}${patch.path}</loc>
                <lastmod>${patch.lastmod}</lastmod>
                <changefreq>daily</changefreq>
                <priority>0.8</priority>
              </url>
            `
          )
          .join('')}
          ${dynamicBlogs
            .concat(categoryRoutes)
            .concat(sectionRoutes)
            .map(
              (patch) => `
                <url>
                  <loc>${WEBSITE_URL}${patch.path}</loc>
                  <lastmod>${patch.lastmod}</lastmod>
                  <changefreq>weekly</changefreq>
                  <priority>0.9</priority>
                </url>
              `
            )
            .join('')}
      </urlset>
    `

    const formatted = await prettier.format(sitemap, {
      parser: 'html'
    })

    await writeFile('public/sitemap.xml', formatted)
    console.log('✅ Sitemap generated successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error generating sitemap:', error)
    process.exit(1)
  }
}

generateKunSitemap()
