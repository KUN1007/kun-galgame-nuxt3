export const decodeIfEncoded = (text: string) => {
  try {
    const decoded = decodeURIComponent(text)
    return decoded !== text ? decoded : text
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return text
  }
}
