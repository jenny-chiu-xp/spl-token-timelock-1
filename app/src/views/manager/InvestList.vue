<template>
  <div class="w-full flex flex-col box-border" style="padding: 1.6rem 8rem">
    <div class="w-full flex flex-col">
      <div class="w-full flex justify-between items-center">
        <text class="text-white text-size-32 font-bold">{{
          $t('invest.list')
        }}</text>
        <div
          class="btn-common px-space-32"
          @click="$router.push({ path: '/invest/create' })">
          + {{ $t('invest.create') }}
        </div>
      </div>
      <div class="w-full flex flex-col mt-space-32">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="w-full mb-space-32"
          @click="$router.push({ path: `/invest/card/${item.id}` })">
          <invest-item :item="item"></invest-item>
        </div>
      </div>
      <div v-if="list.length === 0 && isFirstLoaded" class="mt-space-32">
        <el-empty :description="$t('nodata')"></el-empty>
      </div>
    </div>
  </div>
</template>
<script setup>
import InvestItem from './components/InvestItem.vue'
import { ref, onMounted } from 'vue'
import { getOrderList } from '@/api'
import { useTools } from '@/composable/tools'

const { t, elLoading, elError } = useTools()
const isFirstLoaded = ref(false)

const list = ref([])
const loadList = async () => {
  const loading = elLoading(t('loading'))
  try {
    const res = await getOrderList({ pageSize: 100, status: 1 })
    list.value = res.list || []
  } catch (err) {
    console.error('load order list err', err)
    elError(err.message || 'load error')
  } finally {
    loading.close()
    isFirstLoaded.value = true
  }
}

onMounted(loadList)
</script>
<style lang="scss"></style>
