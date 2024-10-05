import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypePrism from 'rehype-prism-plus'
import { unified } from 'unified'

export const markdownToHtml = async (markdown: string) => {
  const htmlVFile = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .use(rehypePrism)
    .use(rehypeStringify)
    .process(markdown)

  let htmlContent = htmlVFile.toString()

  const videoLinkRegex = /kv:<a href="(https?:\/\/[^\s]+?\.(mp4))">[^<]+<\/a>/g
  htmlContent = htmlContent.replace(videoLinkRegex, (match, videoUrl) => {
    return `<video controls loop playsinline width="100%" src="${videoUrl}"></video>`
  })

  return htmlContent
}
