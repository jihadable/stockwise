import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/id'

dayjs.extend(relativeTime)
dayjs.locale('id')

export function DateParser(dateString: string | undefined): string {
  return dayjs(dateString).fromNow()
}