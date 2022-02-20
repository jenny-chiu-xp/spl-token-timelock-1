<template>
  <div class="w-full flex flex-col justify-center items-center relative home">
    <img class="absolute img-bg" src="/images/bg_page.png" />
    <page-header></page-header>
    <router-view v-slot="{ Component }">
      <transition name="el-fade-in-linear">
        <keep-alive>
          <div
            class="flex-grow flex flex-col items-center z-10 box-border container">
            <component :is="Component"></component>
          </div>
        </keep-alive>
      </transition>
    </router-view>
    <div class="w-full line"></div>
    <page-footer class="z-10"></page-footer>
  </div>
</template>
<script setup>
import { watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ROLE_ADMIN, ROLE_INVESTOR } from '@/store/mutation-types'
import PageHeader from '@/components/PageHeader.vue'
import PageFooter from '@/components/PageFooter.vue'
import { useWallet } from 'solana-wallets-vue'
import useUser from '@/composable/user'

const { publicKey } = useWallet()
const router = useRouter()
const store = useStore()

const { login,logout } = useUser()

watch(
  publicKey,
  async (v) => {
    if (v) {
      await login(v)
    } else {
      logout()
    }
  },
  { immediate: true }
)

const role = computed(() => store.getters.role)

watch(
  role,
  (v) => {
    let path = '/home'
    switch (v) {
      case ROLE_ADMIN:
        path = '/invest/list'
        break
      case ROLE_INVESTOR:
        path = '/invest/yield'
        break
      default:
        break
    }
    router.replace({ path })
  },
  { immediate: true }
)
</script>
<style lang="scss">
.home {
  background: var(--neutral-100);
  min-height: 100vh;

  .img-bg {
    width: 100%;
    z-index: 1;
    right: 0;
    top: -40px;
  }
}

.container {
  width: 100%;
  max-width: var(--page-max-width);
}

.line {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin-top: 4px;
}

::-webkit-scrollbar {
  width: 0;
  display: none;
}
</style>
