import { watch } from 'vue'
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { loginByWallet } from '@/api'

export default function useUser (walletAddress) {
    const login = async () => {
        console.error('---- useUser 自动登录 :', walletAddress)
        if (walletAddress.value) {
            const res = await loginByWallet({ walletAddress: walletAddress.value })
            const { accessToken } = res
            storage.set(ACCESS_TOKEN, accessToken)
            console.error('---- useUser 自动登录成功 :', storage.get(ACCESS_TOKEN))
        }
    }
    watch(walletAddress, login, { immediate: true })

    return {
        login
    }
}