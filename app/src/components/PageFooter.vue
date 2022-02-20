<template>
  <div
    class="w-full flex flex-row justify-between items-center box-border footer">
    <div class="flex items-center">
      <img src="/images/logo_footer.png" width="190" />
      <switch-language class="ml-space-32"></switch-language>
    </div>
    <div class="text-light-9a text-size-16">
      Copyright © GameYoo 2022. All rights reserved.
    </div>
  </div>
</template>
<script setup>
import SwitchLanguage from './SwitchLanguage.vue'
</script>
<style lang="scss" scoped>
.footer {
  padding: 1.2rem 0;
  max-width: var(--page-max-width);
}
</style>
