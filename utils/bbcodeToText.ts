export const bbcodeToText = (bbcode: string | undefined) => {
  return bbcode
    ?.replace(/[cdprsuvo]\d+(\.\d+)?/g, '')
    .replace(/\b(?:https?|ftp):\/\/\S+/gi, '')
    .replace(/\[(\/?)(b|i|u|s|spoiler|quote|url|raw|code)\]/gi, '')
}
