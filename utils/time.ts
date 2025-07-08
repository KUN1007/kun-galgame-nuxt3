import { differenceInSeconds, differenceInHours, format } from 'date-fns'

export const formatTimeDifference = (pastTime: number | Date | string) => {
  const now = new Date()
  const past = new Date(pastTime)
  const diffInSeconds = differenceInSeconds(now, past)

  if (diffInSeconds < 10) {
    return '数秒前'
  }

  if (diffInSeconds < 60) {
    return `${diffInSeconds} 秒前`
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} 分钟前`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} 小时前`
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} 天前`
  } else if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000)
    return `${months} 个月前`
  } else {
    const years = Math.floor(diffInSeconds / 31536000)
    return `${years} 年前`
  }
}

export const hourDiff = (upvoteTime: number | Date | string, hours: number) => {
  if (upvoteTime === 0 || upvoteTime === undefined) {
    return false
  }

  const currentTime = new Date()
  const time = new Date(upvoteTime)

  return differenceInHours(currentTime, time) <= hours
}

export const formatDate = (
  time: Date | string | number,
  config?: { isShowYear?: boolean; isPrecise?: boolean }
): string => {
  let formatString = 'MM-dd'

  if (config?.isShowYear) {
    formatString = 'yyyy-MM-dd'
  }

  if (config?.isPrecise) {
    formatString = `${formatString} - HH:mm`
  }

  return format(new Date(time), formatString)
}
