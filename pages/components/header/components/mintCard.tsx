import styles from '../../../../styles/Home.module.css';
import React, {useEffect, useState} from 'react';
import WHITELIST from '../../../../utils/whitelist';
import keccak256 from 'keccak256';
import {MerkleTree} from 'merkletreejs';
import Web3 from 'web3';
import {isMobile} from 'react-device-detect';
import {notifyError, notifyInfo, notifySuccess} from '../../../../utils/toast';
import minterABI from '../../../../abi/minter.json';
import {getMinterAddress} from '../../../../utils/getContractAddress';
import {getMerkleProof} from '../../../../utils/merkleProof';

export const MintCard = () => {


    const [balance, setBalance] = useState(0)
    const [address, setAddress] = useState('')
    const [walletConnected, setWalletConnected] = useState(false)
    const [price, setPrice] = useState(0)
    const [whitelistPrice, setWhitelistPrice] = useState(0)
    const [amount, setAmount] = useState(1)
    const [chainID, setChainId] = useState(process.env.NEXT_PUBLIC_CHAIN_ID)
    const [provider, setProvider] = useState(null)
    const [web3WithWallet, setWeb3WithWallet] = useState(null)
    const [totalMinted, setTotalMinted] = useState(0)
    const [whitelistActive, setWhitelistActive] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isWlLoading, setIsWlLoading] = useState(false)
    // @ts-ignore
    const [web3NoWallet, setWeb3] = useState(new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)) // for fetching info

    const updateWeb3 = () => {
        if (provider !== null) {
            // @ts-ignore
            setWeb3WithWallet(new Web3(provider))
        }
    }

    useEffect(() => {
        updateWeb3()
    }, [provider])

    const connectWallet = () => {
        if (address === '') {
            // @ts-ignore
            if (window.ethereum) {
                // @ts-ignore
                window.ethereum.request({method: 'eth_requestAccounts'})
                    // @ts-ignore
                    .then(result => {
                        // @ts-ignore
                        setAddress(result[0])
                        setWalletConnected(true)
                    })
                    // @ts-ignore
                    .catch(error => {
                        console.log(error)
                    });
            } else {
                // for mobile
                if (isMobile) {
                    window.open('https://metamask.app.link/dapp/eternalzombies.com')
                } else {
                    notifyInfo('Please Install metamask first.')
                }
            }
        }
    }

    const checkWalletAlreadyConnected = () => {
        // @ts-ignore
        if (window.ethereum) {
            // Check if browser is running Metamask
            let web3: any;
            // @ts-ignore
            if (window.ethereum) {
                // @ts-ignore
                web3 = new Web3(window.ethereum);
                // @ts-ignore
            } else if (window.web3) {
                // @ts-ignore
                web3 = new Web3(window.web3.currentProvider);
            }

            // Check if User is already connected by retrieving the accounts
            web3.eth.getAccounts()
                .then((result: any) => {
                    console.log(result[0], ' < result')
                    setAddress(result[0])
                    setWalletConnected(true)
                });
            // async (addr: string) => {
            //     setAddress(addr[0])
            //     setWalletConnected(true)
            // });
        }
    }

    useEffect(() => {
        checkWalletAlreadyConnected()
    }, [])

    const updateProvider = () => {
        // @ts-ignore
        if (window.ethereum && address !== '') {
            // @ts-ignore
            setProvider(window.ethereum)
        }
    }

    useEffect(() => {
        updateProvider()
    }, [address])

    const increaseAmount = () => {
        setAmount(amount + 1)
    }

    const decreaseAmount = () => {
        if (amount > 1) {
            setAmount(amount - 1)
        }
    }

    useEffect(() => {
        // @ts-ignore
        if (window.ethereum && web3WithWallet !== null) {
            // @ts-ignore
            web3WithWallet.eth.getChainId().then(res => {
                setChainId(res.toString())
            })
        }
    }, [address])

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_CHAIN_ID === '56') {
            if (!(chainID === '56') && chainID !== '0') {
                notifyError("Please switch to Binance Smart Chain Main net.")
            }
        }
    }, [chainID])

    const getMinterWithWallet = () => {
        if (walletConnected && web3WithWallet !== null) {
            // @ts-ignore
            return new web3WithWallet.eth.Contract(minterABI, getMinterAddress(chainID))
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
    }, [provider])

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
    }, [provider])

    function updateTotalSupply() {
        getMinterNoWallet().methods.totalSupply().call()
            .then((res: any) => {
                setTotalMinted(Number(res.toString()))
            })
    }

    useEffect(() => {
        updateTotalSupply()
    }, [provider])

    const updateBalance = () => {
        // @ts-ignore
        if (walletConnected && address !== '') {
            console.log(address, ' < address')
            // @ts-ignore
            // web3NoWallet.eth.getBalance(address)
            //     // @ts-ignore
            //     .then(res => {
            //         setBalance(Number(web3NoWallet.utils.fromWei(res)))
            //     })
        }
    }

    useEffect(() => {
        updateBalance()
    }, [address])

    const mint = () => {
        try {
            if (walletConnected) {
                if (balance < (amount * price)) {
                    notifyError('Not enough balance')
                    return
                }
                setIsLoading(true)
                const total = amount * price
                // @ts-ignore
                getMinterWithWallet().methods.mint(amount).send({
                    'from': address,
                    // @ts-ignore
                    value: web3WithWallet.utils.toWei(total.toString(), 'ether'),
                    // @ts-ignore
                    // gasPrice: web3WithWallet.utils.toWei('5', 'gwei')
                })
                    // @ts-ignore
                    .then(res => {
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
        if (getMerkleProof(address).length < 1) {
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
                getMinterWithWallet().methods.whitelistClaimed(address).call()
                    // @ts-ignore
                    .then(res => {
                        if (!res) {
                            getMinterWithWallet().methods.whitelistMint(getMerkleProof(address)).send({
                                from: address,
                                // @ts-ignore
                                value: web3WithWallet.utils.toWei(whitelistPrice.toString(), 'ether'),
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
                walletConnected ?
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
                                                  src="https://i.pinimg.com/originals/a6/21/0f/a6210fd59c68852a3143ccde924e6cf2.gif" alt="loading"/> :
                                    <span>Mint</span>}
                            </button>
                            {
                                whitelistActive ?
                                    <button onClick={whitelistMint}
                                            className={styles.connectWalletButton}>
                                        {
                                            isWlLoading ?
                                                <img className={styles.mintCardButtonLoader}
                                                     src="https://i.pinimg.com/originals/a6/21/0f/a6210fd59c68852a3143ccde924e6cf2.gif" alt="loading"/>
                                                : <span>Whitelist Mint</span>
                                        }
                                    </button> : null
                            }
                        </div>
                    </>
                    :
                    <div className={styles.mintCardButtons}>
                        <button className={styles.connectWalletButton}
                                onClick={connectWallet}>Connect Wallet
                        </button>
                    </div>
            }
        </div>
    )
}
