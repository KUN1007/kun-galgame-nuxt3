import dayjs from 'dayjs'
import 'dayjs/locale/en'

dayjs.locale('en')

export const formatTimeI18n = (time: number) => {
  const formattedENDate = dayjs(time).format('MMMM D, YYYY - HH:mm:ss')
  const formattedCNDate = dayjs(time).format('YYYY年MM月DD日-HH:mm:ss')
  return { formattedENDate, formattedCNDate }
}
