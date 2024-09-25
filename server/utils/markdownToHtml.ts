import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypePrism from 'rehype-prism'
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
  return htmlVFile.toString()
}
