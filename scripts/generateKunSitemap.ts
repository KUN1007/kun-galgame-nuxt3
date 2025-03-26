import { writeFile } from 'fs/promises'
import { globby } from 'globby'
import prettier from 'prettier'
import { getKunDynamicRoutes } from './dynamic-routes/getKunDynamicRoutes'
import { getKunDynamicBlog } from './dynamic-routes/getKunDynamicBlog'

const WEBSITE_URL = process.env.NEXT_PUBLIC_KUN_PATCH_ADDRESS_PROD

const generateKunSitemap = async () => {
  try {
    const pages = await globby([
      'app/**/*.tsx',
      '!app/**/_*.tsx',
      '!app/**/layout.tsx',
      '!app/**/providers.tsx',
      '!app/**/loading.tsx',
      '!app/**/error.tsx',
      '!app/**/*.test.tsx',
      '!app/**/components/**',
      '!app/**/patch/**',
      '!app/**/admin/**',
      '!app/**/edit/**',
      '!app/**/message/**',
      '!app/**/user/**',
      '!app/**/about/**',
      '!app/**/company/**',
      '!app/**/tag/**'
    ])

    const dynamicPatches = await getKunDynamicRoutes()
    const dynamicBlogs = getKunDynamicBlog()

    const sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .concat(['app/about/page.tsx'])
          .map((page) => {
            const path = page
              .replace('app', '')
              .replace('/page.tsx', '')
              .replace('.tsx', '')
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
  } catch (error) {
    console.error('Error generating sitemap:', error)
    process.exit(1)
  }
}

generateKunSitemap()
