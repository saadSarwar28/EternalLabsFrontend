import styles from '../../../../../styles/Ez.module.css';
import {isMobile} from 'react-device-detect';
import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {notifyError, notifyInfo} from '../../../../../utils/toast';
import Web3 from 'web3';
import {selectCreateAccountState, updateAccount, updateWeb3Provider} from '../../../../../reduxStore/accountSlice';
import {useDispatch, useSelector} from 'react-redux';


export const EzNavbar: React.FC = () => {

    const dispatch = useDispatch()

    // @ts-ignore
    const {userData} = useSelector(
        selectCreateAccountState
    )

    const connectWallet = () => {
        if (userData.account === '') {
            // @ts-ignore
            if (window.ethereum) {
                // @ts-ignore
                window.ethereum.request({method: 'eth_requestAccounts'})
                    // @ts-ignore
                    .then(result => {
                        dispatch(
                            // @ts-ignore
                            updateAccount(result[0])
                        )
                        dispatch(
                            // @ts-ignore
                            updateWeb3Provider(window.ethereum)
                        )
                        // @ts-ignore
                        // store.dispatch(updateAccount(result[0]))
                        // store.dispatch(updateWalletConnected(true))
                        // // @ts-ignore
                        // store.dispatch(updateWeb3Provider(window.ethereum))
                        // store.dispatch(updateWeb3WithWallet(new Web3(web3Provider())))
                    })
                    // @ts-ignore
                    .catch(error => {
                        notifyError('Please connect your wallet to interact with this website')
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
                    src="/EZLogo1.png"
                    alt="Eternal Zombies"
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
                userData.walletConnected ? <button className={styles.docsButtonNav}
                                                   disabled>{userData?.account.slice(0, 4) + "..." + userData?.account.slice(38, 42)}</button> :
                    <button onClick={connectWallet} className={styles.docsButtonNav}>Connect Wallet</button>
            }
        </nav>
    )
}

export default EzNavbar;
