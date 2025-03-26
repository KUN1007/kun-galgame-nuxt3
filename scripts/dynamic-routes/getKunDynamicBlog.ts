import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const POSTS_PATH = path.join(process.cwd(), 'content', 'doc')

interface KunDynamicBlogSitemap {
  path: string
  lastmod: string
}

export const getKunDynamicBlog = (): KunDynamicBlogSitemap[] => {
  const buildTree = (currentPath: string): KunDynamicBlogSitemap[] => {
    const stats = fs.statSync(currentPath)

    if (stats.isFile() && currentPath.endsWith('.md')) {
      const fileContents = fs.readFileSync(currentPath, 'utf8')
      const { data } = matter(fileContents)

      return [
        {
          path: `/doc/${path
            .relative(POSTS_PATH, currentPath)
            .replace(/\.md$/, '')
            .replace(/\\/g, '/')}`,
          lastmod: data.modifiedTime || new Date().toISOString()
        }
      ]
    }

    if (stats.isDirectory()) {
      return fs
        .readdirSync(currentPath)
        .flatMap((child) => buildTree(path.join(currentPath, child)))
    }

    return []
  }

  return buildTree(POSTS_PATH)
}
