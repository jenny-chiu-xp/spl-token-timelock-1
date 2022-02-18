import { watch } from 'vue'
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { loginByWallet } from '@/api'
import { useStore } from 'vuex'

export default function useUser (walletAddress) {
    const store = useStore()
    const login = async () => {
        if (walletAddress.value) {
            const res = await loginByWallet({ walletAddress: walletAddress.value })
            const { accessToken, role } = res
            storage.set(ACCESS_TOKEN, accessToken)
            store.commit('SET_ROLE', role)
        }
    }
    watch(walletAddress, login, { immediate: true })

    return {
        login
    }
}