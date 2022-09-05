import type {NextPage} from 'next'
import React from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
// import roadmapStyles from '../styles/Timeline.module.css'
import {BrowserView, MobileView, isBrowser, isMobile} from 'react-device-detect';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {useEffect, useState} from 'react';
import {errors, ethers} from "ethers";
import minterABI from '../abi/minter.json';
import ADDRESSES from '../utils/contractAddresses';
import ERROR_MESSAGES from '../utils/errorMessages';
import SUCCESS_MESSAGES from '../utils/successMessages';
import WHITELIST from '../utils/whitelist';
import Web3 from 'web3'
import {useWeb3React} from '@web3-react/core'
import CONSTANTS from '../utils/constants';
import {getMinterAddress} from '../utils/getContractAddress';
import {getProvider} from '../utils/getProvider';

const Home: NextPage = () => {

    const {MerkleTree} = require('merkletreejs')
    const keccak256 = require('keccak256')

    const leafNodes = WHITELIST.map(addr => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, {sortPairs: true})

    // console.log(merkleTree.getHexRoot(), ' < hex root') // hex root to input in the contract

    const getMerkleProof = () => {
        return merkleTree.getHexProof(keccak256(address))
    }

    const responsive = {
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

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
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    const [whitelistActive, setWhitelistActive] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isWlLoading, setIsWlLoading] = useState(false)
    // @ts-ignore
    const [web3NoWallet, setWeb3] = useState(new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)) // for fetching info

    const toggleNavBar = () => {
        setIsNavExpanded(!isNavExpanded)
    }

    const closeNavBar = () => {
        setIsNavExpanded(false)
    }

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
                window.open('https://metamask.app.link/dapp/eternalzombies.com')
            }
        }
    }

    useEffect(() => {
        connectWallet()
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
    }, [web3WithWallet])

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_CHAIN_ID === '56') {
            if (!(chainID === '56') && chainID !== '0') {
                notifyError("Please switch to Binance Smart Chain Main net.")
            }
        }
    }, [chainID])

    const getMinterContract = () => {
        if (walletConnected && web3WithWallet !== null) {
            // @ts-ignore
            return new web3WithWallet.eth.Contract(minterABI, getMinterAddress(chainID))
        } else {
            // @ts-ignore
            return new web3NoWallet.eth.Contract(minterABI, getMinterAddress(chainID))
        }
    }

    function updateMintPrice() {
        getMinterContract().methods.nftPrice().call().then((res: any) => {
            setPrice(Number(web3NoWallet.utils.fromWei(res)) * amount)
        })
    }

    useEffect(() => {
        updateMintPrice()
    }, [provider])

    function updateWhitelistPrice() {
        if (whitelistActive) {
            // @ts-ignore
            getMinterContract().methods.whitelistPrice().call()
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
        getMinterContract().methods.whitelistActive().call()
            .then((res: any) => {
                setWhitelistActive(res)
            })
    }

    useEffect(() => {
        checkWhitelistActive()
    }, [provider])

    function updateTotalSupply() {
        getMinterContract().methods.totalSupply().call()
            .then((res: any) => {
                setTotalMinted(Number(res.toString()))
            })
    }

    useEffect(() => {
        updateTotalSupply()
    }, [provider])

    const updateBalance = () => {
        // @ts-ignore
        if (window.ethereum && address !== '') {
            // @ts-ignore
            web3NoWallet.eth.getBalance(address)
                // @ts-ignore
                .then(res => {
                    setBalance(Number(web3NoWallet.utils.fromWei(res)))
                })
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
                getMinterContract().methods.mint(amount).send({
                    'from': address,
                    // @ts-ignore
                    value: web3WithWallet.utils.toWei(total.toString(), 'ether'),
                    // @ts-ignore
                    gasPrice: web3WithWallet.utils.toWei('12', 'gwei')
                })
                    // @ts-ignore
                    .then(res => {
                        updateTotalSupply()
                        notifySuccess('Minted Successfully')
                        setIsLoading(false)
                    })
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    const whitelistMint = () => {
        if (getMerkleProof().length < 1) {
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
                getMinterContract().methods.whitelistClaimed(address).call()
                    // @ts-ignore
                    .then(res => {
                        if (!res) {
                            getMinterContract().methods.whitelistMint(getMerkleProof()).send({
                                from: address,
                                // @ts-ignore
                                value: web3WithWallet.utils.toWei(whitelistPrice.toString(), 'ether'),
                                // @ts-ignore
                                gasPrice: web3WithWallet.utils.toWei('12', 'gwei')
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

    const notifyError = (message: string) => toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark',
    });

    const notifySuccess = (message: string) => toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark'
    });


    return (
        <div className={styles.container}>
            <ToastContainer/>
            <Head>
                <title>Eternal Zombies</title>
                <meta name="eternalzombies.com" content="a collection of 1111 intrinsic value yield bearing nfts"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <div className={styles.containerCard}>
                    <div className={styles.header}>
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
                                <li className={styles.navLinks} onClick={closeNavBar}><a href="#home">Home</a></li>
                                {isMobile ? <hr/> : null}
                                <li className={styles.navLinks} onClick={closeNavBar}><a href="#preview">Preview</a>
                                </li>
                                {isMobile ? <hr/> : null}
                                <li className={styles.navLinks} onClick={closeNavBar}><a href="#roadmap">Roadmap</a>
                                </li>
                                {isMobile ? <hr/> : null}
                                <li className={styles.navLinks} onClick={closeNavBar}><a href="#team">Team</a></li>
                            </ul>
                            <a href="https://docs.eternalzombies.com/welcome-to-eternal-zombies" target="_blank"
                               className={styles.docsButtonNav} rel="noreferrer">Read The Docs</a>
                        </nav>
                        <div id="home" className={styles.introduction}>
                            <div className={styles.introWrapper}>
                                <h2 className={styles.introHeading}>Eternal Zombies</h2>
                                <p className={styles.introText}>
                                    Bored of plain old worthless NFTs that do not hold any value??<br/><br/> Try Eternal
                                    Zombies...
                                </p>
                            </div>
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
                                                                      src="https://i.pinimg.com/originals/a6/21/0f/a6210fd59c68852a3143ccde924e6cf2.gif"/> :
                                                        <span>Mint</span>}
                                                </button>
                                                {
                                                    whitelistActive ?
                                                        <button onClick={whitelistMint}
                                                                className={styles.connectWalletButton}>
                                                            {
                                                                isWlLoading ?
                                                                    <img className={styles.mintCardButtonLoader}
                                                                         src="https://i.pinimg.com/originals/a6/21/0f/a6210fd59c68852a3143ccde924e6cf2.gif"/>
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
                        </div>
                    </div>
                    <div id="preview" className={styles.preview}>
                        <div className={styles.previewHeaderWrapper}>
                            <h3 className={styles.previewHeader}>Have a sneak peak into our collection!</h3>
                        </div>
                        <Carousel
                            swipeable={true}
                            draggable={false}
                            showDots={false}
                            responsive={responsive}
                            ssr={true} // means to render carousel on server-side.
                            infinite={true}
                            autoPlay={true}
                            autoPlaySpeed={2000}
                            keyBoardControl={true}
                            customTransition="all .5"
                            transitionDuration={500}
                            containerClass="carousel-container"
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            dotListClass="custom-dot-list-style"
                            itemClass="carousel-item-padding-40-px"
                        >
                            <div>
                                <img className={styles.carouselItems} src="/preview/1.png"/>
                            </div>
                            <div>
                                <img className={styles.carouselItems} src="/preview/2.png"/>
                            </div>
                            <div>
                                <img className={styles.carouselItems} src="/preview/3.png"/>
                            </div>
                            <div>
                                <img className={styles.carouselItems} src="/preview/4.png"/>
                            </div>
                            <div>
                                <img className={styles.carouselItems} src="/preview/5.png"/>
                            </div>
                            <div>
                                <img className={styles.carouselItems} src="/preview/6.png"/>
                            </div>
                            <div>
                                <img className={styles.carouselItems} src="/preview/7.png"/>
                            </div>
                            <div>
                                <img className={styles.carouselItems} src="/preview/8.png"/>
                            </div>
                            <div>
                                <img className={styles.carouselItems} src="/preview/9.png"/>
                            </div>
                            <div>
                                <img className={styles.carouselItems} src="/preview/10.png"/>
                            </div>
                        </Carousel>
                    </div>
                    <div id="roadmap" className={styles.roadmap}>
                        <div className={styles.roadmapHeaderWrapper}>
                            <h1 className={styles.roadmapHeader}>Where are we headed?</h1>
                        </div>
                        <div className={styles.roadmapContainer}>
                            <div className={styles.timeline}>
                                {/*<div className="timeline__event  animated fadeInUp delay-3s timeline__event--type1">*/}
                                <div className={styles.timeline__event__one}>
                                    <div className={styles.timeline__event__icon__one}>
                                        <h3>1</h3>
                                    </div>
                                    <div className={styles.timeline__separator}></div>
                                    <div className={styles.timeline__event__date}>
                                        01-09-2022
                                    </div>
                                    <div className={styles.timeline__event__content}>
                                        <div className={styles.timeline__event__title}>
                                            The Uprising
                                        </div>
                                        <div className={styles.timeline__event__description}>
                                            <p>Website launch, first collection launch, community building, collabs,
                                                AMAs and marketing.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.timeline__event__two}>
                                    <div className={styles.timeline__event__icon__two}>
                                        <h3>2</h3>
                                    </div>
                                    <div className={styles.timeline__separator}></div>
                                    <div className={styles.timeline__event__date__two}>
                                        TBA
                                    </div>
                                    <div className={styles.timeline__event__content__two}>
                                        <div className={styles.timeline__event__title}>
                                            The Cake Feast
                                        </div>
                                        <div className={styles.timeline__event__description}>
                                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                                            <p>Second collection launch, most probably for PancakeSwap's CAKE tokens(Yet
                                                to be decided). More focus on community building, more collabs and
                                                marketting.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.timeline__event__one}>
                                    <div className={styles.timeline__event__icon__one}>
                                        <h3>3</h3>
                                    </div>
                                    <div className={styles.timeline__separator}></div>
                                    <div className={styles.timeline__event__date}>
                                        TBA
                                    </div>
                                    <div className={styles.timeline__event__content}>
                                        <div className={styles.timeline__event__title}>
                                            The DAO
                                        </div>
                                        <div className={styles.timeline__event__description}>
                                            <p>
                                                Launch the EZ DAO, yeah that is right, we will be giving the power to
                                                decide about the next collection to the EZ holders. Along with that,
                                                the EZ holders will be able to make certain critical decisions about
                                                the future of EZ collection metrics.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.timeline__event__two}>
                                    <div className={styles.timeline__event__icon__two}>
                                        <h3>4</h3>
                                    </div>
                                    <div className={styles.timeline__separator}></div>
                                    <div className={styles.timeline__event__date__two}>
                                        TBA
                                    </div>
                                    <div className={styles.timeline__event__content__two}>
                                        <div className={styles.timeline__event__title}>
                                            The DAO celebrations
                                        </div>
                                        <div className={styles.timeline__event__description}>
                                            <p>Third collection launch based on the votings and proposals submitted in
                                                the EZ DAO. There is more to come. Stay tuned!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="team" className={styles.team}>
                        <div className={styles.previewHeaderWrapper}>
                            <h1 className={styles.previewHeader}>Meet the team</h1>
                        </div>
                        <div className={styles.teamInfoContainer}>
                            <div className={styles.teamMemberContainer}>
                                <img src="/team/saad.png" className={styles.teamMemberImage}/>
                                <div className={styles.teamMemberTextContainer}>
                                    <h3 className={styles.teamMemberName}>Saad Sarwar</h3>
                                    <h2 className={styles.teamMemberTitle}>The Engineer</h2>
                                    <a className={styles.teamMemberLink}
                                       href="https://discordapp.com/users/782332876460916736" target="_blank"
                                       rel="noreferrer">@saad_sarwar</a>
                                </div>
                            </div>
                            <div className={styles.teamMemberContainer}>
                                <img
                                    src="https://media.discordapp.net/attachments/935228255982731264/1006562526831595652/4.gif?width=675&height=675"
                                    className={styles.teamMemberImage}/>
                                <div className={styles.teamMemberTextContainer}>
                                    <h3 className={styles.teamMemberName}>CanadianCryptoJunkie</h3>
                                    <h2 className={styles.teamMemberTitle}>The Artist</h2>
                                    <a className={styles.teamMemberLink}
                                       href="https://discordapp.com/users/240226213128306688" target="_blank"
                                       rel="noreferrer">@Canadian Crypto Junkie 🍁</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className={styles.footer}>
                <div className={styles.footerWrapper}>
                    <div className={styles.logoWrapper}>
                        <img
                            src="/EZLogo1.png"
                            alt="Eternal Zombies"
                            className={styles.logo}
                        />
                    </div>
                    <div className={styles.footerLinks}>
                        <ul className={styles.footerList}>
                            <li>
                                <a className={styles.footerListLinks}
                                   href="https://discord.gg/gnN7k9am83" target="_blank" rel="noreferrer">
                                    <img src="/discord-brands.png" height={30} width={30}/>
                                </a>
                            </li>
                            <li>
                                <a className={styles.footerListLinks} href="https://t.me/EternalZombies" target="_blank"
                                   rel="noreferrer">
                                    <img src="/telegram-brands.png" height={30} width={30}/>
                                </a>
                            </li>
                            <li>
                                <a className={styles.footerListLinks}
                                   href="https://twitter.com/EternalZombies?s=20&t=fZpZNbcCbPBtdlfNGMAgqA"
                                   target="_blank" rel="noreferrer">
                                    <img src="/twitter-logo.png" height={30} width={30}/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <br/>
                <p className={styles.copyright}>All rights reserved © Eternal Zombies</p>
            </footer>
        </div>
    )
}

export default Home
