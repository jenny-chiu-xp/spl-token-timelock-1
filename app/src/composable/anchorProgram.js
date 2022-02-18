import { useSolanaWallet } from '@/composable/solana'
// import { useWallet } from 'solana-wallets-vue'
import { BN } from '@project-serum/anchor'
import { token } from '@project-serum/common'
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
    const { program, wallet, connection, provider } = useSolanaWallet()

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
        const mintPublicKey = new PublicKey(import.meta.env.VITE_MINT_TOKEN)

        const mintToken = new Token(
            connection,
            mintPublicKey,
            TOKEN_PROGRAM_ID,
            wallet.value.payer
        )

        console.error('--- mintToken ---', mintToken)

        console.error('--- ASSOCIATED_TOKEN_PROGRAM_ID ---', ASSOCIATED_TOKEN_PROGRAM_ID)
        console.error('--- TOKEN_PROGRAM_ID ---', TOKEN_PROGRAM_ID)
        const granterToken = await Token.getAssociatedTokenAddress(
            mintToken.associatedProgramId,
            mintToken.programId,
            mintPublicKey,
            granter.publicKey
        )

        console.error('--- wallet.value.publicKey ---', wallet.value.publicKey)


        console.error('--- granterToken ---', granterToken)
        console.error('--- granterToken publickey---', granterToken.toBase58())


        const recipient = new PublicKey(investorAddress)

        console.error('--- recipient ---', recipient)
        console.error('--- recipient ---', recipient.toBase58())
        const recipientToken = await Token.getAssociatedTokenAddress(
            mintToken.associatedProgramId,
            mintToken.programId,
            mintPublicKey,
            recipient
        )

        console.error('--- recipientToken ---', recipientToken)

        const vesting = Keypair.generate()

        const [escrowVault, nonce] = await PublicKey.findProgramAddress(
            [vesting.publicKey.toBuffer()],
            program.value.programId
        )

        const vestId = Date.now()
        const vestName = nacl.util.decodeUTF8('GoGo Corp')
        const investor_wallet_address = nacl.util.decodeUTF8('2ZegnjQCPrSQcxAyS861HSUaMhRRRxczgNqB144DnpCp')

        // ------------------before start -------------------//

        const _escrowVaultToken = await connection.getAccountInfo(
            escrowVault
        )
        console.error('start _escrowVaultToken', _escrowVaultToken)

        const _granterToken = await connection.getAccountInfo(
            granterToken
        )

        console.error('start _granterToken', _granterToken)

        const _vesting = await connection.getAccountInfo(
            vesting.publicKey
        )

        console.error('start _vesting', _vesting)

        // const _escrowVaultTokenData = Token.parseTokenAccountData(
        //     _escrowVaultToken.data
        // )

        // console.error('start _escrowVaultTokenData', _escrowVaultTokenData.amount)

        const _granterTokenData = token.parseTokenAccountData(
            _granterToken.data
        )
        console.error('start _granterTokenData', _granterTokenData)

         // ------------------before end -------------------//

        console.error('--- sign granter ---', granter)
        console.error('--- sign granter publicKey ---', granter.publicKey.toBase58())
        console.error('--- sign vesting ---', vesting)
        console.error('--- sign escrowVault ---', escrowVault)
        console.error('--- payer wallet payer---', program.value.provider.wallet.payer)
        console.error('--- payer recipientToken---', recipientToken)
        console.error('--- start---', start)
        console.error('--- end---', end)
        console.error('--- cliff---', cliff)
        console.error('--- now---', Date.now())
        const tx = await program.value.rpc.createVesting(
            new BN(amount),
            nonce,
            new BN(vestId),
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
                    mint: mintPublicKey,
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


        // ------------------before start -------------------//

        const _escrowVaultToken1 = await connection.getAccountInfo(
            escrowVault
        )

        const _granterToken1 = await connection.getAccountInfo(
            granterToken
        )

        const _vesting1 = await connection.getAccountInfo(
            vesting.publicKey
        )

        const _escrowVaultTokenData1 = token.parseTokenAccountData(
            _escrowVaultToken1.data
        )

        const _granterTokenData1 = token.parseTokenAccountData(
            _granterToken1.data
        )

        console.error('end _escrowVaultToken', _escrowVaultToken1)
        console.error('end _vesting', _vesting1)
        console.error('end _escrowVaultTokenData', _escrowVaultTokenData1.amount)
        console.error('end _granterTokenData', _granterTokenData1)

         // ------------------before end -------------------//
    }

    return {
        createVesting
    }
}