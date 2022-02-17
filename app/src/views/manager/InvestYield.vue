<template>
  <div class="content-padding">
    <div class="font-bold text-size-32 text-green">
      {{ $t('invest.your.yield') }}
    </div>
    <div class="mt-space-32 text-light-9a text-size-14 card-bg">
      <div class="font-bold text-size-32 text-white-f4">VC NAME</div>
      <div class="w-full flex justify-between mt-space-64">
        <div class="flex-row">
          <div class="text-green mr-space-14">{{ $t('invest.start') }}</div>
          <div class="flex flex-col text-white-f4">
            <div>May 31,2014</div>
            <div class="font-bold">14:30</div>
          </div>
        </div>
        <div class="flex-row">
          <div class="text-green mr-space-14">{{ $t('invest.end') }}</div>
          <div class="flex flex-col text-white-f4">
            <div>May 31,2014</div>
            <div class="font-bold">14:30</div>
          </div>
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
      <div class="flex-row mt-space-20">
        <div class="label">{{ $t('invest.withdraw.amount') }}</div>
        <div>123123</div>
      </div>
      <div class="flex-row mt-space-20">
        <div class="label">{{ $t('invest.withdraw.enable') }}</div>
        <div>123123</div>
      </div>

      <div class="btn-common mt-space-40">{{ $t('invest.withdraw') }}</div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
@import 'manager.scss';
</style>
