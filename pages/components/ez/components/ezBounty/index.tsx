import React, {useEffect, useState} from 'react';
import {notifyError, notifySuccess} from '../../../../../utils/toast';
import styles from '../../../../../styles/Ez.module.css';
import BountyTimer from './components/Timer';
import {ToastContainer} from 'react-toastify';
import {getBountyNoWallet, getMinterNoWallet} from '../../../../../utils/web3NoWallet';
import {useDispatch, useSelector} from 'react-redux';
import {selectCreateAccountState} from '../../../../../reduxStore/accountSlice';
import Web3 from 'web3';
import bountyAbi from "../../../../../abi/bounty.json"
import {getBountyAddress} from '../../../../../utils/getContractAddress';
import Loader from '../../../loader';

export const EzBountyCard: React.FC = () => {

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
    const [ezBalance, setEzBalance] = useState(0)
    const [ticketPurchased, setTicketPurchased] = useState(false)
    const [ticketPurchaseLoading, setTicketPurchaseLoading] = useState(false)
    const [ticketPrice, setTicketPrice] = useState(0)
    // @ts-ignore
    const [web3NoWallet, setWeb3NoWallet] = useState(new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)) // for fetching info

    const updateEzBalance = () => {
        if (userData.walletConnected) {
            getMinterNoWallet(process.env.NEXT_PUBLIC_CHAIN_ID).methods.balanceOf(userData.account).call()
                .then((res: any) => {
                    setEzBalance(res)
                })
        }
    }

    useEffect(() => {
        updateEzBalance()
    }, [userData.account])

    const checkTicketHolder = () => {
        if (userData.walletConnected) {
            getBountyNoWallet().methods.tickets(userData.account).call()
                .then((res: any) => {
                    setTicketPurchased(res)
                })
        }
    }

    useEffect(() => {
        checkTicketHolder()
    }, [userData.account])

    const getTicketPrice = () => {
        getBountyNoWallet().methods.ticketPrice().call()
            .then((res: any) => {
                // @ts-ignore
                setTicketPrice(web3NoWallet.utils.fromWei(res))
            })
    }

    useEffect(() => {
        if (userData.walletConnected && !ticketPurchased && ezBalance < 1) {
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
            getBountyNoWallet().methods.LAST_CLAIMED().call()
                .then((res: any) => {
                    setLastClaimedAt(res)
                })
        }
    }

    const updateBountyDuration = () => {
        if (bountyDuration === 0) {
            getBountyNoWallet().methods.BOUNTY_DURATION().call()
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
        const bountyContract = new web3.eth.Contract(bountyAbi, getBountyAddress(process.env.NEXT_PUBLIC_CHAIN_ID))
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
            if (error.code === 4001) {
                notifyError('Transaction declined.')
            } else {
                notifyError('Something went wrong, Please try again.')
            }
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
                const bountyContract = new web3.eth.Contract(bountyAbi, getBountyAddress(process.env.NEXT_PUBLIC_CHAIN_ID))
                bountyContract.methods.claim().send({from: userData.account})
                    .then((res: any) => {
                        notifySuccess('Bounty Claimed Successfully.')
                        setIsLoading(false)
                    })
                    .catch((error: any) => {
                        if (error.code === 4001) {
                            notifyError('Transaction declined.')
                        } else {
                            notifyError('Bounty Claim Unsuccessfull.')
                        }
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
                <p className={styles.bountyCardAnnouncement}>$ZMBE Bounty!</p>
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
                                        isLoading ? <Loader/> :
                                            <span>Claim</span>
                                    }
                                </button>
                            </div>
                            {
                                ezBalance < 1 && !ticketPurchased ?
                                    <div className={styles.ezBountyClaimCardButtons}>
                                        <p className={styles.bountyCardText}>Buy Ticket to be able to claim bounty!</p>
                                        <button onClick={buyTicket} disabled={ticketPurchaseLoading}
                                                className={styles.connectWalletButton}>
                                            {
                                                ticketPurchaseLoading ? <Loader/> :
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

export default EzBountyCard
