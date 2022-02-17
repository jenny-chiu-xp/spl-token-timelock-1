<template>
  <div class="content-padding">
    <div class="text-light-9a text-size-14 card-bg">
      <div class="text-white-f4 font-bold text-size-32">VC NAME</div>
      <div class="w-full flex justify-between text-size-24 font-bold mt-space-64">
        <div class="expand flex flex-row">
          <div>{{ $t('invest.start') }}:</div>
          <div class="text-white-f4">2022-02-04</div>
        </div>
        <div class="expand flex flex-row">
          <div>{{ $t('invest.end') }}:</div>
          <div class="text-white-f4">2022-02-04</div>
        </div>
      </div>
      <div class="my-space-32 sep-line"></div>
      <div class="flex flex-row">
        <div class="label">{{ $t('invest.orderId') }}</div>
        <div>123123</div>
      </div>
      <div class="flex flex-row mt-space-20">
        <div class="label">{{ $t('invest.investor.address') }}</div>
        <div>123123</div>
      </div>
      <div class="flex flex-row mt-space-20">
        <div class="label">{{ $t('invest.total.amount') }}</div>
        <div>123123</div>
      </div>
      <div class="flex flex-row mt-space-20">
        <div class="label">{{ $t('invest.cliff.unlock') }}</div>
        <div>123123</div>
      </div>
      <div class="flex flex-row mt-space-20">
        <div class="label">{{ $t('invest.tge.unlock') }}</div>
        <div>123123</div>
      </div>
      <div class="flex flex-row mt-space-20">
        <div class="label">{{ $t('invest.unlock.rate') }}</div>
        <div>123123</div>
      </div>
      <div class="flex flex-row mt-space-20">
        <div class="label">{{ $t('invest.unfreeze.next') }}</div>
        <div>123123</div>
      </div>
      <div class="flex flex-row mt-space-20">
        <div class="label">{{ $t('invest.withdraw.amount') }}</div>
        <div>123123</div>
      </div>
      <div class="flex flex-row mt-space-20">
        <div class="label">{{ $t('invest.withdraw.enable') }}</div>
        <div>123123</div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
@import 'manager.scss';
.label {
    width: 20%;
}
</style>
