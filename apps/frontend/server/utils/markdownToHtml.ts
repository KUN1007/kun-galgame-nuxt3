import rehypeSanitize from 'rehype-sanitize'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypePrism from 'rehype-prism-plus'
import { unified } from 'unified'

import type { Plugin } from 'unified'
import type { Root } from 'hast'
import { visit } from 'unist-util-visit'

const rehypeImgLazy: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img') {
        node.properties = node.properties || {}
        node.properties.loading = 'lazy'
        node.properties.decoding = 'async'
        node.properties['data-kun-lazy-image'] = 'true'
      }
    })
  }
}

export const markdownToHtml = async (markdown: string) => {
  const htmlVFile = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeSanitize)
    .use(rehypeImgLazy)
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(rehypePrism, { ignoreMissing: true })
    .use(rehypeStringify)
    .process(markdown)

  let htmlContent = htmlVFile.toString()

  const videoLinkRegex = /kv:<a href="(https?:\/\/[^\s]+?\.(mp4))">[^<]+<\/a>/g
  htmlContent = htmlContent.replace(videoLinkRegex, (match, videoUrl) => {
    return `<video controls loop playsinline width="100%" src="${videoUrl}"></video>`
  })

  return htmlContent
}
