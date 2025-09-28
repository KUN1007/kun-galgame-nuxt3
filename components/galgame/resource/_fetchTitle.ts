export const fetchTitle = async (domain: string) => {
  try {
    const html = await $fetch<string>(`https://www.${domain}`, {
      timeout: 5000,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
      }
    })

    const match = html.match(/<title>(.*?)<\/title>/i)

    if (match && match[1]) {
      const index = match[1].indexOf(' ')
      const result = index === -1 ? match[1] : match[1].substring(0, index)
      return { title: result.trim() }
    } else {
      return { title: null }
    }
  } catch (error: unknown) {
    return { title: null }
  }
}
