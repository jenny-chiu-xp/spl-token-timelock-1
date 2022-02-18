import { useSolanaWallet } from '@/composable/solana'
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
    const { program, wallet, connection } = useSolanaWallet()

    const createVesting = async (params) => {
        console.log('params:', params)
        const granter = wallet.value

        const { total, vestId, investName, investAddress, startAt, endAt, cliffAt, period, cliffRate, tgeRate, tokenAddress } = params

        const mintPublicKey = new PublicKey(tokenAddress)
        const mintToken = new Token(
            connection,
            mintPublicKey,
            TOKEN_PROGRAM_ID,
            wallet.value.payer
        )

        const granterToken = await Token.getAssociatedTokenAddress(
            mintToken.associatedProgramId,
            mintToken.programId,
            mintPublicKey,
            granter.publicKey
        )

        const recipient = new PublicKey(investAddress)
        const recipientToken = await Token.getAssociatedTokenAddress(
            mintToken.associatedProgramId,
            mintToken.programId,
            mintPublicKey,
            recipient
        )

        const vesting = Keypair.generate()
        const [escrowVault, nonce] = await PublicKey.findProgramAddress(
            [vesting.publicKey.toBuffer()],
            program.value.programId
        )

        const tx = await program.value.rpc.createVesting(
            new BN(total),
            nonce,
            new BN(vestId),
            nacl.util.decodeUTF8(investName),
            nacl.util.decodeUTF8(investAddress),
            new BN(startAt.unix()),
            new BN(endAt.unix()),
            new BN(period),
            new BN(cliffAt ? cliffAt.unix() : 0),
            new BN(cliffRate),
            new BN(tgeRate),
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
        console.log('tx: ', tx)

        const _escrowVaultToken = await connection.getAccountInfo(
            escrowVault
        )
        const _escrowVaultData = token.parseTokenAccountData(
            _escrowVaultToken.data
        )
        console.log('escrowVaultTokenData amount:', _escrowVaultData.amount)
        const success = _escrowVaultData.amount === total
        return { tx, success }
    }

    return {
        createVesting
    }
}