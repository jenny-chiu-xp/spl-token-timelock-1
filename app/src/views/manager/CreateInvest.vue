<template>
  <div class="w-full h-full flex flex-col">
    <div class="flex items-center mt-space-16" @click="$router.back()">
      <el-icon color="white"><arrow-left /></el-icon>
      <text class="text-white text-size-16">{{ $t('back') }}</text>
    </div>
    <div class="content-padding">
      <div class="text-light-9a text-size-12 card-bg">
        <text class="text-white text-size-32 font-bold">{{
          $t('invest.create')
        }}</text>
        <text class="mt-space-24">{{ publicKey.toBase58() }}</text>

        <div class="w-full flex flex-row justify-between mt-space-32">
          <div class="flex-grow flex flex-col mr-space-32">
            <text>{{ $t('invest.num') }}</text>
            <el-input-number
              v-model="inputAmount"
              class="w-full mt-space-8"
              size="large"
              style="width: 100%"
              :controls="false"
              :min="1"></el-input-number>
          </div>
          <div class="flex-grow flex flex-col">
            <text>{{ $t('invest.token') }}</text>
            <text class="text-green mt-space-16">{{ tokenName }} : {{ tokenAddress }}</text>
          </div>
        </div>

        <div class="w-full flex flex-col mt-space-32">
          <text>{{ $t('invest.investor') }}</text>
          <el-input
            v-model="inputInvestor"
            class="w-full mt-space-8"
            size="large"
            :placeholder="$t('invest.input.investor')"></el-input>
        </div>

        <div class="w-full flex flex-col mt-space-32">
          <text>{{ $t('invest.account') }}</text>
          <el-input
            v-model="inputAccount"
            class="w-full mt-space-8"
            size="large"
            :placeholder="$t('invest.input.account')"></el-input>
        </div>

        <div class="w-full flex flex-row justify-between mt-space-32">
          <div class="flex-grow flex flex-col mr-space-32">
            <text class="mb-space-8">{{ $t('invest.start.date') }}</text>
            <el-date-picker
              v-model="startDate"
              type="date"
              style="width: 100%"
              :placeholder="$t('invest.input.start.date')"
              :disabled-date="disableStart"></el-date-picker>
          </div>
          <div class="flex-grow flex flex-col">
            <text class="mb-space-8">{{ $t('invest.start.time') }}</text>
            <el-time-picker
              v-model="startTime"
              style="width: 100%"
              :placeholder="$t('invest.input.start.time')"></el-time-picker>
          </div>
        </div>

        <div class="w-full flex flex-row justify-between mt-space-32">
          <div class="flex-grow flex flex-col mr-space-32">
            <text class="mb-space-8">{{ $t('invest.end.date') }}</text>
            <el-date-picker
              v-model="endDate"
              type="date"
              style="width: 100%"
              :placeholder="$t('invest.input.end.date')"
              :disabled-date="disableEnd"></el-date-picker>
          </div>
          <div class="flex-grow flex flex-col">
            <text class="mb-space-8">{{ $t('invest.end.time') }}</text>
            <el-time-picker
              v-model="endTime"
              style="width: 100%"
              :placeholder="$t('invest.input.end.time')"></el-time-picker>
          </div>
        </div>

        <div class="w-full flex flex-col mt-space-32">
          <text class="mb-space-8">{{ $t('invest.period') }}</text>
          <div class="w-full flex">
            <div class="flex-grow">
              <el-input-number
                v-model="inputPeriod"
                class="flex-grow"
                size="large"
                style="width: 100%"
                :controls="false"
                :min="1"></el-input-number>
            </div>
            <div class="flex-grow ml-space-32">
              <el-select v-model="periodUnit">
                <el-option
                  v-for="(item, index) in PERIOD_UNITS"
                  :key="index"
                  :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </div>
          </div>
        </div>

        <div class="flex items-center mt-space-32">
          <text class="mr-space-8">{{ $t('invest.advanced') }}</text>
          <el-switch v-model="openAdvanced" active-color="#61e290" />
        </div>

        <div v-if="openAdvanced" class="w-full flex flex-col">
          <div class="w-full flex mt-space-32">
            <div class="flex-grow flex flex-col">
              <text class="mb-space-8">{{ $t('invest.cliff.date') }}</text>
              <el-date-picker
                v-model="cliffDate"
                type="date"
                style="width: 100%"
                :placeholder="$t('invest.input.cliff.date')"
                :disabled-date="disableCliff"></el-date-picker>
            </div>
            <div class="flex-grow flex flex-col mx-space-32">
              <text class="mb-space-8">{{ $t('invest.cliff.time') }}</text>
              <el-time-picker
                v-model="cliffTime"
                style="width: 100%"
                :placeholder="$t('invest.input.cliff.time')"></el-time-picker>
            </div>
            <div class="flex-grow flex flex-col">
              <text class="mb-space-8">{{ $t('invest.cliff.percent') }}</text>
              <div class="w-full flex items-center">
                <el-input-number
                  v-model="inputCliffPercent"
                  style="width: 100%"
                  :controls="false"
                  :min="0"
                  :max="100"
                  size="large"></el-input-number>
                <div class="ml-space-8">%</div>
              </div>
            </div>
          </div>

          <div class="w-full flex mt-space-32">
            <div class="flex flex-col" style="flex: 1 1">
              <text class="mb-space-8">{{ $t('invest.tge.percent') }}</text>
              <div class="w-full flex items-center">
                <el-input-number
                  v-model="inputTgePercent"
                  style="width: 100%"
                  size="large"
                  :controls="false"
                  :min="0"
                  :max="100"></el-input-number>
                <div class="ml-space-8">%</div>
              </div>
            </div>
            <div style="flex: 1 1" class="mx-space-32"></div>
            <div style="flex: 1 1"></div>
          </div>

          <text class="mt-space-32">{{ $t('invest.desc') }}</text>
        </div>
        <div class="btn-common px-space-64 mt-space-32" @click="clickCreate">
          + {{ $t('invest.create') }}
        </div>
      </div>
    </div>
  </div>

  <confirm-dialog v-model:show="showConfirm" @sureClicked="onSureConfirm">
    <template #title>{{ $t('invest.confirm.create') }}</template>
    <template #hint>{{ $t('invest.confirm.hint') }}</template>
    <template #sure>{{ $t('invest.create') }}</template>
  </confirm-dialog>

  <success-dialog v-model:show="showSuccess" @dismiss="$router.back()">{{
    $t('invest.create.success')
  }}</success-dialog>
