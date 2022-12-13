import styles from '../../../styles/Home.module.css';
import collectionStyles from '../../../styles/Collections.module.css'
import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import zmbeCardCover from '../../../public/rugzombie-logo.png'
import cakeCardCover from '../../../public/CakeLogo.png'
import moneyMonkeysCardCover from '../../../public/moneyMonkeysLogo.png'
import contractIcon from '../../../public/file-contract-solid.svg'
import background from "../../../public/gradient-blue-background.png"
import {useRouter} from 'next/router'
import {getEternalCakesMinterAddress, getStakerAddress, getMinterAddress} from '../../../utils/getContractAddress';
import {getDrFrankensteinNoWallet, getPancakeMasterchefNoWallet} from '../../../utils/web3NoWallet';
import constants from '../../../utils/constants';
import {weiToNumber} from '../../../utils/units';
import Link from 'next/link';
import ADDRESSES from '../../../utils/contractAddresses';
import {getCakeBnbLpTokenValue, getZmbeBnbLpTokenValue} from '../../../utils/lpPrice';
import minterABI from '../../../abi/minter.json';
import eternalCakesMinterABI from '../../../abi/EternalCakesMinter.json'
import Web3 from 'web3';
import {useDispatch, useSelector} from 'react-redux';
import {selectCreateAccountState, updateRugzombiePancakeswapTombApr, updateTvl} from '../../../reduxStore/accountSlice';
import {AppDispatch} from '../../../reduxStore';

