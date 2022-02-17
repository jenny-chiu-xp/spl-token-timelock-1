<template>
  <div class="w-full flex flex-col">
    <div class="w-full flex justify-around items-center">
      <text class="text-white text-size-32 font-bold">{{ $t('invest.list') }}</text>
      <div class="btn-common px-space-32" @click="$router.push({ path: '/invest/create' })">
        + {{ $t('invest.create') }}
      </div>
    </div>
    <div class="w-full col">
      <div v-for="(item,index) in 5" :key="index" class="w-full mb-space-32">
        <invest-item :item="item"></invest-item>
      </div>
    </div>
  </div>
</template>
<script setup>
import InvestItem from './components/InvestItem.vue'
</script>
<style lang="scss"></style>
