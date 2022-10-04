import styles from '../../../styles/Home.module.css';
import collectionStyles from '../../../styles/Collections.module.css'
import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import zmbeCardCover from '../../../public/rugzombie-logo.png'
import cakeCardCover from '../../../public/CakeLogo.png'
import linkIcon from '../../../public/link-icon.png'
import {useRouter} from 'next/router'
import {getStakerAddress} from '../../../utils/getContractAddress';
import {getDrFrankensteinNoWallet} from '../../../utils/web3NoWallet';
import constants from '../../../utils/constants';
import {weiToNumber} from '../../../utils/units';
import Link from 'next/link';
import {getLpTokenValue} from '../../../utils/price';


export const Collections = () => {

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
        <div id="collections" className={styles.preview}>
            <div className={styles.previewHeaderWrapper}>
                <h3 className={styles.previewHeader}>Compounding Yield Boosting tokens!</h3>
            </div>
            <div className={collectionStyles.collectionsCardWrapper} onClick={gotoZmbeCollection}>
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
                            <h3>Eternal Zombies</h3>
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
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsLeft}>Pool&apos;s APR</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsRight}>108.80%</span>
                                </div>
                            </div>
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsLeft}>Estimated EZ APY</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                    <span className={collectionStyles.detailsRight}>199.05%</span>
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
                                    <span className={collectionStyles.detailsRight}>{zmbeLpLocked} ($ {lpValue.toFixed(2)})</span>
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
                                                <span id="span_element">
                                                    0x5a87d...ff496&nbsp;&nbsp;
                                                    <Image
                                                        src={linkIcon}
                                                        width={20}
                                                        height={20}
                                                    />
                                                </span>
                                            </a>
                                        </Link>
                                    </span>
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
                            alt="Eternal Zombies Collection"
                            className={collectionStyles.coverImage}
                        ></Image>
                    </div>
                    <div className={collectionStyles.bottomContainer}>
                        <div className={collectionStyles.bottomHeadingContainer}>
                            <h3>Eternal Cakes</h3>
                        </div>
                        <div className={collectionStyles.detailsContainer}>
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span>Pool</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                    <span>PancakeSwap CAKE-BNB LP pool</span>
                                </div>
                            </div>
                            <div className={collectionStyles.detailsRow}>
                                <div className={collectionStyles.detailsColumn}>
                                    <span>Earns</span>
                                </div>
                                <div className={collectionStyles.detailsColumn}>
                                    <span>CAKE</span>
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

export default Collections;
