import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import useClipboard from 'vue-clipboard3'

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

export const useTools = () => {
    const { t } = useI18n()
    const { toClipboard } = useClipboard()

    const copy = async (text) => {
        await toClipboard(text)
        ElMessage({
            message: t('copy.success'),
            type: 'success'
        })
    }

    return {
        t,
        copy
    }
}