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
        <div class="flex">
          <div class="text-green mr-space-14">{{ $t('invest.start') }}:</div>
          <div class="flex flex-col text-white-f4">
            <div>{{ YMD(detail.startAt) }}</div>
            <div class="font-bold">{{ HM(detail.startAt) }}</div>
          </div>
        </div>
        <div class="flex">
          <div class="text-green mr-space-14">{{ $t('invest.end') }}:</div>
          <div class="flex flex-col text-white-f4">
            <div>{{ YMD(detail.endAt) }}</div>
            <div class="font-bold">{{ HM(detail.endAt) }}</div>
          </div>
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
        <div>
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

      <div
        class="mt-space-40 px-space-64 btn-common"
        :class="enableWithdraw <= 0 ? 'disable' : ''"
        @click="clickWithdrawn">
        {{ $t('invest.withdraw') }}
      </div>
    </div>
  </div>

  <confirm-dialog v-model:show="showConfirm" @sureClicked="onSureConfirm">
    <template #title>{{ $t('invest.confirm.withdraw') }}</template>
    <template #hint>{{ $t('invest.withdraw.hint') }}</template>
    <template #sure>{{ $t('invest.withdraw') }}</template>
  </confirm-dialog>

  <success-dialog v-model:show="showSuccess">{{
    $t('invest.withdraw.success')
  }}</success-dialog>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useWallet } from 'solana-wallets-vue'
import { ElMessage } from 'element-plus'
import { CopyDocument } from '@element-plus/icons-vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import SuccessDialog from '@/components/SuccessDialog.vue'
import ProgressLine from '@/components/ProgressLine.vue'
import { getOrderList, orderWithdrawn } from '@/api'
import { useDayjs } from '@/composable/tools'
import { useTools } from '@/composable/tools'
import { throttle } from '@/utils'
import { useProgram } from '@/composable/anchorProgram'
import { useOrder } from '@/composable/order'

const { copy, t, elLoading, toFixed } = useTools()
const { withdrawToken, getBalance } = useProgram()

const router = useRouter()
const { publicKey } = useWallet()
const { YMD, YMDHM, HM } = useDayjs()

const showConfirm = ref(false)
const showSuccess = ref(false)

const walletAddress = computed(() => publicKey.value.toBase58())

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
  const loading = elLoading(t('loading'))
  let res = {}
  try {
    res = await getOrderList({
      pageSize: 1,
      investAddress: walletAddress.value,
      status: 1
    })
  } catch (err) {
    console.error('get order list error: ' + err)
    const message = err.message || t('invest.load.fail')
    ElMessage.error(message)
  } finally {
    loading.close()
  }
  const list = res.list || []
  if (list.length > 0) {
    detail.value = list[0]
  } else {
    ElMessage.error(t('invest.no.order'))
    router.replace({ path: '/home' })
  }
}

const checkParams = () => {
  if (enableWithdraw.value <= 0) {
    ElMessage.error(t('invest.no.withdraw'))
    return false
  }
  return true
}

const clickWithdrawn = () => {
  if (checkParams()) {
    showConfirm.value = true
  }
}

const onSureConfirm = throttle(() => {
  withdrawAndRecord()
})

const withdrawAndRecord = async () => {
  const balance = await getBalance()
  if (balance <= 0) {
    ElMessage.error(t('invest.balance.hint'))
    return
  }
  const loading = elLoading(t('invest.withdrawing'))
  try {
    const result = await withdrawToken(detail.value, enableWithdraw.value)
    await orderWithdrawn({
      ...result,
      id: detail.value.id,
      currentWithdraw: enableWithdraw.value,
      walletAddress: walletAddress.value
    })
    showSuccess.value = true
    await loadDetail()
  } catch (err) {
    console.error('order success', err)
    const message = err.message || t('invest.confirm.fail')
    ElMessage.error(message)
  } finally {
    loading.close()
  }
}

onMounted(loadDetail)
</script>
<style lang="scss" scoped>
@import 'manager.scss';

.disable {
  background: var(--light-9a);
}
</style>