</template>
<script setup>
import { ref, computed } from 'vue'
import { throttle } from '@/utils'
import { ArrowLeft } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import ConfirmDialog from './components/ConfirmDialog.vue'
import SuccessDialog from './components/SuccessDialog.vue'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { PERIOD_UNITS } from '@/store/dict'
import { useProgram } from '@/composable/anchorProgram'
import { createOrder, orderSuccess } from '@/api'
import { useWallet } from 'solana-wallets-vue'
import { useTools } from '@/composable/tools'
import { Keypair } from '@solana/web3.js'

const { publicKey } = useWallet()

dayjs.extend(duration)

const { t, elLoading } = useTools()
const { createVesting } = useProgram()

const showConfirm = ref(false)
const showSuccess = ref(false)

const tokenName = ref(import.meta.env.VITE_MINT_TOKEN_NAME)
const tokenAddress = ref(import.meta.env.VITE_MINT_TOKEN)
const inputAmount = ref(0)
const inputInvestor = ref('')
const inputAccount = ref('')
const startDate = ref('')
const startTime = ref()
const disableStart = (date) => date.getTime() < Date.now()
const endDate = ref()
const endTime = ref()
const disableEnd = (date) => {
  return startDate.value
    ? date.getTime() < startDate.value.getTime()
    : date.getTime() < Date.now()
}
const inputPeriod = ref(1)
const periodUnit = ref(PERIOD_UNITS[0].value)
const period = computed(() => {
  return dayjs.duration(inputPeriod.value, periodUnit.value).asSeconds()
})

