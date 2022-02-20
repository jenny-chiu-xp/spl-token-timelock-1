import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { loginByWallet } from '@/api'
import { useStore } from 'vuex'

export default function useUser () {
    const store = useStore()
    const login = async (walletAddress) => {
        const res = await loginByWallet({ walletAddress })
        const { accessToken, role } = res
        storage.set(ACCESS_TOKEN, accessToken)
        store.commit('SET_ROLE', role)
    }

    const logout = () => {
        storage.set(ACCESS_TOKEN, '')
        store.commit('SET_ROLE', '')
    }

    return {
        login,
        logout
    }
}