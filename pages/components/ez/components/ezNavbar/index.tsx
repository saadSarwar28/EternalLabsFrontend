import styles from '../../../../../styles/Ez.module.css';
import {isMobile} from 'react-device-detect';
import React, {useCallback, useEffect, useState} from 'react';
import Link from 'next/link';
import Web3 from 'web3';
import {
    disconnectWallet,
    selectCreateAccountState,
    updateAccount,
    updateWeb3Provider
} from '../../../../../reduxStore/accountSlice';
import {useDispatch, useSelector} from 'react-redux';
import Web3Modal from 'web3modal'
import {providers} from 'ethers'
import WalletConnectProvider from '@walletconnect/web3-provider'

const INFURA_ID = '2DdCy0FfJLSBU4CS7yPxYpBiy8I'

export const EzNavbar: React.FC = () => {

    const dispatch = useDispatch()

    // @ts-ignore
    const {userData} = useSelector(
        selectCreateAccountState
    )

    // const connectWallet = () => {
    //     if (userData.account === '') {
    //         // @ts-ignore
    //         if (window.ethereum) {
    //             // @ts-ignore
    //             window.ethereum.request({method: 'eth_requestAccounts'})
    //                 // @ts-ignore
    //                 .then(result => {
    //                     dispatch(
    //                         // @ts-ignore
    //                         updateAccount(result[0])
    //                     )
    //                     dispatch(
    //                         // @ts-ignore
    //                         updateWeb3Provider(window.ethereum)
    //                     )
    //                     // @ts-ignore
    //                     // store.dispatch(updateAccount(result[0]))
    //                     // store.dispatch(updateWalletConnected(true))
    //                     // // @ts-ignore
    //                     // store.dispatch(updateWeb3Provider(window.ethereum))
    //                     // store.dispatch(updateWeb3WithWallet(new Web3(web3Provider())))
    //                 })
    //                 // @ts-ignore
    //                 .catch(error => {
    //                     notifyError('Please connect your wallet to interact with this website')
    //                 });
    //         } else {
    //             // for mobile
    //             if (isMobile) {
    //                 window.open('https://metamask.app.link/dapp/eternalzombies.com')
    //             } else {
    //                 notifyInfo('Please Install metamask first.')
    //             }
    //         }
    //     }
    // }

    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider, // required
            options: {
                // infuraId: INFURA_ID, // required
                rpc: process.env.NEXT_PUBLIC_BINANCE_RPC,
                bridge: 'https://bridge.walletconnect.org',
                qrcode: true,
            },
        },
        // 'custom-walletlink': {
        //     display: {
        //         logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
        //         name: 'Coinbase',
        //         description: 'Connect to Coinbase Wallet (not Coinbase App)',
        //     },
        //     options: {
        //         appName: 'Coinbase', // Your app name
        //         networkUrl: `https://mainnet.infura.io/v3/`,
        //         chainId: 1,
        //     },
        //     package: WalletLink,
        //     connector: async (_, options) => {
        //         const { appName, networkUrl, chainId } = options
        //         const walletLink = new WalletLink({
        //             appName,
        //         })
        //         const provider = walletLink.makeWeb3Provider(networkUrl, chainId)
        //         await provider.enable()
        //         return provider
        //     },
        // },
    }

    let web3Modal: Web3Modal;
    if (typeof window !== 'undefined') {
        web3Modal = new Web3Modal({
            network: 'mainnet', // optional
            cacheProvider: true,
            providerOptions, // required
        })
    }

    const connectWallet = useCallback(async function () {
        // This is the initial `provider` that is returned when
        // using web3Modal to connect. Can be MetaMask or WalletConnect.
        const provider = await web3Modal.connect()

        // We plug the initial `provider` into ethers.js and get back
        // a Web3Provider. This will add on methods from ethers.js and
        // event listeners such as `.on()` will be different.
        const web3Provider = new providers.Web3Provider(provider)

        const signer = web3Provider.getSigner()
        const address = await signer.getAddress()

        const network = await web3Provider.getNetwork()

        dispatch(
            // @ts-ignore
            updateAccount(address)
        )
        dispatch(
            // @ts-ignore
            updateWeb3Provider(network)
        )

        console.log(network.chainId, ' <<< chain id')

        // dispatch({
        //     type: 'SET_WEB3_PROVIDER',
        //     provider,
        //     web3Provider,
        //     address,
        //     chainId: network.chainId,
        // })
    }, [])

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
                    if (result.length > 0) {
                        dispatch(
                            // @ts-ignore
                            updateAccount(result[0]),
                        )
                        dispatch(
                            // @ts-ignore
                            updateWeb3Provider(window.ethereum)
                        )
                    }
                });
        }
    }

    const disconnect = useCallback(
        async function () {
            await web3Modal.clearCachedProvider()
            // @ts-ignore
            dispatch(disconnectWallet())
        },
        []
    )

    useEffect(() => {
        checkWalletAlreadyConnected()
    }, [])

    // useEffect(() => {
    //     if (process.env.NEXT_PUBLIC_CHAIN_ID === '56') {
    //         if (!(chainId() === 56) && chainId() !== 0) {
    //             notifyError("Please switch to Binance Smart Chain Main net.")
    //         }
    //     }
    // }, [chainId()])
    //
    // useEffect(() => {
    //     if (web3Provider() !== null) {
    //         // @ts-ignore
    //         web3WithWallet().eth.getChainId().then(res => {
    //             store.dispatch(updateChainId(res))
    //         })
    //     }
    // }, [web3Provider()])

    const [isNavExpanded, setIsNavExpanded] = useState(false)

    const toggleNavBar = () => {
        setIsNavExpanded(!isNavExpanded)
    }

    const closeNavBar = () => {
        setIsNavExpanded(false)
    }

    return (
        <nav className={styles.nav}>
            <div className={styles.logoWrapper}>
                <img
                    src="/EternalLabs_Logo_V2_without_text.svg"
                    alt="EternalLabs"
                    className={styles.logo}
                />
            </div>
            <button className={styles.hamburger} onClick={toggleNavBar}>
                <img src="/menu.png"/>
            </button>
            <ul className={isNavExpanded ? styles.navListMobile : styles.navList}>
                <li className={styles.navLinks} onClick={closeNavBar}><Link href="/#home"><a>Back to Home</a></Link>
                </li>
                {
                    isMobile ?
                        <li className={styles.navLinks} onClick={closeNavBar}>
                            {
                                userData.walletConnected ? <button className={styles.connectWalletButtonNav}
                                                                   disabled>{userData?.account.slice(0, 4) + "..." + userData?.account.slice(38, 42)}</button> :
                                    <button onClick={connectWallet} className={styles.connectWalletButtonNav}>Connect
                                        Wallet</button>
                            }
                        </li> : null
                }
            </ul>
            {
                userData.walletConnected ? <button className={styles.docsButtonNav} title="Click to disconnect"
                                                   onClick={disconnect}>{userData?.account.slice(0, 4) + "..." + userData?.account.slice(38, 42)}</button> :
                    <button onClick={connectWallet} className={styles.docsButtonNav}>Connect Wallet</button>
            }
        </nav>
    )
}

export default EzNavbar;
