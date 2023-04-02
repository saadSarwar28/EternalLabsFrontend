import React, {useCallback, useEffect, useState} from 'react';
import styles from '../../../styles/Bounty.module.css';
import BountyTimer from './components/Timer';
import {ToastContainer} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import bountyAbi from '../../../abi/bounty.json'
import bountyTicketsAbi from '../../../abi/bountyTickets.json'
import Web3 from 'web3';
import {
    disconnectWallet,
    selectCreateAccountState,
    updateAccount,
    updateWeb3Provider
} from '../../../reduxStore/accountSlice';
import {
    getBountyNoWallet,
    getBountyTicketsNoWallet, getCakeNoWallet, getDrFrankensteinNoWallet,
    getMinterNoWallet,
    getPancakeMasterchefNoWallet, getRewardApeNoWallet, getZmbeNoWallet
} from '../../../utils/web3NoWallet';
import {
    getBountyAddress, getBountyTicketsAddress,
    getEternalCakesStakerAddress,
    getMoneyMonkeysStakerAddress,
    getStakerAddress
} from '../../../utils/getContractAddress';
import {notifyError, notifyInfo, notifySuccess} from '../../../utils/toast';
import Loader from '../loader';
import {isMobile} from 'react-device-detect';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';
import {ethers, providers} from 'ethers';
import foxImage from '../../../public/metamask-icon.svg';
import walletConnectImage from '../../../public/walletconnect-seeklogo.com.svg';
import Modal from 'react-modal';
import styled from 'styled-components';
import CONSTANTS from '../../../utils/constants';

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
  width: 100%;
  border: 2px solid #b6bab8;
  border-radius: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
`

const ModalImage = styled.img`
  width: 80%;
  max-width: 250px;
  padding: 5%;
  cursor: pointer;
  align-self: center;
