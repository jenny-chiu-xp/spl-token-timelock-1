<template>
  <div class="w-full flex flex-col box-border" style="padding: 1.6rem 8rem">
    <div class="w-full flex flex-col">
      <div class="w-full flex justify-between items-center">
        <text class="text-white text-size-32 font-bold">{{ $t('invest.list') }}</text>
        <div class="btn-common px-space-32" @click="$router.push({ path: '/invest/create' })">
          + {{ $t('invest.create') }}
        </div>
      </div>
      <div class="w-full flex flex-col mt-space-32">
        <div
          v-for="(item, index) in 5"
          :key="index"
          class="w-full mb-space-32"
          @click="$router.push({ path: '/invest/card' })">
          <invest-item :item="item"></invest-item>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import InvestItem from './components/InvestItem.vue'
</script>
<style lang="scss"></style>
