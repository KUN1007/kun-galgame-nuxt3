export const markdownToText = (markdown: string) => {
  return markdown
    .replace(/(\*\*|__)(.*?)\1/gs, '$2')
    .replace(/(\*|_)(.*?)\1/gs, '$2')
    .replace(/#+\s*(.*?)\n/g, '$1\n')
    .replace(/!?\[(.*?)\]\(.*?\)/gs, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/```[\s\S]+?```/gs, '')
    .replace(/[<>~\\]/g, '')
}
