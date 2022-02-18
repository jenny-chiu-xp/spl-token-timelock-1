<template>
  <div class="content-padding">
    <div class="font-bold text-size-32 text-green">
      {{ $t('invest.your.yield') }}
    </div>
    <div class="mt-space-32 text-light-9a text-size-14 card-bg">
      <div class="font-bold text-size-32 text-white-f4">
        {{ detail.investName }}
      </div>
      <div class="w-full flex justify-between mt-space-64">
        <div class="flex-row">
          <div class="text-green mr-space-14">{{ $t('invest.start') }}</div>
          <div class="flex flex-col text-white-f4">
            <div>{{ YMD(detail.start) }}</div>
            <div class="font-bold">{{ HM(detail.start) }}</div>
          </div>
        </div>
        <div class="flex-row">
          <div class="text-green mr-space-14">{{ $t('invest.end') }}</div>
          <div class="flex flex-col text-white-f4">
            <div>{{ YMD(detail.end) }}</div>
            <div class="font-bold">{{ HM(detail.end) }}</div>
          </div>
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
        <div>{{ detail.total }}{{ detail.tokenName }}</div>
      </div>
      <div class="flex flex-row mt-space-20">
        <div class="label">{{ $t('invest.tge.unlock') }}</div>
        <div>{{ detail.tge }}{{ detail.tokenName }}</div>
      </div>
      <div class="flex flex-row mt-space-20">
        <div class="label">{{ $t('invest.unlock.rate') }}</div>
        <div>{{ detail.tge }}{{ detail.tokenName }}</div>
      </div>
      <div class="flex flex-row mt-space-20">
        <div class="label">{{ $t('invest.unfreeze.next') }}</div>
        <div>{{ detail.tge }}{{ detail.tokenName }}</div>
      </div>
      <div class="flex-row mt-space-20">
        <div class="label">{{ $t('invest.withdraw.amount') }}</div>
        <div>{{ detail.withdrawnAmount }}{{ detail.tokenName }}</div>
      </div>
      <div class="flex-row mt-space-20">
        <div class="label">{{ $t('invest.withdraw.enable') }}</div>
        <div>{{ detail.withdrawnAmount }}{{ detail.tokenName }}</div>
      </div>

      <div class="btn-common mt-space-40">{{ $t('invest.withdraw') }}</div>
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

const { YMD, HM } = useDayjs()
</script>
<style lang="scss" scoped>
@import 'manager.scss';
</style>
