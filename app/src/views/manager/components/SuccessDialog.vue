<template>
  <transition name="el-fade-in-linear">
    <div v-if="isShow" class="w-full h-full flex justify-center items-center dialog">
      <div class="flex flex-col justify-center items-center box-border bg-grey-28 content">
        <img class="img" src="/images/icon_success.png" />
        <div class="font-bold text-size-32 mt-space-40 title">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup>
import { ref, toRefs, watch } from 'vue'
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
    setTimeout(() => {
      dismiss(false)
    }, 2000)
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
</script>
<style lang="scss" scoped>
.dialog {
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
}

.img{
  width: 114px;
  height: 114px;
}

.content {
  border-radius: 1.5rem;
  padding: 2rem 3.2rem;
}

.title {
  color: #92e261;
}
</style>
