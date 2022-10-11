import styles from '../../../../../styles/Ez.module.css';
import React, {useEffect, useState} from 'react';
import Web3 from 'web3';
import {notifyError, notifyInfo, notifySuccess} from '../../../../../utils/toast';
import minterABI from '../../../../../abi/minter.json';
import {getMinterAddress} from '../../../../../utils/getContractAddress';
import {getMerkleProof} from '../../../../../utils/merkleProof';
import {ToastContainer} from 'react-toastify';
import {weiToNumber} from '../../../../../utils/units';
import {useDispatch, useSelector} from 'react-redux';
import {selectCreateAccountState} from '../../../../../reduxStore/accountSlice';

export const EcMintCard = () => {

    const dispatch = useDispatch()

    // @ts-ignore
    const {userData, web3Provider} = useSelector(
        selectCreateAccountState
    )

    const [balance, setBalance] = useState(0)
    const [chainID, setChainId] = useState(process.env.NEXT_PUBLIC_CHAIN_ID)
    const [price, setPrice] = useState(0)
    const [whitelistPrice, setWhitelistPrice] = useState(0)
    const [amount, setAmount] = useState(1)
    const [totalMinted, setTotalMinted] = useState(0)
    const [whitelistActive, setWhitelistActive] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isWlLoading, setIsWlLoading] = useState(false)
    // @ts-ignore
    const [web3NoWallet, setWeb3NoWallet] = useState(new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)) // for fetching info

    const increaseAmount = () => {
        setAmount(amount + 1)
    }

    const decreaseAmount = () => {
        if (amount > 1) {
            setAmount(amount - 1)
        }
    }

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_CHAIN_ID === '56') {
            if (!(chainID === '56') && chainID !== '0') {
                notifyError("Please switch to Binance Smart Chain Main net.")
            }
        }
    }, [chainID])

    const getMinterWithWallet = () => {
        if (userData.walletConnected) {
            const web3 = new Web3(web3Provider)
            // @ts-ignore
            return new web3.eth.Contract(minterABI, getMinterAddress(chainID))
        }
    }

    const getMinterNoWallet = () => {
        // @ts-ignore
        return new web3NoWallet.eth.Contract(minterABI, getMinterAddress(chainID))
    }

    function updateMintPrice() {
        getMinterNoWallet().methods.nftPrice().call().then((res: any) => {
            setPrice(Number(web3NoWallet.utils.fromWei(res)) * amount)
        })
    }

    useEffect(() => {
        updateMintPrice()
    }, [])

    function updateWhitelistPrice() {
        if (whitelistActive) {
            // @ts-ignore
            getMinterNoWallet().methods.whitelistPrice().call()
                .then((res: any) => {
                    setWhitelistPrice(Number(web3NoWallet.utils.fromWei(res)) * amount)
                })
        }
    }

    useEffect(() => {
        updateWhitelistPrice()
    }, [whitelistActive])

    function checkWhitelistActive() {
        // @ts-ignore
        getMinterNoWallet().methods.whitelistActive().call()
            .then((res: any) => {
                setWhitelistActive(res)
            })
    }

    useEffect(() => {
        checkWhitelistActive()
    }, [])

    function updateTotalSupply() {
        getMinterNoWallet().methods.totalSupply().call()
            .then((res: any) => {
                setTotalMinted(Number(res.toString()))
            })
    }

    useEffect(() => {
        updateTotalSupply()
    }, [])

    const updateBalance = () => {
        // @ts-ignore
        if (userData.walletConnected) {
            // @ts-ignore
            web3NoWallet.eth.getBalance(userData.account)
                .then((res: any) => {
                    // @ts-ignore
                    setBalance(weiToNumber(res, 3))
                })
        }
    }

    useEffect(() => {
        updateBalance()
    }, [userData.walletConnected])

    const mint = () => {
        try {
            if (userData.walletConnected) {
                if (balance < (amount * price)) {
                    notifyError('Not enough balance')
                    return
                }
                setIsLoading(true)
                const total = amount * price
                const web3 = new Web3(web3Provider)
                // @ts-ignore
                const minterContract = new web3.eth.Contract(minterABI, getMinterAddress(chainID))
                minterContract.methods.mint(amount).send({
                    'from': userData.account,
                    // @ts-ignore
                    value: web3.utils.toWei(total.toString(), 'ether'),
                    // @ts-ignore
                    // gasPrice: web3WithWallet.utils.toWei('5', 'gwei')
                })
                    // @ts-ignore
                    .then(res => {
                        console.log(' in mint')
                        updateTotalSupply()
                        notifySuccess('Minted Successfully')
                        setIsLoading(false)
                    })
            }
        } catch (error) {
            // console.log(error)
            setIsLoading(false)
        }
    }

    const whitelistMint = () => {
        if (getMerkleProof(userData.account).length < 1) {
            notifyError('Your Address is not whitelisted!')
            return
        }
        try {
            // @ts-ignore
            if (window.ethereum) {
                if (balance < whitelistPrice) {
                    notifyError('Not enough balance')
                    return
                }
                setIsWlLoading(true)
                const web3 = new Web3(web3Provider)
                // @ts-ignore
                const minterContract = new web3.eth.Contract(minterABI, getMinterAddress(chainID))
                // @ts-ignore
                minterContract.methods.whitelistClaimed(userData.account).call()
                    // @ts-ignore
                    .then(res => {
                        if (!res) {
                            // @ts-ignore
                            minterContract.methods.whitelistMint(getMerkleProof(userData.account)).send({
                                from: userData.account,
                                // @ts-ignore
                                value: web3.utils.toWei(whitelistPrice.toString(), 'ether'),
                                // @ts-ignore
                                // gasPrice: web3WithWallet.utils.toWei('5', 'gwei')
                            })
                                // @ts-ignore
                                .then(res => {
                                    updateTotalSupply()
                                    notifySuccess('Minted Successfully')
                                    setIsWlLoading(false)
                                    updateTotalSupply()
                                })
                        } else {
                            notifyError('Already Claimed!')
                            setIsWlLoading(false)
                        }
                    })
            }
        } catch (e) {
            setIsWlLoading(false)
            notifyError('Already Claimed!')
        }
    }

    return (
        <div className={styles.mintCard}>
            <ToastContainer/>
            <p className={styles.mintCardAnnouncement}>Eternal Zombies mint is Live!</p>
            <p className={styles.mintCardTotalMinted}>{totalMinted} / 1111</p>
            <div className={styles.mintCardAmounts}>
                <div className={styles.mintCardNormalPrice}>
                    <p className={styles.mintCardTotalMinted}>Price</p>
                    <p className={styles.mintCardTotalMinted}>{price.toFixed(2)} BNB</p>
                </div>
                {
                    whitelistActive ?
                        <div className={styles.mintCardWhitelistPrice}>
                            <p className={styles.mintCardTotalMinted}>Whitelist Price</p>
                            <p className={styles.mintCardTotalMinted}>{whitelistPrice.toFixed(2)} BNB</p>
                        </div> : null
                }
            </div>
            {
                userData.walletConnected ?
                    <>
                        <div className={styles.mintCardAmountAdjustment}>
                            <p className={styles.mintCardTotalMinted}>Amount</p>
                            <div className={styles.mintCardAmountAdjustmentButtonContainer}>
                                <button onClick={decreaseAmount}
                                        className={styles.amountAdjustmentButton}>-
                                </button>
                                <p className={styles.mintCardTotalMinted}>&nbsp;&nbsp;&nbsp;{amount}&nbsp;&nbsp;&nbsp;</p>
                                <button onClick={increaseAmount}
                                        className={styles.amountAdjustmentButton}>+
                                </button>
                            </div>
                        </div>
                        <div className={styles.mintCardWhitelistPrice}>
                            <p className={styles.mintCardTotalMinted}>Total</p>
                            <p className={styles.mintCardTotalMinted}>{(price * amount).toFixed(2)} BNB</p>
                        </div>
                        <div className={styles.mintCardMintButtons}>
                            <button onClick={mint} className={styles.connectWalletButton}>
                                {isLoading ? <img className={styles.mintCardButtonLoader}
                                                  src="https://i.pinimg.com/originals/a6/21/0f/a6210fd59c68852a3143ccde924e6cf2.gif"
                                                  alt="loading"/> :
                                    <span>Mint</span>}
                            </button>
                            {
                                whitelistActive ?
                                    <button onClick={whitelistMint}
                                            className={styles.connectWalletButton}>
                                        {
                                            isWlLoading ?
                                                <img className={styles.mintCardButtonLoader}
                                                     src="https://i.pinimg.com/originals/a6/21/0f/a6210fd59c68852a3143ccde924e6cf2.gif"
                                                     alt="loading"/>
                                                : <span>Whitelist Mint</span>
                                        }
                                    </button> : null
                            }
                        </div>
                    </>
                    :
                    <div className={styles.mintCardButtons}>
                        <p className={styles.mintCardAnnouncement}>Please Connect your wallet to mint!</p>
                    </div>
            }
        </div>
    )
}

export default EcMintCard;