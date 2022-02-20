<template>
  <div id="app">
    <el-config-provider :locale="locale">
      <router-view />
    </el-config-provider>
  </div>
</template>
<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { ElConfigProvider } from 'element-plus'
import elEnUs from 'element-plus/es/locale/lang/en'
import elZhTw from 'element-plus/lib/locale/lang/zh-tw'
import { LANGUAGE_ZH_HK } from '@/store/mutation-types'

import init from '@/core/init'

const store = useStore()
const locale = computed(() =>
  store.getters.lang === LANGUAGE_ZH_HK ? elZhTw : elEnUs
)

onMounted(() => {
  init()
})
</script>
<style lang="scss">
@import 'assets/style/global.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
