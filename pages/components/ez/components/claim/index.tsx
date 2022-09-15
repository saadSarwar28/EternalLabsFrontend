import React, {useEffect, useState} from 'react';
import Web3 from 'web3';
import {notifyError, notifyInfo, notifySuccess} from '../../../../../utils/toast';
import {getDistributorAddress, getMinterAddress} from '../../../../../utils/getContractAddress';
import {getMerkleProof} from '../../../../../utils/merkleProof';
import styles from '../../../../../styles/Ez.module.css';
import {isMobile} from 'react-device-detect';
import minterABI from '../../../../../abi/minter.json';
import distributorABI from '../../../../../abi/distributor.json'
import {getMinterNoWallet} from '../../../../../utils/web3NoWallet';
import {weiToNumber} from '../../../../../utils/units';

export const EzClaimCard = () => {

    const [balance, setBalance] = useState(0)
    const [pendingZmbe, setPendingZmbe] = useState(0)
    const [missingCycleEarnings, setMissingCycleEarnings] = useState(0)
    const [address, setAddress] = useState('')
    const [walletConnected, setWalletConnected] = useState(false)
    const [chainID, setChainId] = useState(process.env.NEXT_PUBLIC_CHAIN_ID)
    const [provider, setProvider] = useState(null)
    const [web3WithWallet, setWeb3WithWallet] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [tokenIds, setTokenIds] = useState([])

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
                    setAddress(result[0])
                    setWalletConnected(true)
                });
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

    const updateWeb3 = () => {
        if (provider !== null) {
            // @ts-ignore
            setWeb3WithWallet(new Web3(provider))
        }
    }

    useEffect(() => {
        updateWeb3()
    }, [provider])

    useEffect(() => {
        // @ts-ignore
        if (window.ethereum && web3WithWallet !== null) {
            // @ts-ignore
            web3WithWallet.eth.getChainId().then(res => {
                setChainId(res.toString())
            })
        }
    }, [web3WithWallet])

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_CHAIN_ID === '56') {
            if (!(chainID === '56') && chainID !== '0') {
                notifyError("Please switch to Binance Smart Chain Main net.")
            }
        }
    }, [chainID])

    const getDistributorWithWallet = () => {
        if (walletConnected && web3WithWallet !== null) {
            // @ts-ignore
            return new web3WithWallet.eth.Contract(distributorABI, getDistributorAddress(chainID))
        }
    }

    // const updatePendingZmbe = () => {
    //     let totalZmbe = 0;
    //     tokenIds.forEach(token => {
    //         // @ts-ignore
    //         getDistributorWithWallet(token).methods.calculateEarnings().call({'from': address}).then((res: any) => {
    //             // console.log(weiToNumber(res, 18), ' < pending earnings')
    //             totalZmbe += Number(weiToNumber(res, 18))
    //         })
    //     })
    // }
    //
    // useEffect(() => {
    //         updatePendingZmbe()
    // }, [tokenIds])
    //
    // const calculateMissingCycleEarnings = () => {
    //     getDistributorWithWallet().methods.calculateMissingCycleEarnings().call({'from': address}).then((res: any) => {
    //         // @ts-ignore
    //         setMissingCycleEarnings(weiToNumber(res, 18))
    //     })
    // }
    //
    // useEffect(() => {
    //     if (web3WithWallet !== null) {
    //         calculateMissingCycleEarnings()
    //     }
    // }, [web3WithWallet])

    const updateBalance = () => {
        if (walletConnected && address !== '') {
            getMinterNoWallet(chainID).methods.balanceOf(address).call()
                .then((res: any) => {
                    setBalance(res)
                    // for (let i = 0; i < Number(res.toString()); i++) {
                    //     // @ts-ignore
                    //     getMinterNoWallet().methods.tokenOfOwnerByIndex(address, i).call()
                    //         .then((res: any) => {
                    //             // @ts-ignore
                    //             setTokenIds(tokenIds => [...tokenIds, res.toString()])
                    //         })
                    // }
                })
        }
    }

    useEffect(() => {
        updateBalance()
    }, [address])

    const claimAll = () => {
        setIsLoading(true)
        try {
            if (walletConnected) {
                if (balance < 1) {
                    notifyError('You do not have any EZ token in your wallet. Consider purchasing some')
                    setIsLoading(false)
                    return
                }
                getDistributorWithWallet().methods.claimAll().send({
                    'from': address,
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
            <p className={styles.mintCardAnnouncement}>Claim Your Earned ZMBE here</p>

            <div className={styles.mintCardAmounts}>
                <div className={styles.mintCardNormalPrice}>
                    <p className={styles.mintCardTotalMinted}>Your Balance</p>
                    <p className={styles.mintCardTotalMinted}>{balance} EZ</p>
                </div>
                {/*<div className={styles.mintCardWhitelistPrice}>*/}
                {/*    <p className={styles.mintCardTotalMinted}>Pending ZMBE</p>*/}
                {/*    <p className={styles.mintCardTotalMinted}>{pendingZmbe} ZMBE</p>*/}
                {/*</div>*/}
            </div>
            {
                walletConnected ?
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
                        <button className={styles.connectWalletButton}
                                onClick={connectWallet}>Connect Wallet
                        </button>
                    </div>
            }
        </div>
    )
}

export default EzClaimCard
