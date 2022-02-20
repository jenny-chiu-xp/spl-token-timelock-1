import { ref } from 'vue'
import { useSolanaWallet } from '@/composable/solana'
import { BN } from '@project-serum/anchor'
import { token } from '@project-serum/common'
import {
    PublicKey, SystemProgram,
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

        const { total, vestId, investName, investAddress, startAt, endAt, cliffAt,
            period, cliffRate, tgeRate, tokenAddress, vesting } = params

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

    const withdrawToken = async (order, amount) => {
        const { tokenAddress, investAddress, vestAddress } = order

        const mintPublicKey = new PublicKey(tokenAddress)
        const mintToken = new Token(
            connection,
            mintPublicKey,
            TOKEN_PROGRAM_ID,
            wallet.value.payer
        )

        const recipient = new PublicKey(investAddress)
        const recipientToken = await Token.getAssociatedTokenAddress(
            mintToken.associatedProgramId,
            mintToken.programId,
            mintPublicKey,
            recipient
        )

        const vesting = new PublicKey(vestAddress)
        const [escrowVault, nonce] = await PublicKey.findProgramAddress(
            [vesting.toBuffer()],
            program.value.programId
        )
        console.log('findProgramAddress nonce', nonce)
        const oldEscrowAccountInfo = await connection.getAccountInfo(escrowVault)
        const oldEscrowAmount = token.parseTokenAccountData(oldEscrowAccountInfo.data).amount

        console.log('oldEscrowVaultAmount', oldEscrowAmount)

        const oldRecipientTokenAccountInfo = await connection.getAccountInfo(recipientToken)
        const oldRecipientAmount = token.parseTokenAccountData(oldRecipientTokenAccountInfo.data).amount

        console.log('oldRecipientTokenAmount', oldRecipientAmount)

        const tx = await program.value.rpc.withdraw(
            new BN(amount),
            {
                accounts: {
                    recipientToken: recipientToken,
                    vesting: vesting,
                    escrowVault: escrowVault,
                    mint: mintPublicKey,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    clock: SYSVAR_CLOCK_PUBKEY
                },
                signers: []
            }
        )

        console.log('tx: ', tx)
        const newEscrowAccountInfo = await connection.getAccountInfo(escrowVault)
        const newEscrowAmount = token.parseTokenAccountData(newEscrowAccountInfo.data).amount
        console.log('newEscrowAmount', newEscrowAmount)

        const newRecipientTokenAccountInfo = await connection.getAccountInfo(recipientToken)
        const newRecipientAmount = token.parseTokenAccountData(newRecipientTokenAccountInfo.data).amount

        console.log('new ~ old', newRecipientAmount, oldRecipientAmount)
        const success = newRecipientAmount - oldRecipientAmount === amount
        return {
            tx,
            oldEscrowAmount,
            newEscrowAmount,
            oldRecipientAmount,
            newRecipientAmount,
            withdrawnAmount: newRecipientAmount,
            status: success ? 1 : 0
        }
    }

    const getBalance = async () => {
        const amount = await connection.getBalance(wallet.value.publicKey)
        return amount
    }

    return {
        createVesting,
        withdrawToken,
        getBalance
    }
}