`

export const EzBountyCard: React.FC = () => {

    // const dispatch = useDispatch()

    // @ts-ignore
    const {userData, web3Provider} = useSelector(
        selectCreateAccountState
    )

    const [zmbe, setZmbe] = useState(0)
    const [cake, setCake] = useState(0)
    const [banana, setBanana] = useState(0)
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
    const [chainId, setChainId] = useState('0')
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [timeoutSet, setTimeoutSet] = useState(false)

    const updateCakeAmount = async () => {
        const masterchef = getPancakeMasterchefNoWallet(process.env.NEXT_PUBLIC_CHAIN_ID)
        const cakePending = await masterchef.methods.pendingCake(CONSTANTS.CAKE_POOL_ID, CONSTANTS.ETERNAL_CAKES_FARM_BOOSTER_PROXY).call()
        const cakeContract = getCakeNoWallet(process.env.NEXT_PUBLIC_CHAIN_ID)
        const cakeInStaker = await cakeContract.methods.balanceOf(getEternalCakesStakerAddress(process.env.NEXT_PUBLIC_CHAIN_ID)).call()
        const totalCake = Number(ethers.utils.formatUnits(cakePending)) + Number(ethers.utils.formatUnits(cakeInStaker))
        const amount = totalCake - ((totalCake * 12) / 100)
        setCake((amount * 50) / 100)
    }

    const updateZmbeAmount = async () => {
        const frankenstein = getDrFrankensteinNoWallet(process.env.NEXT_PUBLIC_CHAIN_ID)
        const zmbePending = await frankenstein.methods.pendingZombie(CONSTANTS.EZ_POOL_ID, getStakerAddress(process.env.NEXT_PUBLIC_CHAIN_ID)).call()
        const zmbeContract = getZmbeNoWallet(process.env.NEXT_PUBLIC_CHAIN_ID)
        const zmbeInStaker = await zmbeContract.methods.balanceOf(getStakerAddress(process.env.NEXT_PUBLIC_CHAIN_ID)).call()
        const totalZmbe = Number(ethers.utils.formatUnits(zmbePending)) + Number(ethers.utils.formatUnits(zmbeInStaker))
        const amount = totalZmbe - ((totalZmbe * 13) / 100)
        setZmbe((amount * 50) / 100)
    }

    const updateBananaAmount = () => {
        getRewardApeNoWallet(process.env.NEXT_PUBLIC_CHAIN_ID).methods.pendingReward(getMoneyMonkeysStakerAddress(process.env.NEXT_PUBLIC_CHAIN_ID)).call()
            .then((res: any) => {
                setBanana((Number(ethers.utils.formatUnits(res)) * 40) / 100)
            })
    }

    useEffect(() => {
        if (!timeoutSet) {
            setInterval(() => {
                updateCakeAmount()
                updateZmbeAmount()
                updateBananaAmount()
            }, 3000)
            setTimeoutSet(true)
        }
    })

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
                    window.open('https://metamask.app.link/dapp/eternallabs.finance')
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
            getBountyNoWallet().methods.checkClaimable(userData.account).call()
                .then((res: any) => {
                    setTicketPurchased(res)
                })
        }
    }

    useEffect(() => {
        checkTicketHolder()
    }, [userData.account])

    const getTicketPrice = () => {
        getBountyTicketsNoWallet().methods.ticketPrice().call()
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
        const bountyTicketsContract = new web3.eth.Contract(bountyTicketsAbi, getBountyTicketsAddress(process.env.NEXT_PUBLIC_CHAIN_ID))
        bountyTicketsContract.methods.mint(userData.account).send(
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
                        updateLastClaimedAt()
                        updateBountyDuration()
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

    const [_isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(isMobile)
    }, [])

    return (
        <div className={styles.bountyCardWrapper}>
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Connect Wallet"
                ariaHideApp={false}
            >
                <ModalContainer>
                    <ModalImage src="/metamaskIcon.png" alt="metamask" onClick={connectMetamaskWallet}/>
                    <Separator/>
                    <ModalImage src="/walletconnect-seeklogo.com.svg" alt="wallet connect" onClick={openWalletConnect}/>
                </ModalContainer>
            </Modal>
            <div className={styles.bountyCard}>
                <ToastContainer/>
                <p className={styles.bountyCardAnnouncement}>EternalLabs Triple Bounty!</p><br/>
                <p className={styles.bountyCardAnnouncement}>Bounty is being upgraded and will be available shortly!</p><br/>
                {/*{*/}
                {/*    _isMobile ?*/}
                {/*        <>*/}
                {/*            <p className={styles.bountyCardAmounts}>~{zmbe.toFixed(2)} ZMBE <br/> ~{cake.toFixed(3)} CAKE <br/> ~{banana.toFixed(2)} BANANA</p>*/}
                {/*        </> :*/}
                {/*        <>*/}
                {/*            <p className={styles.bountyCardAmounts}>~{zmbe.toFixed(2)} ZMBE &nbsp;&nbsp;&nbsp; ~{cake.toFixed(3)} CAKE &nbsp;&nbsp;&nbsp; ~{banana.toFixed(2)} BANANA</p>*/}
                {/*        </>*/}
                {/*}*/}
                {/*<p className={styles.bountyCardNote}>Note :- Exact token amounts depend on transaction confirmation time!</p><br/>*/}
                {/*{*/}
                {/*    // @ts-ignore*/}
                {/*    bountyTime > 0 ? <BountyTimer endTs={bountyTime} callback={timerCallbackHandler}/> : null*/}
                {/*}*/}
                {/*{*/}
                {/*    userData.walletConnected ?*/}
                {/*        <>*/}
                {/*            {*/}
                {/*                !ticketPurchased ?*/}
                {/*                    <div className={styles.ezBountyClaimCardButtons}>*/}
                {/*                        <p className={styles.bountyCardText}>*/}
                {/*                            Buy an EternalLabs NFT Token or purchase a bounty Ticket to be able to claim bounty!*/}
                {/*                        </p>*/}
                {/*                        <button onClick={buyTicket} disabled={ticketPurchaseLoading}*/}
                {/*                                className={styles.claimButton}>*/}
                {/*                            {*/}
                {/*                                ticketPurchaseLoading ? <Loader/> :*/}
                {/*                                    <span>Buy Ticket</span>*/}
                {/*                            }*/}
                {/*                        </button>*/}
                {/*                    </div> :*/}
                {/*                    <div className={styles.ezBountyClaimCardButtons}>*/}
                {/*                        <p className={styles.bountyCardText}>Be the first one to claim!</p>*/}
                {/*                        <button onClick={claim} disabled={isLoading} className={styles.claimButton}>*/}
                {/*                            {*/}
                {/*                                isLoading ? <Loader/> :*/}
                {/*                                    <span>Claim</span>*/}
                {/*                            }*/}
                {/*                        </button>*/}
                {/*                    </div>*/}
                {/*            }*/}
                {/*        </>*/}
                {/*        :*/}
                {/*        <div className={styles.ezBountyClaimCardButtons}>*/}
                {/*            <button onClick={openModal} className={styles.connectWalletButton}>Connect Wallet</button>*/}
                {/*        </div>*/}
                {/*}*/}
            </div>
        </div>
    )
}

export default EzBountyCard
