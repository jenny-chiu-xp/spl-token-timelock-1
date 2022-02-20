<template>
  <el-select v-model="language" effect="dark">
    <el-option
      v-for="(item, index) in LANGUAGES"
      :key="index"
      :label="item.text"
      :value="item.type"></el-option>
  </el-select>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { LANGUAGE_EN_US, LANGUAGE_ZH_HK } from '@/store/mutation-types'

const store = useStore()

const ACTION_EN = { text: 'English', type: LANGUAGE_EN_US }
const ACTION_HK = { text: '繁體中文', type: LANGUAGE_ZH_HK }

const LANGUAGES = [ACTION_HK, ACTION_EN]

const language = ref(store.getters.lang)
watch(language, (v) => {
  store.dispatch('setLang', v)
})
</script>
<style lang="scss" scoped>
:deep(.el-input) {
  background: transparent;
}
:deep(.el-input__inner) {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.6rem;
  height: 2rem;
  color: var(--light-9a);
  text-align: start;
}
</style>
