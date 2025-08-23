import rehypeSanitize from 'rehype-sanitize'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypePrism from 'rehype-prism-plus'
import { unified } from 'unified'
import { rehypeImgLazy } from './plugins/lazyImage'
import { rehypeCodeBlockWrapper } from './plugins/codeBlockWrapper'

export const markdownToHtml = async (markdown: string) => {
  const htmlVFile = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkFrontmatter)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSanitize)
    .use(rehypeSlug)
    .use(rehypeImgLazy)
    .use(rehypePrism, {
      showLineNumbers: true,
      ignoreMissing: true
    })
    .use(rehypeCodeBlockWrapper)
    .use(rehypeStringify)
    .process(markdown)

  let htmlContent = htmlVFile.toString()

  const videoLinkRegex = /kv:<a href="(https?:\/\/[^\s]+?\.(mp4))">[^<]+<\/a>/g
  htmlContent = htmlContent.replace(videoLinkRegex, (match, videoUrl) => {
    return `<video controls loop playsinline width="100%" src="${videoUrl}"></video>`
  })

  return htmlContent
}
