<template>
  <div
    class="w-full flex-col box-border p-space-32 bg-grey-28 text-light-9a text-size-14 content">
    <div class="w-full flex justify-between items-center">
      <div class="flex-col expand">
        <div class="font-bold text-size-32 text-white-f4">
          {{ item.investName }}
        </div>
        <div>{{ item.investAddress }}</div>
      </div>
      <div class="flex-col">
        <div>{{ $t('invest.start') }}：{{ YMDHM(item.start) }}</div>
        <div class="mt-space-8">
          {{ $t('invest.end') }}：{{ YMDHM(item.end) }}
        </div>
      </div>
    </div>

    <div
      class="w-full flex justify-between items-center text-light mt-space-40">
      <div class="flex-col">
        <div class="mb-space-8">{{ $t('invest.total') }}</div>
        <div class="font-bold text-white-f4">
          {{ item.total }}{{ tokenName }}
        </div>
      </div>
      <div class="line"></div>
      <div class="flex-col">
        <div class="mb-space-8">{{ $t('invest.free.rate') }}</div>
        <div class="font-bold text-white-f4"> {{ toFixed(unlockRate) }}{{ tokenName }} / {{ unlockUnit }}</div>
      </div>
      <div class="line"></div>
      <div class="flex-col">
        <div class="mb-space-8">{{ $t('invest.free.amount') }}</div>
        <div class="font-bold text-white-f4">{{ toFixed(unfreeze) }}{{ tokenName }}</div>
      </div>
      <div class="line"></div>
      <div class="flex-col">
        <div class="mb-space-8">{{ $t('invest.withdraw.amount') }}</div>
        <div class="font-bold text-white-f4">{{ toFixed(withdrawn) }}{{ tokenName }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { toRefs } from 'vue'
import { useDayjs } from '@/composable/tools'
import { useOrder } from '@/composable/order'

const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  }
})
const { item } = toRefs(props)

const { YMDHM } = useDayjs()

const {
  tokenName,
  toFixed,
  unlockRate,
  unlockUnit,
  unfreeze
} = useOrder(item)
</script>
<style lang="scss" scoped>
.content {
  border-radius: 1.6rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.line {
  width: 1px;
  height: 2rem;
  background: rgba(255, 255, 255, 0.2);
}
</style>
