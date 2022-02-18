import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export const useDayjs = () => {
    const format = (milliseconds, pattern = 'YYYY-MM-DD HH:mm:ss') => {
        return dayjs(milliseconds).format(pattern)
    }
    const YMDHM = (milliseconds) => {
        return dayjs(milliseconds).format('YYYY-MM-DD HH:mm')
    }
    const YMD = (milliseconds) => {
        return dayjs(milliseconds).format('YYYY-MM-DD')
    }
    const HM = (milliseconds) => {
        return dayjs(milliseconds).format('HH:mm')
    }
    return {
        format,
        YMDHM,
        YMD,
        HM
    }
}