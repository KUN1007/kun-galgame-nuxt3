import dayjs from 'dayjs'
import 'dayjs/locale/en'

dayjs.locale('en')

export const formatTimeI18n = (time: number) => {
  const formattedENDate = dayjs(time).format('MMMM D, YYYY - h:mm:ss A')
  const formattedCNDate = dayjs(time).format('YYYY年MM月DD日-HH:mm:ss 发布')
  return { formattedENDate, formattedCNDate }
}
