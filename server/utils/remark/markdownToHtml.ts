import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypePrism from 'rehype-prism-plus'
import { unified } from 'unified'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { rehypeKunLazyImage } from './plugins/rehypeKunLazyImage'
import { rehypeKunCodeBlockWrapper } from './plugins/rehypeKunCodeBlockWrapper'
import { rehypeKunH1ToH2 } from './plugins/rehypeKunH1ToH2'
import { rehypeKunTableWrapper } from './plugins/rehypeKunTableWrapper'
import { rehypeKunInsertZeroWidthSpace } from './plugins/rehypeKunInsertZeroWidthSpace'
// import { rehypeKunSpoiler } from './plugins/rehypeKunSpoiler'
// import { rehypeKunVideo } from './plugins/rehypeKunVideo'

export const markdownToHtml = async (markdown: string) => {
  const htmlVFile = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkFrontmatter)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSanitize, {
      ...defaultSchema,
      attributes: {
        ...defaultSchema.attributes,
        // The `language-*` regex is allowed by default.
        code: [['className', /^language-./, 'math-inline', 'math-display']]
      }
    })
    .use(rehypeKunH1ToH2)
    .use(rehypeSlug)
    .use(rehypeKunLazyImage)
    .use(rehypeKatex)
    .use(rehypePrism, {
      showLineNumbers: true,
      ignoreMissing: true
    })
    // will damage rehypeKatex
    .use(rehypeKunCodeBlockWrapper)
    .use(rehypeKunTableWrapper)
    .use(rehypeKunInsertZeroWidthSpace)
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
