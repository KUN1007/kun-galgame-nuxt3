export const scrollIntoComment = (id: number | null) => {
  if (id === null) {
    return
  }

  const targetComment = document.getElementById(`comment-${id}`)
  if (targetComment) {
    targetComment.scrollIntoView({ behavior: 'smooth', block: 'center' })
    targetComment.classList.add('bg-default-500/20')
    setTimeout(() => {
      targetComment.classList.remove('bg-default-500/20')
    }, 2000)
  }
}
