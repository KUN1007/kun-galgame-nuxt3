export const useKunCopy = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      useMessage(`${text} copied successfully!`, `${text} 复制成功`, 'success')
    })
    .catch(() => {
      useMessage(
        `${text} copy failed! Please switch to a more modern browser!`,
        `${text} 复制失败! 请更换更现代的浏览器!`,
        'error'
      )
    })
}
