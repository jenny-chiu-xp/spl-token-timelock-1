import { useSolanaWallet } from '@/composable/solana'
// import { useWallet } from 'solana-wallets-vue'
import { BN } from '@project-serum/anchor'
import {
    PublicKey, SystemProgram,
    Keypair,
    SYSVAR_RENT_PUBKEY,
    SYSVAR_CLOCK_PUBKEY
} from '@solana/web3.js'
import {
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID,
    Token
} from '@solana/spl-token'
import nacl from 'tweetnacl'
import naclUtil from 'tweetnacl-util'

nacl.util = naclUtil

export const useProgram = () => {
    const { program, wallet, provider } = useSolanaWallet()

    const createVesting = async (params) => {

        console.error('--- params ---', JSON.stringify(params))
        console.error('--- program ---', program.value)
        console.error('--- provider ---', provider.value)


        program.value.addEventListener('CreateVestingEvent', (event, slot) => {
            console.log('slot: ', slot)
            console.log('event data: ', event.data.toNumber())
            console.log('event status: ', event.status)
        })

        const granter = wallet.value

        console.error('--- granter publicKey  001 ---', granter)
        console.error('--- granter publicKey  001 toBase58 ---', granter.publicKey.toBase58())

        const { amount, investorName, investorAddress, start, end, cliff, period, cliffPercent, tgePercent } = params
        console.error('--- params investorName ---', investorName)
        console.error('--- params investorAddress ---', investorAddress)
        // local token key
        const mint = new PublicKey('Dtofp7JwMqjZBQVGZjqqMW2S4diBtDBk5AhKBH4FUrhs')


        const granterToken = await Token.getAssociatedTokenAddress(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            mint,
            granter.publicKey
        )

        console.error('--- granterToken ---', granterToken)


        const recipient = new PublicKey(investorAddress)

        console.error('--- recipient ---', recipient)
        console.error('--- recipient ---', recipient.toBase58())
        const recipientToken = await Token.getAssociatedTokenAddress(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            mint,
            recipient
        )

        const vesting = Keypair.generate()

        const [escrowVault, nonce] = await PublicKey.findProgramAddress(
            [vesting.publicKey.toBuffer()],
            program.value.programId
        )

        // const vestId = uuid()
        const vestName = nacl.util.decodeUTF8('GoGo Corp')
        const investor_wallet_address = nacl.util.decodeUTF8('2ZegnjQCPrSQcxAyS861HSUaMhRRRxczgNqB144DnpCp')


        console.error('--- sign granter ---', granter)
        console.error('--- sign granter publicKey ---', granter.publicKey.toBase58())
        console.error('--- sign vesting ---', vesting)
        console.error('--- sign escrowVault ---', escrowVault)
        console.error('--- payer wallet---', program.value.provider.wallet)
        const tx = await program.value.rpc.createVesting(
            new BN(amount),
            nonce,
            new BN(1),
            vestName,
            investor_wallet_address,
            new BN(start),
            new BN(end),
            new BN(period),
            new BN(cliff),
            new BN(cliffPercent),
            new BN(tgePercent),
            {
                accounts: {
                    granter: granter.publicKey,
                    mint: mint,
                    granterToken: granterToken,
                    recipient: recipient,
                    recipientToken: recipientToken,
                    vesting: vesting.publicKey,
                    escrowVault: escrowVault,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                    systemProgram: SystemProgram.programId,
                    clock: SYSVAR_CLOCK_PUBKEY,
                    rent: SYSVAR_RENT_PUBKEY
                },
                signers: [program.value.provider.wallet.payer, vesting]
            }
        )

        console.error('tx: ', tx)
    }

    return {
        createVesting
    }
}