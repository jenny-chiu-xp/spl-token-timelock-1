<template>
  <div class="content-padding">
    <div class="text-light-9a text-size-14 card-bg">
      <div class="text-white-f4 font-bold text-size-32">
        {{ detail.investName }}
      </div>
      <div
        class="w-full flex justify-between text-size-24 font-bold mt-space-64">
        <div class="expand flex flex-row">
          <div>{{ $t('invest.start') }}:</div>
          <div class="text-white-f4">{{ YMDHM(detail.start) }}</div>
        </div>
        <div class="expand flex flex-row">
          <div>{{ $t('invest.end') }}:</div>
          <div class="text-white-f4">{{ YMDHM(detail.end) }}</div>
        </div>
      </div>
      <div class="my-space-32 sep-line"></div>
      <div class="flex flex-row">
        <div class="label">{{ $t('invest.orderId') }}</div>
        <div>{{ detail.tx }}</div>
      </div>
      <div class="flex flex-row mt-space-20">
        <div class="label">{{ $t('invest.investor.address') }}</div>
        <div>{{ detail.investAddress }}</div>
      </div>
      <div class="flex flex-row mt-space-20">
        <div class="label">{{ $t('invest.total.amount') }}</div>
        <div>{{ detail.total }}{{ detail.tokenName }}</div>
      </div>
      <div class="flex flex-row mt-space-20">
        <div class="label">{{ $t('invest.cliff.unlock') }}</div>
        <div>123123</div>
      </div>
      <div class="flex flex-row mt-space-20">
        <div class="label">{{ $t('invest.tge.unlock') }}</div>
        <div class="text-green">{{ detail.total }}{{ detail.tokenName }}</div>
      </div>
      <div class="flex flex-row mt-space-20">
        <div class="label">{{ $t('invest.unlock.rate') }}</div>
        <div>{{ detail.tge }}{{ detail.tokenName }}</div>
      </div>
      <div class="flex flex-row mt-space-20">
        <div class="label">{{ $t('invest.unfreeze.next') }}</div>
        <div>{{ detail.tge }}{{ detail.tokenName }}</div>
      </div>
      <div class="flex flex-row mt-space-20">
        <div class="label">{{ $t('invest.withdraw.amount') }}</div>
        <div>{{ detail.tge }}{{ detail.tokenName }}</div>
      </div>
      <div class="flex flex-row mt-space-20">
        <div class="label">{{ $t('invest.withdraw.enable') }}</div>
        <div>{{ detail.withdrawnAmount }}{{ detail.tokenName }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getOrderDetail } from '@/api'
import { useDayjs } from '@/composable/tools'

const route = useRoute()

const id = ref('')
id.value = route.params.id

const detail = reactive({})
const loadDetail = async () => {
  const res = await getOrderDetail(id.value)
  Object.assign(detail, res)
}

watch(
  id,
  (v) => {
    loadDetail()
  },
  { immediate: true }
)

const { YMDHM } = useDayjs()
</script>
<style lang="scss" scoped>
@import 'manager.scss';
.label {
  width: 20%;
}
</style>