const openAdvanced = ref(false)
const cliffDate = ref()
const cliffTime = ref()
const disableCliff = (date) => {
  const start = dayjs(startDate.value || new Date())
  const end = dayjs(endDate.value || new Date())
  const cur = dayjs(date)
  return cur.isBefore(start) || cur.isAfter(end)
}
const inputCliffPercent = ref(0)
const inputTgePercent = ref(0)

const start = computed(() => {
  const date = dayjs(startDate.value || new Date())
  const time = dayjs(startTime.value || new Date())
  return date.hour(time.hour()).minute(time.minute()).second(time.second())
})

const end = computed(() => {
  const date = dayjs(endDate.value || new Date())
  const time = dayjs(endTime.value || new Date())
  return date.hour(time.hour()).minute(time.minute()).second(time.second())
})

const cliff = computed(() => {
  if (cliffDate.value && cliffTime.value) {
    const date = dayjs(cliffDate.value)
    const time = dayjs(cliffTime.value)
    return date.hour(time.hour()).minute(time.minute()).second(time.second())
  }
  return null
})

const checkParams = () => {
  if (inputAmount.value === 0) {
    ElMessage.error(`${t('invest.num.hint')}`)
    return false
  }
  if (!inputInvestor.value || inputInvestor.value.length === 0) {
    ElMessage.error(`${t('invest.input.investor')}`)
    return false
  }
  if (!inputAccount.value || inputAccount.value.length === 0) {
    ElMessage.error(`${t('invest.input.account')}`)
    return false
  }
  if (start.value.isAfter(end.value)) {
    ElMessage.error(`${t('invest.start.end.hint')}`)
    return false
  }
  if (
    cliff.value &&
    (cliff.value.isAfter(end.value) || cliff.value.isBefore(start.value))
  ) {
    ElMessage.error(`${t('invest.cliff.hint')}`)
    return false
  }
  if (period.value && period.value > end.value.unix() - start.value.unix()) {
    ElMessage.error(`${t('invest.period.hint')}`)
    return false
  }
  return true
}

const clickCreate = () => {
  if (checkParams()) {
    showConfirm.value = true
  }
}
const onSureConfirm = throttle(() => {
  const params = {
    total: inputAmount.value,
    vestId: Date.now(),
    investName: inputInvestor.value,
    investAddress: inputAccount.value,
    startAt: start.value,
    endAt: end.value,
    period: period.value,
    cliffRate: inputCliffPercent.value,
    tgeRate: inputTgePercent.value,
    tokenName: tokenName.value,
    tokenAddress: tokenAddress.value
  }
  if (cliff.value) {
    params.cliffAt = cliff.value
  }
  if (!openAdvanced.value) {
    params.cliffRate = 0
    params.tgeRate = 0
    params.cliffAt = null
  }
  createAndUpdate(params)
})

const createAndUpdate = async (params) => {
  const loading = elLoading(t('invest.creating'))
  const vesting = Keypair.generate()
  const unit = periodUnit.value
  try {
    const res = await createOrder({
      ...params,
      vestAddress: vesting.publicKey.toBase58(),
      periodNum: inputPeriod.value || 1,
      periodUnit: unit
    })
    const { id } = res
    const { tx, success } = await createVesting({
      ...params,
      vesting
    })
    const status = success ? 1 : 0
    await orderSuccess({ id, tx, status })
    showSuccess.value = true
  } catch (err) {
    console.error('order success', err)
    const message = err.message || t('invest.confirm.fail')
    ElMessage.error(message)
  } finally {
    loading.close()
  }
}
</script>
<style lang="scss" scoped>
@import 'manager.scss';
:deep(.el-input) {
  background: transparent;
}
:deep(.el-input__inner) {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.6rem;
  height: 2.4rem;
  color: white;
  text-align: start;
}
</style>
