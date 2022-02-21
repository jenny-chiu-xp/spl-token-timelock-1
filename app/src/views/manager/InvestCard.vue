<template>
  <div class="w-full h-full flex flex-col">
    <div class="flex items-center mt-space-16" @click="$router.back()">
      <el-icon color="white"><arrow-left /></el-icon>
      <text class="text-white text-size-16">{{ $t('back') }}</text>
    </div>
    <div class="content-padding">
      <div class="text-light-9a text-size-14 card-bg">
        <div class="text-white-f4 font-bold text-size-32">
          {{ detail.investName }}
        </div>
        <div
          class="w-full flex justify-between text-size-24 font-bold mt-space-64">
          <div class="expand flex flex-row">
            <div>{{ $t('invest.start') }}:</div>
            <div class="text-white-f4">{{ YMDHM(detail.startAt) }}</div>
          </div>
          <div class="expand flex flex-row">
            <div>{{ $t('invest.end') }}:</div>
            <div class="text-white-f4">{{ YMDHM(detail.endAt) }}</div>
          </div>
        </div>
        <div class="my-space-32 sep-line"></div>
        <div class="flex flex-row">
          <div class="label">{{ $t('invest.orderId') }}:</div>
          <div class="flex items-center" @click="copy(detail.id)">
            <div>{{ detail.id }}</div>
            <el-icon><copy-document /></el-icon>
          </div>
        </div>
        <div class="flex flex-row mt-space-20">
          <div class="label">{{ $t('invest.investor.address') }}:</div>
          <div class="flex items-center" @click="copy(detail.investAddress)">
            <div>{{ detail.investAddress }}</div>
            <el-icon><copy-document /></el-icon>
          </div>
        </div>
        <div class="flex flex-row mt-space-20">
          <div class="label">{{ $t('invest.total.amount') }}:</div>
          <div>{{ toFixed(total) }}{{ tokenName }}</div>
        </div>
        <div class="flex flex-row mt-space-20">
          <div class="label">{{ $t('invest.cliff.unlock') }}:</div>
          <div>
            {{
              $t('invest.rate.unlock', {
                num: `${toFixed(cliffUnlock)}${tokenName}`,
                rate: detail.cliffRate,
              })
            }}
          </div>
        </div>
        <div class="flex flex-row mt-space-20">
          <div class="label">TGE:</div>
          <div class="text-green">
            {{
              $t('invest.rate.unlock', {
                num: `${toFixed(tgeUnlock)}${tokenName}`,
                rate: detail.cliffRate,
              })
            }}
          </div>
        </div>
        <div class="flex flex-row mt-space-20">
          <div class="label">{{ $t('invest.unlock.rate') }}:</div>
          <div>{{ toFixed(unlockRate) }}{{ tokenName }} / {{ unlockUnit }}</div>
        </div>
        <div class="flex flex-row mt-space-20">
          <div class="label">{{ $t('invest.free.amount') }}:</div>
          <div>{{ toFixed(unfreeze) }}{{ tokenName }}</div>
        </div>
        <div class="w-full mt-space-8">
          <progress-line :rate="unfreeze / total"></progress-line>
        </div>

        <div class="flex flex-row mt-space-20">
          <div class="label">{{ $t('invest.unfreeze.next') }}:</div>
          <div>{{ YMDHM(nextUnfreeTime) }}</div>
        </div>
        <div class="flex flex-row mt-space-20">
          <div class="label">{{ $t('invest.withdraw.amount') }}:</div>
          <div>{{ toFixed(withdrawn) }}{{ tokenName }}</div>
        </div>
        <div class="w-full mt-space-8">
          <progress-line :rate="withdrawn / total"></progress-line>
        </div>

        <div class="flex flex-row mt-space-20">
          <div class="label">{{ $t('invest.withdraw.enable') }}:</div>
          <div>{{ toFixed(enableWithdraw) }}{{ tokenName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { ArrowLeft, CopyDocument } from '@element-plus/icons-vue'
import ProgressLine from '@/components/ProgressLine.vue'
import { useRoute } from 'vue-router'
import { getOrderDetail } from '@/api'
import { useDayjs } from '@/composable/tools'
import { useTools } from '@/composable/tools'
import { useOrder } from '@/composable/order'

const { copy, toFixed } = useTools()
const route = useRoute()

const id = ref('')
id.value = route.params.id

const detail = ref({})
const {
  tokenName,
  total,
  withdrawn,
  cliffUnlock,
  tgeUnlock,
  unlockRate,
  unlockUnit,
  unfreeze,
  nextUnfreeTime,
  enableWithdraw
} = useOrder(detail)

const loadDetail = async () => {
  const res = await getOrderDetail(id.value)
  detail.value = res
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
</style>
