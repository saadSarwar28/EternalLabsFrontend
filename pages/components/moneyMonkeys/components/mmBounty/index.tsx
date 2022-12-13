import React, {useEffect, useState} from 'react';
import {notifyError, notifySuccess} from '../../../../../utils/toast';
import styles from '../../../../../styles/Mm.module.css';
import BountyTimer from './components/Timer';
import {ToastContainer} from 'react-toastify';
import {
    getMoneyMonkeysBountyNoWallet, getMoneyMonkeysMinterNoWallet,
} from '../../../../../utils/web3NoWallet';
import {useSelector} from 'react-redux';
import {selectCreateAccountState} from '../../../../../reduxStore/accountSlice';
import Web3 from 'web3';
import bountyAbi from "../../../../../abi/eternalCakesBounty.json"
import {getMoneyMonkeysBountyAddress} from '../../../../../utils/getContractAddress';

export const MmBountyCard: React.FC = () => {

    // const dispatch = useDispatch()

    // @ts-ignore
    const {userData, web3Provider} = useSelector(
        selectCreateAccountState
    )

    const [isLoading, setIsLoading] = useState(false)
    const [bountyTime, setBountyTime] = useState(0)
    const [lastClaimedAt, setLastClaimedAt] = useState(0)
    const [bountyDuration, setBountyDuration] = useState(0)
    const [canClaim, setCanClaim] = useState(false)
    const [mmBalance, setMmBalance] = useState(0)
    const [ticketPurchased, setTicketPurchased] = useState(false)
    const [ticketPurchaseLoading, setTicketPurchaseLoading] = useState(false)
    const [ticketPrice, setTicketPrice] = useState(0)
    // @ts-ignore
    const [web3NoWallet, setWeb3NoWallet] = useState(new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)) // for fetching info

    const updateMmBalance = () => {
        if (userData.walletConnected) {
            getMoneyMonkeysMinterNoWallet(process.env.NEXT_PUBLIC_CHAIN_ID).methods.balanceOf(userData.account).call()
                .then((res: any) => {
                    setMmBalance(res)
                })
        }
    }

    useEffect(() => {
        updateMmBalance()
    }, [userData.account])

    const checkTicketHolder = () => {
        if (userData.walletConnected) {
            getMoneyMonkeysBountyNoWallet().methods.tickets(userData.account).call()
                .then((res: any) => {
                    setTicketPurchased(res)
                })
        }
    }

    useEffect(() => {
        checkTicketHolder()
    }, [userData.account])

    const getTicketPrice = () => {
        getMoneyMonkeysBountyNoWallet().methods.ticketPrice().call()
            .then((res: any) => {
                // @ts-ignore
                setTicketPrice(web3NoWallet.utils.fromWei(res))
            })
    }

    useEffect(() => {
        if (userData.walletConnected && !ticketPurchased && mmBalance < 1) {
            getTicketPrice()
        }
    }, [userData.account])

    const updateBountyTime = () => {
        if (lastClaimedAt !== 0 && bountyDuration !== 0) {
            setBountyTime(Number(lastClaimedAt) + Number(bountyDuration));
        }
    }

    useEffect(() => {
        updateBountyTime()
    }, [lastClaimedAt, bountyDuration])

    const updateLastClaimedAt = () => {
        if (lastClaimedAt === 0) {
            getMoneyMonkeysBountyNoWallet().methods.LAST_CLAIMED().call()
                .then((res: any) => {
                    setLastClaimedAt(res)
                })
        }
    }

    const updateBountyDuration = () => {
        if (bountyDuration === 0) {
            getMoneyMonkeysBountyNoWallet().methods.BOUNTY_DURATION().call()
                .then((res: any) => {
                    setBountyDuration(res)
                })
        }
    }

    useEffect(() => {
        updateLastClaimedAt()
        updateBountyDuration()
    })

    const buyTicket = () => {
        setTicketPurchaseLoading(true)
        const web3 = new Web3(web3Provider)
        // @ts-ignore
        const bountyContract = new web3.eth.Contract(bountyAbi, getMoneyMonkeysBountyAddress(process.env.NEXT_PUBLIC_CHAIN_ID))
        bountyContract.methods.purchaseTicket().send(
            {
                from: userData.account,
                value: web3.utils.toWei(ticketPrice.toString(), 'ether'),
            }
        ).then((res: any) => {
            notifySuccess('Ticket Purchased Successfully')
            setTicketPurchased(true)
            setTicketPurchaseLoading(false)
        }).catch((error: any) => {
            notifyError('Something went wrong')
            setTicketPurchaseLoading(false)
        })
        setTicketPurchaseLoading(false)
    }

    const claim = () => {
        if (canClaim) {
            if (userData.walletConnected) {
                setIsLoading(true)
                const web3 = new Web3(web3Provider)
                // @ts-ignore
                const bountyContract = new web3.eth.Contract(bountyAbi, getMoneyMonkeysBountyAddress(process.env.NEXT_PUBLIC_CHAIN_ID))
                bountyContract.methods.claim().send({from: userData.account})
                    .then((res: any) => {
                        notifySuccess('Bounty Claimed Successfully.')
                        setIsLoading(false)
                        updateLastClaimedAt()
                        updateBountyDuration()
                    })
                    .catch((error: any) => {
                        notifyError('Bounty Claim Unsuccessfull.')
                        setIsLoading(false)
                    })
            }
        } else {
            notifyError("Can't claim yet")
            setIsLoading(false)
        }
    }

    const timerCallbackHandler = () => {
        setCanClaim(true)
    }

    return (
        <div className={styles.bountyCardWrapper}>
            <div className={styles.bountyCard}>
                <ToastContainer/>
                <p className={styles.bountyCardAnnouncement}>$BANANA Bounty!</p>
                {
                    // @ts-ignore
                    bountyTime > 0 ? <BountyTimer endTs={bountyTime} callback={timerCallbackHandler}></BountyTimer> : null
                }
                {
                    userData.walletConnected ?
                        <>
                            <div className={styles.ezBountyClaimCardButtons}>
                                <p className={styles.bountyCardText}>Be the first one to claim!</p>
                                <button onClick={claim} disabled={isLoading} className={styles.connectWalletButton}>
                                    {
                                        isLoading ? <span>Claiming...</span> :
                                            <span>Claim</span>
                                    }
                                </button>
                            </div>
                            {
                                mmBalance < 1 && !ticketPurchased ?
                                    <div className={styles.ezBountyClaimCardButtons}>
                                        <p className={styles.bountyCardText}>Buy Ticket to be able to claim bounty!</p>
                                        <button onClick={buyTicket} disabled={ticketPurchaseLoading}
                                                className={styles.connectWalletButton}>
                                            {
                                                ticketPurchaseLoading ? <span>Buying...</span> :
                                                    <span>Buy Ticket</span>
                                            }
                                        </button>
                                    </div> : null
                            }
                        </>
                        :
                        <div className={styles.ezBountyClaimCardButtons}>
                            <p className={styles.bountyCardText}>Please connect your wallet to claim!</p>
                        </div>
                }
            </div>
        </div>
    )
}

export default MmBountyCard
