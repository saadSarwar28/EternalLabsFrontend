import React, {useEffect, useState} from 'react';
import Web3 from 'web3';
import {notifyError, notifyInfo, notifySuccess} from '../../../../../utils/toast';
import {getDistributorAddress, getMinterAddress} from '../../../../../utils/getContractAddress';
import styles from '../../../../../styles/Ez.module.css';
import distributorABI from '../../../../../abi/distributor.json'
import {getDistributorNoWallet, getMinterNoWallet} from '../../../../../utils/web3NoWallet';
import {weiToNumber} from '../../../../../utils/units';
import {useDispatch, useSelector} from 'react-redux';
import {selectCreateAccountState, updatePendingZmbe} from '../../../../../reduxStore/accountSlice';
import Loader from '../../../loader';

export const EzClaimCard = () => {

    const dispatch = useDispatch()

    // @ts-ignore
    const {userData, web3Provider} = useSelector(
        selectCreateAccountState
    )

    const [ezBalance, setEzBalance] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const updateBalance = () => {
        if (userData.walletConnected) {
            getMinterNoWallet(process.env.NEXT_PUBLIC_CHAIN_ID).methods.balanceOf(userData.account).call()
                .then((res: any) => {
                    setEzBalance(res)
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
                if (ezBalance < 1) {
                    notifyError('You do not have any EZ token in your wallet. Consider purchasing some')
                    setIsLoading(false)
                    return
                }
                const web3 = new Web3(web3Provider)
                // @ts-ignore
                const distributorContract = new web3.eth.Contract(distributorABI, getDistributorAddress(process.env.NEXT_PUBLIC_CHAIN_ID))
                distributorContract.methods.claimAll().send({
                    'from': userData.account,
                })
                    // @ts-ignore
                    .then(res => {
                        notifySuccess('Claimed Successfully')
                        dispatch(
                        // @ts-ignore
                            updatePendingZmbe(userData.account)
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
            <p className={styles.mintCardAnnouncement}>Claim Your Earned ZMBE here</p>
            <div className={styles.mintCardAmounts}>
                <div className={styles.mintCardNormalPrice}>
                    <p className={styles.mintCardTotalMinted}>Your EZ Balance</p>
                    <p className={styles.mintCardTotalMinted}>{ezBalance} EZ</p>
                </div>
            </div>
            <div className={styles.mintCardAmounts}>
                <div className={styles.mintCardNormalPrice}>
                    <p className={styles.mintCardTotalMinted}>Total ZMBE earned</p>
                    <p className={styles.mintCardTotalMinted}>{userData.pendingZmbe} ZMBE</p>
                </div>
            </div>
            {
                userData.walletConnected ?
                    <>
                        <div className={styles.ezClaimCardButtons}>
                            <button onClick={claimAll} disabled={isLoading} className={styles.connectWalletButton}>
                                {
                                    isLoading ? <Loader/> :
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

export default EzClaimCard
