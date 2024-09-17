export const markdownToText = (markdown: string) => {
  return markdown
    .replace(/(\*\*|__)(.*?)\1/gs, '$2')
    .replace(/(\*|_)(.*?)\1/gs, '$2')
    .replace(/#+\s*(.*?)\n/g, '$1\n')
    .replace(/!\[(.*?)\]\((.*?)\)/gm, '$1')
    .replace(/(```\w+)([\s\S]*?)(```)/g, '$2')
    .replace(/`(.*?)`/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/!\[.*$/g, '')
}
