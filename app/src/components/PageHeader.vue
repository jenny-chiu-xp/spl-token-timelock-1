<template>
  <div class="z-10 w-full flex box-border justify-between items-center header">
    <img src="/images/logo_header.png" width="190" />
    <div v-if="connected" class="btn-common btn-connect" @click="onClick">
      {{ text }}
    </div>
    <wallet-multi-button v-else-if="showConnect"></wallet-multi-button>
  </div>

  <confirm-dialog v-model:show="showConfirm" @sureClicked="onSureConfirm">
    <template #title>{{ $t('invest.disconnect.title') }}</template>
    <template #hint>{{ $t('invest.disconnect.hint') }}</template>
    <template #sure>{{ $t('invest.disconnect') }}</template>
  </confirm-dialog>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useWallet } from 'solana-wallets-vue'
import { WalletMultiButton } from 'solana-wallets-vue'
import { formatAddress, throttle } from '@/utils'
import { WalletReadyState } from '@solana/wallet-adapter-base'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

const showConfirm = ref(false)

const {
  ready,
  readyState,
  publicKey,
  connected,
  disconnect
} = useWallet()

// readyState: Installed Loadable NotDetected Unsupported
const showConnect = computed(
  () => ready || readyState.value === WalletReadyState.NotDetected
)

const text = computed(() => {
  const address = publicKey.value ? publicKey.value.toBase58() : ''
  return formatAddress(address, 6)
})

const onSureConfirm = throttle(async () => {
  await disconnect()
})

const onClick = throttle(() => {
  if (connected.value) {
    showConfirm.value = true
  }
})
</script>
<style lang="scss" scoped>
.header {
  padding: 1.2rem 0;
  max-width: var(--page-max-width);
}

.btn-connect {
  padding: 0 1rem;
  background: transparent;
  border: 1px solid #92e261;
}

:root {
  --swv-button-background-color: var(--green);
}
</style>
