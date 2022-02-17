<template>
  <transition name="el-fade-in-linear">
    <div v-if="isShow" class="w-full h-full flex justify-center items-center dialog">
      <div class="flex flex-col box-border bg-grey-28 justify-center items-center content">
        <div class="text-size-32 font-bold title">
          <slot name="title"></slot>
        </div>
        <div class="text-size-16 text-white-f4 my-space-32">
          <slot name="hint"></slot>
        </div>
        <div class="flex flex-row">
          <div class="btn-common btn mr-space-32" @click.stop="clickSure">{{ $t('invest.create') }}</div>
          <div class="btn-common btn cancel" @click.stop="clickClose">{{ $t('cancel') }}</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup>
import { ref, toRefs, watch } from 'vue'
import { throttle } from '@/utils'
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['dismiss', 'update:show', 'sureClicked'])

const { show } = toRefs(props)

const isShow = ref(show.value)
const isDismiss = ref(false)

watch(show, (v) => {
  if (v) {
    isShow.value = v
  } else {
    dismiss(false)
  }
})

const dismiss = (isUpdate) => {
  isDismiss.value = true
  setTimeout(() => {
    isShow.value = false
    isDismiss.value = false
    emit('dismiss')
    if (isUpdate) {
      emit('update:show', false)
    }
  }, 200)
}

const clickClose = throttle(() => {
  dismiss(true)
})

const clickSure = throttle(() => {
  emit('sureClicked')
  dismiss(true)
})
</script>
<style lang="scss" scoped>
.dialog {
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
}
.content {
  border-radius: 1.5rem;
  padding: 2rem 3.2rem;
}

.title {
  color: #92e261;
}

.btn {
  padding: 0 3rem;
}
.cancel {
  background: var(--grey-28);
  border: 1px solid #92e261;
}
</style>
