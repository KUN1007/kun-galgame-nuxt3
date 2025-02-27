import dayjs from 'dayjs'

export const hourDiff = (upvoteTime: number, hours: number) => {
  if (upvoteTime === 0 || upvoteTime === undefined) {
    return false
  }

  const currentTime = dayjs()

  const time = dayjs(upvoteTime)

  return currentTime.diff(time, 'hour') <= hours
}

export const formatDate = (
  time: Date | number,
  config?: { isShowYear?: boolean; isPrecise?: boolean }
): string => {
  let formatString = 'MM-DD'

  if (config?.isShowYear) {
    formatString = 'YYYY-MM-DD'
  }

  if (config?.isPrecise) {
    formatString = `${formatString} - HH:mm`
  }

  return dayjs(time).format(formatString)
}
