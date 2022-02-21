<template>
  <div class="w-full relative bg">
    <div class="absolute rate"></div>
  </div>
</template>
<script setup>
import { toRefs, computed } from 'vue'
const props = defineProps({
  rate: {
    type: Number,
    default: 0
  }
})
const { rate } = toRefs(props)
const width = computed(() => `${rate.value * 100}%`)
</script>
<style lang="scss" scoped>
.bg {
  background: rgba(255, 255, 255, 0.05);
  height: 6px;
  border-radius: 3px;
}

.rate {
  left: 0;
  top: 0;
  z-index: 1;
  width: v-bind(width);
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(90deg, #61e290 7.57%, #92e261 88.38%);
}
</style>
