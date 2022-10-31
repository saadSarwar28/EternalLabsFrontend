import React, {useEffect, useState} from 'react';
import Web3 from 'web3';
import {notifyError, notifyInfo, notifySuccess} from '../../../../../utils/toast';
import {
    getEternalCakesDistributorAddress,
} from '../../../../../utils/getContractAddress';
import styles from '../../../../../styles/Ec.module.css';
import distributorABI from '../../../../../abi/distributor.json'
import {
    getEternalCakesDistributorNoWallet, getEternalCakesMinterNoWallet,
} from '../../../../../utils/web3NoWallet';
import {weiToNumber} from '../../../../../utils/units';
import {useDispatch, useSelector} from 'react-redux';
import {selectCreateAccountState, updatePendingCake} from '../../../../../reduxStore/accountSlice';

export const EcClaimCard = () => {

    const dispatch = useDispatch()

    // @ts-ignore
    const {userData, web3Provider} = useSelector(
        selectCreateAccountState
    )

    const [ecBalance, setEcBalance] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [tokenIds, setTokenIds] = useState([])

    const updatePendingCakeTokens = () => {
        if (tokenIds.length > 0) {
            if (Number(ecBalance) === tokenIds.length) {
                tokenIds.forEach(token => {
                    getEternalCakesDistributorNoWallet(process.env.NEXT_PUBLIC_CHAIN_ID).methods.calculateEarnings(token).call({'from': userData.account})
                        .then((res: any) => {
                            dispatch(
                                // @ts-ignore
                                updatePendingCake(Number(weiToNumber(res, 2)))
                            )
                        })
                })
            }
        }
    }

    useEffect(() => {
        updatePendingCakeTokens()
    }, [tokenIds])

    const updateBalance = () => {
        if (userData.walletConnected) {
            getEternalCakesMinterNoWallet(process.env.NEXT_PUBLIC_CHAIN_ID).methods.balanceOf(userData.account).call()
                .then((res: any) => {
                    setEcBalance(res)
                    for (let i = 0; i < Number(res.toString()); i++) {
                        // @ts-ignore
                        getEternalCakesMinterNoWallet(process.env.NEXT_PUBLIC_CHAIN_ID).methods.tokenOfOwnerByIndex(userData.account, i).call()
                            .then((res: any) => {
                                // @ts-ignore
                                setTokenIds(tokenIds => [...tokenIds, res.toString()])
                            })
                    }
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
                if (ecBalance < 1) {
                    notifyError('You do not have any EC token in your wallet. Consider purchasing some')
                    setIsLoading(false)
                    return
                }
                const web3 = new Web3(web3Provider)
                // @ts-ignore
                const distributorContract = new web3.eth.Contract(distributorABI, getEternalCakesDistributorAddress(process.env.NEXT_PUBLIC_CHAIN_ID))
                distributorContract.methods.claimAll().send({
                    'from': userData.account,
                })
                    // @ts-ignore
                    .then(res => {
                        notifySuccess('Claimed Successfully')
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
            <p className={styles.mintCardAnnouncement}>Claim Your Earned CAKE here</p>
            <div className={styles.mintCardAmounts}>
                <div className={styles.mintCardNormalPrice}>
                    <p className={styles.mintCardTotalMinted}>Your EC Balance</p>
                    <p className={styles.mintCardTotalMinted}>{ecBalance} EC</p>
                </div>
            </div>
            <div className={styles.mintCardAmounts}>
                <div className={styles.mintCardNormalPrice}>
                    <p className={styles.mintCardTotalMinted}>Total CAKE earned</p>
                    <p className={styles.mintCardTotalMinted}>{userData.pendingCake} CAKE</p>
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

export default EcClaimCard
