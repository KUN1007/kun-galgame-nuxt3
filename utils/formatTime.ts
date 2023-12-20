import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const languageOptions = {
  en: {
    second: 'sec',
    seconds: 'secs',
    minute: 'min',
    minutes: 'mins',
    hour: 'hour',
    hours: 'hours',
    day: 'day',
    days: 'days',
    week: 'week',
    weeks: 'weeks',
    month: 'month',
    months: 'months',
    year: 'year',
    years: 'years',
  },
  zh: {
    second: '秒',
    seconds: '秒',
    minute: '分钟',
    minutes: '分钟',
    hour: '小时',
    hours: '小时',
    day: '天',
    days: '天',
    week: '周',
    weeks: '周',
    month: '月',
    months: '月',
    year: '年',
    years: '年',
  },
}

const replaceTimeUnits = (input: string, language: string) => {
  const languageOption =
    (languageOptions as Record<string, any>)[language] || languageOptions.en

  const replacements: Record<string, string> = {
    an: '1', // Replace "an" with "1"
    a: '1', // Replace "a" with "1"
    second: languageOption.second,
    seconds: languageOption.seconds,
    minute: languageOption.minute,
    minutes: languageOption.minutes,
    hour: languageOption.hour,
    hours: languageOption.hours,
    day: languageOption.day,
    days: languageOption.days,
    week: languageOption.week,
    weeks: languageOption.weeks,
    month: languageOption.month,
    months: languageOption.months,
    year: languageOption.year,
    years: languageOption.years,
  }

  const regex = new RegExp(Object.keys(replacements).join('|'), 'g')

  return input.replace(regex, (matched) => replacements[matched])
}

// Format time difference
export const formatTimeDifference = (pastTime: number, language: string) => {
  const now = dayjs()
  const diffInSeconds = now.diff(pastTime, 'second')
  const hint = language === 'en' ? ' ago' : '前'

  // Use the relativeTime plugin of dayjs to format relative time
  const time = () => {
    if (diffInSeconds < 60) {
      return now.to(pastTime, true)
    } else if (diffInSeconds < 3600) {
      return now.to(pastTime, true)
    } else if (diffInSeconds < 86400) {
      return now.to(pastTime, true)
    } else if (diffInSeconds < 2592000) {
      return now.to(pastTime, true)
    } else if (diffInSeconds < 31536000) {
      return now.to(pastTime, true)
    } else {
      return now.to(pastTime, true)
    }
  }

  if (time() === 'a few seconds') {
    return language === 'en' ? 'a few secs ago' : '几秒前'
  }

  const cnTime = replaceTimeUnits(time(), language).replace(/s\b/g, '') + hint

  const enTime = replaceTimeUnits(time(), language) + hint

  return language === 'en' ? enTime : cnTime
}