export const Collections = () => {

    const dispatch = useDispatch<AppDispatch>();
    const [chainID, setChainId] = useState(process.env.NEXT_PUBLIC_CHAIN_ID)
    const [zmbeLpLocked, setZmbeLpLocked] = useState('0')
    const [cakeLpLocked, setCakeLpLocked] = useState('0')
    const [lpValue, setLpValue] = useState(0)
    const [cakeLpValue, setCakeLpValue] = useState(0)
    const router = useRouter()
    const [totalEzTokens, setTotalEzTokens] = useState(0)
    const [totalEcTokens, setTotalEcTokens] = useState(0)
    const [eZTokenWorth, setEzTokenWorth] = useState(0)
    const [eCTokenWorth, setEcTokenWorth] = useState(0)

    const {zmbeBnbPoolApr, cakeBnbPoolApr, zmbeYield, cakeYield, mainstYield} = useSelector(selectCreateAccountState)

    // @ts-ignore
    const [web3NoWallet, setWeb3NoWallet] = useState(new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)) // for fetching info

    const getEternalZombiesMinterNoWallet = () => {
        // @ts-ignore
        return new web3NoWallet.eth.Contract(minterABI, getMinterAddress(chainID))
    }

    const getEternalCakesMinterNoWallet = () => {
        // @ts-ignore
        return new web3NoWallet.eth.Contract(eternalCakesMinterABI, getEternalCakesMinterAddress(chainID))
    }

    function updateEternalCakesTotalSupply() {
        getEternalCakesMinterNoWallet().methods.totalSupply().call()
            .then((res: any) => {
                setTotalEcTokens(Number(res.toString()))
            })
    }

    function updateZmbeTotalSupply() {
        getEternalZombiesMinterNoWallet().methods.totalSupply().call()
            .then((res: any) => {
                setTotalEzTokens(Number(res.toString()))
            })
    }

    useEffect(() => {
        updateZmbeTotalSupply()
        updateEternalCakesTotalSupply()
    }, [])

    useEffect(() => {
        if (cakeLpValue !== 0 && totalEcTokens !== 0) {
            // @ts-ignore
            setEcTokenWorth((cakeLpValue / totalEcTokens).toFixed(2))
        }
    }, [cakeLpValue, totalEcTokens])

    useEffect(() => {
        if (lpValue !== 0 && totalEzTokens !== 0) {
            // @ts-ignore
            setEzTokenWorth((lpValue / totalEzTokens).toFixed(2))
        }
    }, [lpValue, totalEzTokens])

    useEffect(() => {
        if (lpValue !== 0 && cakeLpValue !== 0) {
            // @ts-ignore
            dispatch(updateTvl(lpValue + cakeLpValue))
        }
    }, [lpValue, cakeLpValue])

    useEffect(() => {
        if (zmbeLpLocked !== '0' && chainID === '56') {
            getZmbeBnbLpTokenValue(zmbeLpLocked)
                .then((res: any) => {
                    setLpValue(res)
                })
        } else {
            setLpValue(0)
        }
    }, [zmbeLpLocked])

    const updateZmbeLpLocked = () => {
        getDrFrankensteinNoWallet(chainID).methods.userInfo(constants.EZ_POOL_ID, getStakerAddress(chainID)).call().then((res: any) => {
            setZmbeLpLocked(weiToNumber(res?.amount, 2))
        })
    }

    useEffect(() => {
        if (cakeLpLocked !== '0' && chainID === '56') {
            getCakeBnbLpTokenValue(cakeLpLocked)
                .then((res: any) => {
                    setCakeLpValue(res)
                })
        } else {
            setCakeLpValue(0)
        }
    }, [cakeLpLocked])

    const updateCakeLpLocked = () => {
        // @ts-ignore
        getPancakeMasterchefNoWallet(chainID).methods.userInfo(constants.CAKE_POOL_ID, ADDRESSES.PANCAKE_FARM_BOOSTER_PROXY[chainID]).call().then((res: any) => {
            setCakeLpLocked(weiToNumber(res?.amount, 2))
        })
    }

    useEffect(() => {
        updateZmbeLpLocked()
        updateCakeLpLocked()
    }, [chainID])

    const gotoZmbeCollection = (event: any) => {
        router.push('/eternalzombies')
    }

    const gotoMoneyMonkeysCollection = (event: any) => {
        router.push('/moneymonkeys')
    }

    const gotoCakeCollection = (event: any) => {
        router.push('/eternalcakes')
    }

    return (
        <div id="collections" className={styles.preview} style={{backgroundImage: `url(${background.src})`}}>
            <div className={styles.previewHeaderWrapper}>
                <h2 className={styles.previewHeader}>Compounding Yield Boosting tokens!</h2>
            </div>
            <div className={collectionStyles.collectionsCardWrapper}>
                <div className={collectionStyles.collectionCard}>
                    <div className={collectionStyles.imageWrapper}>
                        <Image
                            src={zmbeCardCover}
                            height={500}
                            width={500}
                            alt="Eternal Zombies Collection"
                            className={collectionStyles.coverImage}
                        ></Image>
                    </div>
                    <div className={collectionStyles.bottomContainer}>
                        <div className={collectionStyles.bottomHeadingContainer}>
                            <h3 className={collectionStyles.bottomHeading}>Eternal Zombies</h3>
                        </div>
                        <div className={collectionStyles.detailsContainer}>
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsLeft}>Pool</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                        <span
                                            className={collectionStyles.detailsRight}>Rugzombie PancakeSwap Tomb</span>
                                </div>
                            </div>
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsLeft}>Earns</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsRight}>ZMBE</span>
                                </div>
                            </div>
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsLeft}>Yield</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                    <span
                                        className={collectionStyles.detailsRight} title="Per Distribution cycle">{zmbeYield.toFixed(2)} ZMBE / 4 Days</span>
                                </div>
                            </div>
                            {/*<div className={collectionStyles.detailsRow}>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span className={collectionStyles.detailsLeft}>Pool&apos;s APR</span>*/}
                            {/*    </div>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span*/}
                            {/*            className={collectionStyles.detailsRightStriked}>{Number(zmbeBnbPoolApr).toFixed(2)}%</span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={collectionStyles.detailsRow}>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span className={collectionStyles.detailsLeft}>Estimated EZ APY</span>*/}
                            {/*    </div>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span className={collectionStyles.detailsRight} title="To be estimated">TBE</span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsLeft}
                                          title="Estimated worth of each EZ token">Estimated EZ Worth</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsRight}
                                          title="To be estimated">${eZTokenWorth}</span>
                                </div>
                            </div>
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsLeft}>Compounds every</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsRight}>4 Days</span>
                                </div>
                            </div>
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsLeft}>Total LP Staked</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                            <span
                                                className={collectionStyles.detailsRight}>{zmbeLpLocked} (${lpValue.toFixed(2)})</span>
                                </div>
                            </div>
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsLeft}>Contract</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                            <span className={collectionStyles.detailsRight}>
                                                <Link
                                                    href="https://bscscan.com/address/0x5a87d0173a2a22579b878a27048c8a9b09bff496"
                                                    passHref={true}
                                                    className={collectionStyles.detailsContractLink}>
                                                    <a target="_blank">
                                                        <span style={{display: 'flex'}} id="span_element">
                                                            0x5a87d...ff496&nbsp;
                                                            <Image
                                                                src={contractIcon}
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </span>
                                                    </a>
                                                </Link>
                                            </span>
                                </div>
                            </div>
                            <div className={collectionStyles.detailsRowContentCenter}>
                                <div className={collectionStyles.buttonContainer}>
                                    <button className={collectionStyles.mintButton}
                                            onClick={gotoZmbeCollection}>Mint
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={collectionStyles.collectionCard}>
                    <div className={collectionStyles.imageWrapper}>
                        <Image
                            src={cakeCardCover}
                            width={500}
                            height={500}
                            alt="Eternal Cakes Collection"
                            className={collectionStyles.coverImage}
                        ></Image>
                    </div>
                    <div className={collectionStyles.bottomContainer}>
                        <div className={collectionStyles.bottomHeadingContainer}>
                            <h3 className={collectionStyles.bottomHeading}>Eternal Cakes</h3>
                        </div>
                        <div className={collectionStyles.detailsContainer}>
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsLeft}>Pool</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsRight}>PancakeSwap CAKE-BNB LP Pool</span>
                                </div>
                            </div>
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsLeft}>Earns</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsRight}>CAKE</span>
                                </div>
                            </div>
                            {/*<div className={collectionStyles.detailsRow}>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span className={collectionStyles.detailsLeft}>Pool&apos;s APR</span>*/}
                            {/*    </div>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span*/}
                            {/*            className={collectionStyles.detailsRightStriked}>{cakeBnbPoolApr.toFixed(2)} %</span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsLeft}>Yield</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsRight} title="Per Distribution cycle">{cakeYield.toFixed(4)} CAKE / 4 Days</span>
                                </div>
                            </div>
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsLeft}
                                          title="Estimated worth of each EZ token">Estimated EC Worth</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsRight}
                                          title="To be estimated">${eCTokenWorth}</span>
                                </div>
                            </div>
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsLeft}>Compounds every</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsRight}>4 Days</span>
                                </div>
                            </div>
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsLeft}>Total LP Staked</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                            <span
                                                className={collectionStyles.detailsRight}>{cakeLpLocked} (${cakeLpValue.toFixed(2)})</span>
                                </div>
                            </div>
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsLeft}>Contract</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                            <span className={collectionStyles.detailsRight}>
                                                <Link
                                                    href="https://bscscan.com/address/0xE4cE0E5b3B70B5132807CE725eC93d6eE33B5Eca"
                                                    passHref={true}
                                                    className={collectionStyles.detailsContractLink}>
                                                    <a target="_blank">
                                                        <span style={{display: 'flex'}} id="span_element">
                                                            0xE4cE0...3B5Eca&nbsp;
                                                            <Image
                                                                src={contractIcon}
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </span>
                                                    </a>
                                                </Link>
                                            </span>
                                </div>
                            </div>
                            {/*<div className={collectionStyles.detailsComingSoon}>*/}
                            {/*    <h2>Launching at 1/11/2022 16:00 UTC</h2>*/}
                            {/*</div>*/}
                            <div className={collectionStyles.detailsRowContentCenter}>
                                <div className={collectionStyles.buttonContainer}>
                                    <button className={collectionStyles.mintButton}
                                            onClick={gotoCakeCollection}>Mint
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<Link href="./eternalzombies" className={collectionStyles.link}></Link>*/}
                </div>
                <div className={collectionStyles.collectionCard}>
                    <div className={collectionStyles.imageWrapper} style={{padding: '0%'}}>
                        <Image
                            src={moneyMonkeysCardCover}
                            height={500}
                            width={500}
                            alt="Money Monkeys Collection"
                            className={collectionStyles.coverImage}
                        ></Image>
                    </div>
                    <div className={collectionStyles.bottomContainer}>
                        <div className={collectionStyles.bottomHeadingContainer}>
                            <h3 className={collectionStyles.bottomHeading}>Money Monkeys</h3>
                        </div>
                        <div className={collectionStyles.detailsContainer}>
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsLeft}>Pool</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                        <span
                                            className={collectionStyles.detailsRight}>Apeswap BANANA/GNANA Pool</span>
                                </div>
                            </div>
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsLeft}>Earns</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsRight}>$MAINST</span>
                                </div>
                            </div>
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsLeft}>Yield</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                    <span
                                        className={collectionStyles.detailsRight} title="Per Distribution cycle">{mainstYield.toFixed(2)} $MAINST / 3 Days</span>
                                </div>
                            </div>
                            {/*<div className={collectionStyles.detailsRow}>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span className={collectionStyles.detailsLeft}>Pool&apos;s APR</span>*/}
                            {/*    </div>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span*/}
                            {/*            className={collectionStyles.detailsRightStriked}>{Number(zmbeBnbPoolApr).toFixed(2)}%</span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={collectionStyles.detailsRow}>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span className={collectionStyles.detailsLeft}>Estimated EZ APY</span>*/}
                            {/*    </div>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span className={collectionStyles.detailsRight} title="To be estimated">TBE</span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={collectionStyles.detailsRow}>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span className={collectionStyles.detailsLeft}*/}
                            {/*              title="Estimated worth of each EZ token">Estimated MM Worth</span>*/}
                            {/*    </div>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span className={collectionStyles.detailsRight}*/}
                            {/*              title="To be estimated">${eZTokenWorth}</span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsLeft}>Compounds every</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsRight}>3 Days</span>
                                </div>
                            </div>
                            {/*<div className={collectionStyles.detailsRow}>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span className={collectionStyles.detailsLeft}>Total Staked</span>*/}
                            {/*    </div>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*                <span*/}
                            {/*                    className={collectionStyles.detailsRight}>{zmbeLpLocked} (${lpValue.toFixed(2)})</span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsLeft}>Contract</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                            <span className={collectionStyles.detailsRight}>
                                                <Link
                                                    href="https://bscscan.com/address/0xa36c806c13851F8B27780753563fdDAA6566f996"
                                                    passHref={true}
                                                    className={collectionStyles.detailsContractLink}>
                                                    <a target="_blank">
                                                        <span style={{display: 'flex'}} id="span_element">
                                                            0x5a87d...ff496&nbsp;
                                                            <Image
                                                                src={contractIcon}
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </span>
                                                    </a>
                                                </Link>
                                            </span>
                                </div>
                            </div>
                            <div className={collectionStyles.detailsRowContentCenter}>
                                <div className={collectionStyles.buttonContainer}>
                                    <button className={collectionStyles.mintButton}
                                            onClick={gotoMoneyMonkeysCollection}>Claim
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Collections;
