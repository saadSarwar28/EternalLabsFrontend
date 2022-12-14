import React, {useEffect, useState} from 'react';
import Web3 from 'web3';
import {notifyError, notifySuccess} from '../../../../../utils/toast';
import {
    getMoneyMonkeysDistributorAddress,
} from '../../../../../utils/getContractAddress';
import styles from '../../../../../styles/Mm.module.css';
import distributorABI from '../../../../../abi/distributor.json'
import {
    getMoneyMonkeysDistributorNoWallet,
    getMoneyMonkeysMinterNoWallet,
} from '../../../../../utils/web3NoWallet';
import {useDispatch, useSelector} from 'react-redux';
import {selectCreateAccountState, updatePendingMainst} from '../../../../../reduxStore/accountSlice';
import {ethers} from 'ethers';

export const MmClaimCard = () => {

    const dispatch = useDispatch()
    // @ts-ignore
    const {userData, web3Provider} = useSelector(
        selectCreateAccountState
    )

    const [mmBalance, setMmBalance] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const updateBalance = () => {
        if (userData.walletConnected) {
            getMoneyMonkeysMinterNoWallet(process.env.NEXT_PUBLIC_CHAIN_ID).methods.balanceOf(userData.account).call()
                .then((res: any) => {
                    setMmBalance(res)
                })
        }
    }

    useEffect(() => {
        updateBalance()
    }, [userData.account])

    const claimAll = () => {
        setIsLoading(true)
        try {
            if (userData.walletConnected) {
                if (mmBalance < 1) {
                    notifyError('You do not have any Money Monkeys token in your wallet. Consider purchasing some')
                    setIsLoading(false)
                    return
                }
                const web3 = new Web3(web3Provider)
                // @ts-ignore
                const distributorContract = new web3.eth.Contract(distributorABI, getMoneyMonkeysDistributorAddress(process.env.NEXT_PUBLIC_CHAIN_ID))
                distributorContract.methods.claimAll().send({
                    'from': userData.account,
                })
                    // @ts-ignore
                    .then(res => {
                        notifySuccess('Claimed Successfully')
                        dispatch(
                            // @ts-ignore
                            updatePendingMainst(userData.account)
                        )
                        setIsLoading(false)
                    })
            }
        } catch (error) {
            notifyError('Already claimed')
            setIsLoading(false)
        }
        setIsLoading(false)
    }

    return (
        <div className={styles.mintCard}>
            <p className={styles.mintCardAnnouncement}>Your $MAINST earnings</p>
            <div className={styles.mintCardAmounts}>
                <div className={styles.mintCardNormalPrice}>
                    <p className={styles.mintCardTotalMinted}>Your MM Balance</p>
                    <p className={styles.mintCardTotalMinted}>{mmBalance} MM</p>
                </div>
            </div>
            <div className={styles.mintCardAmounts}>
                <div className={styles.mintCardNormalPrice}>
                    <p className={styles.mintCardTotalMinted}>Total earned</p>
                    <p className={styles.mintCardTotalMinted}>{userData.pendingMainst.toFixed(2)} $MAINST</p>
                </div>
            </div>
            {
                userData.walletConnected ?
                    <>
                        <div className={styles.ezClaimCardButtons}>
                            <button onClick={claimAll} disabled={isLoading} className={styles.connectWalletButton}>
                                {
                                    isLoading ? <img className={styles.mintCardButtonLoader}
                                                     src="https://i.pinimg.com/originals/a6/21/0f/a6210fd59c68852a3143ccde924e6cf2.gif"
                                                     alt="loading"/> :
                                        <span>Claim</span>
                                }
                            </button>
                        </div>
                    </>
                    :
                    <div className={styles.mintCardButtons}>
                        <p className={styles.mintCardAnnouncement}>Connect wallet to see your earnings</p>
                    </div>
            }
        </div>
    )
}

export default MmClaimCard
