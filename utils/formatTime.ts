import dayjs from 'dayjs'

export const formatTimeDifference = (pastTime: number | Date | string) => {
  const now = dayjs()
  const diffInSeconds = now.diff(pastTime, 'second')

  if (now.to(pastTime, true) === 'a few seconds') {
    return '数秒前'
  }

  if (diffInSeconds < 60) {
    return `${diffInSeconds}秒前`
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes}分钟前`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours}小时前`
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days}天前`
  } else if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000)
    return `${months}个月前`
  } else {
    const years = Math.floor(diffInSeconds / 31536000)
    return `${years}年前`
  }
}
