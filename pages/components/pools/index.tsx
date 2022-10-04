import styles from '../../../styles/Home.module.css';
import collectionStyles from '../../../styles/Collections.module.css'
import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import bnbCardCover from '../../../public/bnb-logo.png'
import zmbeCardCover from '../../../public/rugzombie-logo.png'
import cakeCardCover from '../../../public/CakeLogo.png'
import bananaCardCover from '../../../public/banana.png'
import babyCardCover from '../../../public/BABY-icon.png'
import linkIcon from '../../../public/link-icon.png'
import {useRouter} from 'next/router'
import {getStakerAddress} from '../../../utils/getContractAddress';
import {getDrFrankensteinNoWallet} from '../../../utils/web3NoWallet';
import constants from '../../../utils/constants';
import {weiToNumber} from '../../../utils/units';
import Link from 'next/link';
import {getLpTokenValue} from '../../../utils/price';


export const Pools = () => {

    const [chainID, setChainId] = useState(process.env.NEXT_PUBLIC_CHAIN_ID)
    const [zmbeLpLocked, setZmbeLpLocked] = useState('0')
    const [lpValue, setLpValue] = useState(0)
    const router = useRouter()

    useEffect(() => {
        if (zmbeLpLocked !== '0') {
            getLpTokenValue(zmbeLpLocked)
                .then((res: any) => {
                    setLpValue(res)
                })
        }
    }, [zmbeLpLocked])

    const updateZmbeLpLocked = () => {
        getDrFrankensteinNoWallet(chainID).methods.userInfo(constants.EZ_POOL_ID, getStakerAddress(chainID)).call().then((res: any) => {
            setZmbeLpLocked(weiToNumber(res?.amount, 2))
        })
    }

    useEffect(() => {
        updateZmbeLpLocked()
    }, [chainID])

    const gotoZmbeCollection = (event: any) => {
        router.push('/eternalzombies')
    }

    return (
        <div id="pools" className={styles.pool}>
            <div className={styles.previewHeaderWrapper}>
                <h3 className={styles.previewHeader}>Compounding Yield Boosting Pools!</h3>
            </div>
            <div className={collectionStyles.collectionsCardWrapper} onClick={gotoZmbeCollection}>
                <div className={collectionStyles.collectionCard}>
                    <div className={collectionStyles.imageWrapper}>
                        <Image
                            src={bnbCardCover}
                            width={350}
                            height={350}
                            alt="BNB pool logo"
                            className={collectionStyles.coverImage}
                        ></Image>
                    </div>
                    <div className={collectionStyles.bottomContainer}>
                        <div className={collectionStyles.bottomHeadingContainer}>
                            <h3>BNB pool</h3>
                        </div>
                        <div className={collectionStyles.detailsContainer}>
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsLeft}>Pool</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsRight}>Pancakeswap BUSD-BNB LP pool</span>
                                </div>
                            </div>
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsLeft}>Earns</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsRight}>BNB</span>
                                </div>
                            </div>
                            {/*<div className={collectionStyles.detailsRow}>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span>Contract</span>*/}
                            {/*    </div>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span>*/}
                            {/*            <a href="https://bscscan.com/address/0x5a87d0173a2a22579b878a27048c8a9b09bff496">0x5a87d...ff496</a>*/}
                            {/*        </span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className={collectionStyles.detailsComingSoon}>
                                <h2>Coming soon!</h2>
                            </div>
                        </div>
                    </div>
                    {/*<Link href="./eternalzombies" className={collectionStyles.link}></Link>*/}
                </div>
                <div className={collectionStyles.collectionCard}>
                    <div className={collectionStyles.imageWrapper}>
                        <Image
                            src={cakeCardCover}
                            width={500}
                            height={500}
                            alt="CAKE pool"
                            className={collectionStyles.coverImage}
                        ></Image>
                    </div>
                    <div className={collectionStyles.bottomContainer}>
                        <div className={collectionStyles.bottomHeadingContainer}>
                            <h3>CAKE pool</h3>
                        </div>
                        <div className={collectionStyles.detailsContainer}>
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsLeft}>Pool</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsRight}>PancakeSwap CAKE-BNB LP pool</span>
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
                            {/*        <span>Contract</span>*/}
                            {/*    </div>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span>*/}
                            {/*            <a href="https://bscscan.com/address/0x5a87d0173a2a22579b878a27048c8a9b09bff496">0x5a87d...ff496</a>*/}
                            {/*        </span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className={collectionStyles.detailsComingSoon}>
                                <h2>Coming soon!</h2>
                            </div>
                        </div>
                    </div>
                    {/*<Link href="./eternalzombies" className={collectionStyles.link}></Link>*/}
                </div>
                <div className={collectionStyles.collectionCard}>
                    <div className={collectionStyles.imageWrapper}>
                        <Image
                            src={bananaCardCover}
                            width={500}
                            height={500}
                            alt="BANANA pool"
                            className={collectionStyles.coverImage}
                        ></Image>
                    </div>
                    <div className={collectionStyles.bottomContainer}>
                        <div className={collectionStyles.bottomHeadingContainer}>
                            <h3>BANANA pool</h3>
                        </div>
                        <div className={collectionStyles.detailsContainer}>
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsLeft}>Pool</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsRight}>ApeSwap BANANA-BNB LP pool</span>
                                </div>
                            </div>
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsLeft}>Earns</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsRight}>BANANA</span>
                                </div>
                            </div>
                            {/*<div className={collectionStyles.detailsRow}>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span>Contract</span>*/}
                            {/*    </div>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span>*/}
                            {/*            <a href="https://bscscan.com/address/0x5a87d0173a2a22579b878a27048c8a9b09bff496">0x5a87d...ff496</a>*/}
                            {/*        </span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className={collectionStyles.detailsComingSoon}>
                                <h2>Coming soon!</h2>
                            </div>
                        </div>
                    </div>
                    {/*<Link href="./eternalzombies" className={collectionStyles.link}></Link>*/}
                </div>
            </div>
            <div className={collectionStyles.collectionsCardWrapper} onClick={gotoZmbeCollection}>
                <div className={collectionStyles.collectionCard}>
                    <div className={collectionStyles.imageWrapper}>
                        <Image
                            src={zmbeCardCover}
                            height={500}
                            width={500}
                            alt="ZMBE pool"
                            className={collectionStyles.coverImage}
                        ></Image>
                    </div>
                    <div className={collectionStyles.bottomContainer}>
                        <div className={collectionStyles.bottomHeadingContainer}>
                            <h3>ZMBE pool</h3>
                        </div>
                        <div className={collectionStyles.detailsContainer}>
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsLeft}>Pool</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                        <span
                                            className={collectionStyles.detailsRight}>Rugzombie.io PancakeSwap Tomb</span>
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
                            <div className={collectionStyles.detailsComingSoon}>
                                <h2>Coming soon!</h2>
                            </div>
                            {/*<div className={collectionStyles.detailsRow}>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span className={collectionStyles.detailsLeft}>Pool&apos;s APR</span>*/}
                            {/*    </div>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span className={collectionStyles.detailsRight}>108.80%</span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={collectionStyles.detailsRow}>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span className={collectionStyles.detailsLeft}>Estimated EZ APY</span>*/}
                            {/*    </div>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span className={collectionStyles.detailsRight}>199.05%</span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={collectionStyles.detailsRow}>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span className={collectionStyles.detailsLeft}>Compounds every</span>*/}
                            {/*    </div>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span className={collectionStyles.detailsRight}>4 Days</span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={collectionStyles.detailsRow}>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span className={collectionStyles.detailsLeft}>Total LP Staked</span>*/}
                            {/*    </div>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span className={collectionStyles.detailsRight}>{zmbeLpLocked} ($ {lpValue.toFixed(2)})</span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={collectionStyles.detailsRow}>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span className={collectionStyles.detailsLeft}>Contract</span>*/}
                            {/*    </div>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span className={collectionStyles.detailsRight}>*/}
                            {/*            <Link*/}
                            {/*                href="https://bscscan.com/address/0x5a87d0173a2a22579b878a27048c8a9b09bff496"*/}
                            {/*                passHref={true}*/}
                            {/*                className={collectionStyles.detailsContractLink}>*/}
                            {/*                <a target="_blank">*/}
                            {/*                    <span id="span_element">*/}
                            {/*                        0x5a87d...ff496&nbsp;&nbsp;*/}
                            {/*                        <Image*/}
                            {/*                            src={linkIcon}*/}
                            {/*                            width={20}*/}
                            {/*                            height={20}*/}
                            {/*                        />*/}
                            {/*                    </span>*/}
                            {/*                </a>*/}
                            {/*            </Link>*/}
                            {/*        </span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
                <div className={collectionStyles.collectionCard}>
                    <div className={collectionStyles.imageWrapper}>
                        <Image
                            src={babyCardCover}
                            width={500}
                            height={500}
                            alt="Eternal Zombies Collection"
                            className={collectionStyles.coverImage}
                        ></Image>
                    </div>
                    <div className={collectionStyles.bottomContainer}>
                        <div className={collectionStyles.bottomHeadingContainer}>
                            <h3>BABY pool</h3>
                        </div>
                        <div className={collectionStyles.detailsContainer}>
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsLeft}>Pool</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsRight}>Babyswap BABY-BNB LP pool</span>
                                </div>
                            </div>
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsLeft}>Earns</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsRight}>BABY</span>
                                </div>
                            </div>
                            {/*<div className={collectionStyles.detailsRow}>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span>Contract</span>*/}
                            {/*    </div>*/}
                            {/*    <div className={collectionStyles.detailsColumn}>*/}
                            {/*        <span>*/}
                            {/*            <a href="https://bscscan.com/address/0x5a87d0173a2a22579b878a27048c8a9b09bff496">0x5a87d...ff496</a>*/}
                            {/*        </span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className={collectionStyles.detailsComingSoon}>
                                <h2>Coming soon!</h2>
                            </div>
                        </div>
                    </div>
                    {/*<Link href="./eternalzombies" className={collectionStyles.link}></Link>*/}
                </div>
            </div>
        </div>
    )
}

export default Pools;
