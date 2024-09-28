import { parseGithubUrl } from './parseGitHubUrl'

const GITHUB_URL = 'https://github.com'
const GITHUB_CONTENT_URL = 'https://raw.githubusercontent.com'

export interface FetchConfig {
  username: string
  repository: string
  branch?: string
  filename?: string
}

const replaceImageUrls = (markdown: string) => {
  const baseUrl = 'https://github.com/your-username/your-repo/raw/main'
  return markdown.replace(/!\[\]\((\/[^)]+)\)/g, (match, p1) => {
    return `![Image](${baseUrl}${p1})`
  })
}

export const fetchGitHubMarkdown = async (url: string) => {
  if (!url.endsWith('.md')) {
    useMessage(10252, 'error')
    return
  }

  const config = parseGithubUrl(url)
  if (!config) {
    useMessage(10251, 'error')
    return
  }

  console.log(config)

  const fullUrl = `${GITHUB_CONTENT_URL}/${config.repository}/${config.blob}`

  const data: string = await $fetch(fullUrl, { method: 'GET' })

  const completedImageUrlMarkdown = data.replace(
    /!\[\]\((?!https?:\/\/)([^/]*\/)*(.*?)(\?.*?)?\)/g,
    (match, p1) => {
      return `![](${GITHUB_URL}/${config.repository}${p1})`
    }
  )

  return { config, completedImageUrlMarkdown }
}
