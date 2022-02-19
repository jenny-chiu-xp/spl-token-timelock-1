import { computed } from 'vue'
import { PERIOD_UNITS } from '@/store/dict'
import { useI18n } from 'vue-i18n'

export const useOrder = (order) => {
    const { t } = useI18n()

    const toFixed = (num) => {
        return parseFloat(num).toFixed(4)
    }

    const total = computed(() => order.total)
    const tokenName = computed(() => order.tokenName)
    const withdrawn = computed(() => order.withdrawnAmount)
    const cliffUnlock = computed(() => {
        const { cliffRate } = order
        return cliffRate > 0 ? total.value * (100 / cliffRate) : 0
    })
    const tgeUnlock = computed(() => {
        const { tgeRate } = order
        return tgeRate > 0 ? total.value * (100 / tgeRate) : 0
    })
    const unlockRate = computed(() => {
        const { cliffAt, startAt, endAt, period, cliffRate, tgeRate, total } = order
        const duration = endAt - (cliffAt || startAt)
        const periodNum = Math.ceil(duration / (period || 1))
        const periodTotal = total * (100 - cliffRate - tgeRate) / 100
        return periodTotal / (periodNum || 1)
    })
    const unlockUnit = computed(() => {
        const { periodNum, periodUnit } = order
        const unit = PERIOD_UNITS.find(it => it.value === periodUnit) || { label: t('day') }
        return `${periodNum} ${unit.label}`
    })
    const unfreeze = computed(() => {
        const { cliffAt, startAt, endAt, period, cliffRate, tgeRate, total } = order
        const now = Date.now()
        if (now >= endAt) {
            return total
        }
        if (now <= startAt) {
            return 0
        }
        if (now <= cliffAt) {
            return total * (tgeRate / 100)
        }
        const duration = now - (cliffAt || startAt)
        const periodNum = Math.floor(duration / (period || 1))
        const periodTotal = total * (100 - cliffRate - tgeRate) / 100
        return periodTotal / (periodNum || 1)
    })
    const nextUnfreeTime = computed(() => {
        const { cliffAt, startAt, endAt, period } = order
        const now = Date.now()
        if (now >= endAt) {
            return endAt
        }
        if (now <= startAt) {
            return cliffAt || (startAt + period)
        }
        if (now <= cliffAt) {
            return cliffAt
        }
        const duration = now - (cliffAt || startAt)
        const periodNum = Math.ceil(duration / (period || 1))
        return (cliffAt || startAt) + period * periodNum
    })
    const enableWithdraw = computed(() => {
        return unfreeze.value - withdrawn.value
    })

    return {
        toFixed,
        total,
        tokenName,
        withdrawn,
        cliffUnlock,
        tgeUnlock,
        unlockRate,
        unlockUnit,
        unfreeze,
        nextUnfreeTime,
        enableWithdraw
    }

}