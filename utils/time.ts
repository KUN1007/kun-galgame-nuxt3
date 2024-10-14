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
  locale: string,
  config?: { isShowYear?: boolean; isPrecise?: boolean }
): string => {
  let formatString = locale === 'en-us' ? 'DD-MM' : 'MM-DD'

  if (config?.isShowYear) {
    formatString = locale === 'en-us' ? 'DD-MM-YYYY' : 'YYYY-MM-DD'
  }

  if (config?.isPrecise) {
    formatString = `${formatString} - HH:mm`
  }

  return dayjs(time).format(formatString)
}
