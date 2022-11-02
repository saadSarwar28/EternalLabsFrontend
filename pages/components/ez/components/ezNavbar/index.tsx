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
import {notifyError, notifyInfo} from '../../../../../utils/toast';
import Modal from 'react-modal';
import styled from 'styled-components';
import foxImage from '../../../../../public/metamask-icon.svg'
import walletConnectImage from '../../../../../public/walletconnect-seeklogo.com.svg'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '25px'
    },
};

const ModalContainer = styled.div`
  padding: 5%;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  border: 2px solid white;
  border-radius: 15px;
`

const Separator = styled.hr`
  color: black;
  width: 80%;
  margin-top: 20px;
  margin-bottom: 20px;
`

const ModalImage = styled.img`
  width: 80%;
  padding: 10%;
  cursor: pointer;
  align-self: center;
`

export const EzNavbar: React.FC = () => {

    const [chainId, setChainId] = useState('0')
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_CHAIN_ID === '56' && chainId !== '0') {
            if (chainId !== '56') {
                notifyError('Please Switch to Binance Smart Chain!')
            }
        }
    }, [chainId])

    const dispatch = useDispatch()

    // @ts-ignore
    const {userData} = useSelector(
        selectCreateAccountState
    )

    const connectMetamaskWallet = () => {
        if (userData.account === '') {
            // @ts-ignore
            if (window.ethereum) {
                // @ts-ignore
                window.ethereum.request({method: 'eth_requestAccounts'})
                    // @ts-ignore
                    .then(result => {
                        closeModal()
                        dispatch(
                            // @ts-ignore
                            updateAccount(result[0])
                        )
                        dispatch(
                            // @ts-ignore
                            updateWeb3Provider(window.ethereum)
                        )
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
    }

    let web3Modal: Web3Modal;
    if (typeof window !== 'undefined') {
        web3Modal = new Web3Modal({
            network: 'mainnet', // optional
            cacheProvider: true,
            providerOptions, // required
        })
    }

    const openWalletConnect = () => {
        closeModal()
        walletConnect()
    }

    const walletConnect = useCallback(async function () {
        try {
            const provider = new WalletConnectProvider({
                rpc: {
                    // @ts-ignore
                    56: process.env.NEXT_PUBLIC_BINANCE_RPC,
                    // @ts-ignore
                    97: process.env.NEXT_PUBLIC_BINANCE_RPC,
                },
                qrcodeModalOptions: {
                    desktopLinks: [
                        'ledger',
                        'tokenary',
                        'wallet',
                        'wallet 3',
                        'secuX',
                        'ambire',
                        'wallet3',
                        'apolloX',
                        'zerion',
                        'sequence',
                        'punkWallet',
                        'kryptoGO',
                        'nft',
                        'riceWallet',
                        'vision',
                        'keyring'
                    ],
                    mobileLinks: [
                        "rainbow",
                        "metamask",
                        "argent",
                        "trust",
                        "imtoken",
                        "pillar",
                    ],
                },
            });

            //  Enable session (triggers QR Code modal)
            await provider.enable();
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
                updateWeb3Provider(provider)
            )
            setChainId(String(network.chainId))
        } catch (e: any) {
            console.log(e.toString(), ' <<< ')
        }

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
            window.localStorage.removeItem('walletconnect')
            window.localStorage.removeItem('WEB3_CONNECT_CACHED_PROVIDER')
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
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <ModalContainer>
                    <ModalImage src={foxImage.src} alt="metamask" onClick={connectMetamaskWallet}/>
                    <Separator/>
                    <ModalImage src={walletConnectImage.src} alt="wallet connect" onClick={openWalletConnect}/>
                </ModalContainer>
            </Modal>
            <div className={styles.logoWrapper}>
                <img
                    src="/EternalLabs_Logo_V2_without_text.svg"
                    alt="EternalLabs"
                    className={styles.logo}
                />
            </div>
            <button className={styles.hamburger} onClick={toggleNavBar}>
                <img src="/icons8-menu-squared-96.svg" style={{height: '50px'}}/>
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
                                    <button onClick={openModal} className={styles.connectWalletButtonNav}>Connect
                                        Wallet</button>
                            }
                        </li> : null
                }
            </ul>
            {
                userData.walletConnected ? <button className={styles.docsButtonNav} title="Click to disconnect"
                                                   onClick={disconnect}>{userData?.account.slice(0, 4) + "..." + userData?.account.slice(38, 42)}</button> :
                    <button onClick={openModal} className={styles.docsButtonNav}>Connect Wallet</button>
            }
        </nav>
    )
}

export default EzNavbar;
