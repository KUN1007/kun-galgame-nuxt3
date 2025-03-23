export const useKunCopy = (originText: string) => {
  const text = decodeIfEncoded(originText)

  navigator.clipboard
    .writeText(text)
    .then(() => {
      useMessage(`${text} 复制成功`, 'success')
    })
    .catch(() => {
      useMessage(`${text} 复制失败! 请更换更现代的浏览器!`, 'error')
    })
}
