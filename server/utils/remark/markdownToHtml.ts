import rehypeSanitize from 'rehype-sanitize'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypePrism from 'rehype-prism-plus'
import { unified } from 'unified'
import { rehypeKunLazyImage } from './plugins/rehypeKunLazyImage'
import { rehypeKunCodeBlockWrapper } from './plugins/rehypeKunCodeBlockWrapper'
import { rehypeH1ToH2 } from './plugins/rehypeH1ToH2'
import { rehypeKunTableWrapper } from './plugins/rehypeKunTableWrapper'
// import { rehypeKunSpoiler } from './plugins/rehypeKunSpoiler'
// import { rehypeKunVideo } from './plugins/rehypeKunVideo'

export const markdownToHtml = async (markdown: string) => {
  const htmlVFile = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkFrontmatter)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSanitize)
    .use(rehypeH1ToH2)
    .use(rehypeSlug)
    .use(rehypeKunLazyImage)
    .use(rehypePrism, {
      showLineNumbers: true,
      ignoreMissing: true
    })
    .use(rehypeKunCodeBlockWrapper)
    .use(rehypeKunTableWrapper)
    .use(rehypeStringify)
    .process(markdown)

  let htmlContent = htmlVFile.toString()

  const spoilerRegex = /\|\|(.*?)\|\|/gs
  htmlContent = htmlContent.replace(
    spoilerRegex,
    '<span class="kun-spoiler text-transparent kun-spoiler-hidden">$1</span>'
  )

  const videoLinkRegex = /kv:<a href="(https?:\/\/[^\s]+?\.(mp4))">[^<]+<\/a>/g
  htmlContent = htmlContent.replace(videoLinkRegex, (match, videoUrl) => {
    return `<video controls loop playsinline width="100%" src="${videoUrl}"></video>`
  })

  return htmlContent
}
