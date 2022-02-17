<template>
  <div
    class="w-full col box-border padding-space-32 bg-grey-28 text-light-9a text-size-14 content">
    <div class="w-full justify-between items-center">
      <div class="col">
        <div class="font-bold text-size-32 text-white-f4">VC NAME</div>
        <div>0x21523423423434 {{ item }}</div>
      </div>
      <div class="col">
        <div>{{ $t('invest.start') }}：2022-03-01</div>
      </div>
      <div class="mt-space-8">{{ $t('invest.end') }}：2022-03-01</div>
    </div>

    <div class="w-full items-center text-light mt-space-40">
      <div class="col expand">
        <div class="mb-space-8">{{ $t('invest.total') }}</div>
        <div class="font-bold text-white-f4">10000GYC</div>
      </div>
      <div class="line"></div>
      <div class="col expand">
        <div class="mb-space-8">{{ $t('invest.free.rate') }}</div>
        <div class="font-bold text-white-f4">10000GYC</div>
      </div>
      <div class="line"></div>
      <div class="col expand">
        <div class="mb-space-8">{{ $t('invest.free.amount') }}</div>
        <div class="font-bold text-white-f4">10000GYC</div>
      </div>
      <div class="line"></div>
      <div class="col expand">
        <div class="mb-space-8">{{ $t('invest.withdraw.amount') }}</div>
        <div class="font-bold text-white-f4">10000GYC</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { toRefs } from 'vue'
const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  }
})
const { item } = toRefs(props)
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
