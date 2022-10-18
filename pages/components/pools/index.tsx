import styles from '../../../styles/Home.module.css';
import poolStyles from '../../../styles/Pools.module.css'
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

    return (
        <div id="pools" className={styles.pool}>
            <div className={styles.previewHeaderWrapper}>
                <h3 className={styles.previewHeader}>Compounding Yield Boosting Pools!</h3>
            </div>
            <div className={poolStyles.collectionsCardWrapper}>
                <div className={poolStyles.collectionCard}>
                    <div className={poolStyles.imageWrapper}>
                        <Image
                            src={bnbCardCover}
                            width={350}
                            height={350}
                            alt="BNB pool logo"
                            className={poolStyles.coverImage}
                        ></Image>
                    </div>
                    <div className={poolStyles.bottomContainer}>
                        <div className={poolStyles.bottomHeadingContainer}>
                            <h3>BNB pool</h3>
                        </div>
                        <div className={poolStyles.detailsContainer}>
                            <div className={poolStyles.detailsRow}>
                                <div className={poolStyles.detailsColumn}>
                                    <span className={poolStyles.detailsLeft}>Pool</span>
                                </div>
                                <div className={poolStyles.detailsColumn}>
                                    <span className={poolStyles.detailsRight}>Pancakeswap BUSD-BNB LP pool</span>
                                </div>
                            </div>
                            <div className={poolStyles.detailsRow}>
                                <div className={poolStyles.detailsColumn}>
                                    <span className={poolStyles.detailsLeft}>Earns</span>
                                </div>
                                <div className={poolStyles.detailsColumn}>
                                    <span className={poolStyles.detailsRight}>BNB</span>
                                </div>
                            </div>
                            {/*<div className={poolStyles.detailsRow}>*/}
                            {/*    <div className={poolStyles.detailsColumn}>*/}
                            {/*        <span>Contract</span>*/}
                            {/*    </div>*/}
                            {/*    <div className={poolStyles.detailsColumn}>*/}
                            {/*        <span>*/}
                            {/*            <a href="https://bscscan.com/address/0x5a87d0173a2a22579b878a27048c8a9b09bff496">0x5a87d...ff496</a>*/}
                            {/*        </span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className={poolStyles.detailsComingSoon}>
                                <h2>Coming soon!</h2>
                            </div>
                        </div>
                    </div>
                    {/*<Link href="./eternalzombies" className={poolStyles.link}></Link>*/}
                </div>
                <div className={poolStyles.collectionCard}>
                    <div className={poolStyles.imageWrapper}>
                        <Image
                            src={cakeCardCover}
                            width={500}
                            height={500}
                            alt="CAKE pool"
                            className={poolStyles.coverImage}
                        ></Image>
                    </div>
                    <div className={poolStyles.bottomContainer}>
                        <div className={poolStyles.bottomHeadingContainer}>
                            <h3>CAKE pool</h3>
                        </div>
                        <div className={poolStyles.detailsContainer}>
                            <div className={poolStyles.detailsRow}>
                                <div className={poolStyles.detailsColumn}>
                                    <span className={poolStyles.detailsLeft}>Pool</span>
                                </div>
                                <div className={poolStyles.detailsColumn}>
                                    <span className={poolStyles.detailsRight}>PancakeSwap CAKE-BNB LP pool</span>
                                </div>
                            </div>
                            <div className={poolStyles.detailsRow}>
                                <div className={poolStyles.detailsColumn}>
                                    <span className={poolStyles.detailsLeft}>Earns</span>
                                </div>
                                <div className={poolStyles.detailsColumn}>
                                    <span className={poolStyles.detailsRight}>CAKE</span>
                                </div>
                            </div>
                            {/*<div className={poolStyles.detailsRow}>*/}
                            {/*    <div className={poolStyles.detailsColumn}>*/}
                            {/*        <span>Contract</span>*/}
                            {/*    </div>*/}
                            {/*    <div className={poolStyles.detailsColumn}>*/}
                            {/*        <span>*/}
                            {/*            <a href="https://bscscan.com/address/0x5a87d0173a2a22579b878a27048c8a9b09bff496">0x5a87d...ff496</a>*/}
                            {/*        </span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className={poolStyles.detailsComingSoon}>
                                <h2>Coming soon!</h2>
                            </div>
                        </div>
                    </div>
                    {/*<Link href="./eternalzombies" className={poolStyles.link}></Link>*/}
                </div>
                <div className={poolStyles.collectionCard}>
                    <div className={poolStyles.imageWrapper}>
                        <Image
                            src={bananaCardCover}
                            width={500}
                            height={500}
                            alt="BANANA pool"
                            className={poolStyles.coverImage}
                        ></Image>
                    </div>
                    <div className={poolStyles.bottomContainer}>
                        <div className={poolStyles.bottomHeadingContainer}>
                            <h3>BANANA pool</h3>
                        </div>
                        <div className={poolStyles.detailsContainer}>
                            <div className={poolStyles.detailsRow}>
                                <div className={poolStyles.detailsColumn}>
                                    <span className={poolStyles.detailsLeft}>Pool</span>
                                </div>
                                <div className={poolStyles.detailsColumn}>
                                    <span className={poolStyles.detailsRight}>ApeSwap BANANA-BNB LP pool</span>
                                </div>
                            </div>
                            <div className={poolStyles.detailsRow}>
                                <div className={poolStyles.detailsColumn}>
                                    <span className={poolStyles.detailsLeft}>Earns</span>
                                </div>
                                <div className={poolStyles.detailsColumn}>
                                    <span className={poolStyles.detailsRight}>BANANA</span>
                                </div>
                            </div>
                            {/*<div className={poolStyles.detailsRow}>*/}
                            {/*    <div className={poolStyles.detailsColumn}>*/}
                            {/*        <span>Contract</span>*/}
                            {/*    </div>*/}
                            {/*    <div className={poolStyles.detailsColumn}>*/}
                            {/*        <span>*/}
                            {/*            <a href="https://bscscan.com/address/0x5a87d0173a2a22579b878a27048c8a9b09bff496">0x5a87d...ff496</a>*/}
                            {/*        </span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className={poolStyles.detailsComingSoon}>
                                <h2>Coming soon!</h2>
                            </div>
                        </div>
                    </div>
                    {/*<Link href="./eternalzombies" className={poolStyles.link}></Link>*/}
                </div>
            </div>
            <div className={poolStyles.collectionsCardWrapper}>
                <div className={poolStyles.collectionCard}>
                    <div className={poolStyles.imageWrapper}>
                        <Image
                            src={zmbeCardCover}
                            height={500}
                            width={500}
                            alt="ZMBE pool"
                            className={poolStyles.coverImage}
                        ></Image>
                    </div>
                    <div className={poolStyles.bottomContainer}>
                        <div className={poolStyles.bottomHeadingContainer}>
                            <h3>ZMBE pool</h3>
                        </div>
                        <div className={poolStyles.detailsContainer}>
                            <div className={poolStyles.detailsRow}>
                                <div className={poolStyles.detailsColumn}>
                                    <span className={poolStyles.detailsLeft}>Pool</span>
                                </div>
                                <div className={poolStyles.detailsColumn}>
                                        <span
                                            className={poolStyles.detailsRight}>Rugzombie PancakeSwap Tomb</span>
                                </div>
                            </div>
                            <div className={poolStyles.detailsRow}>
                                <div className={poolStyles.detailsColumn}>
                                    <span className={poolStyles.detailsLeft}>Earns</span>
                                </div>
                                <div className={poolStyles.detailsColumn}>
                                    <span className={poolStyles.detailsRight}>ZMBE</span>
                                </div>
                            </div>
                            <div className={poolStyles.detailsComingSoon}>
                                <h2>Coming soon!</h2>
                            </div>
                            {/*<div className={poolStyles.detailsRow}>*/}
                            {/*    <div className={poolStyles.detailsColumn}>*/}
                            {/*        <span className={poolStyles.detailsLeft}>Pool&apos;s APR</span>*/}
                            {/*    </div>*/}
                            {/*    <div className={poolStyles.detailsColumn}>*/}
                            {/*        <span className={poolStyles.detailsRight}>108.80%</span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={poolStyles.detailsRow}>*/}
                            {/*    <div className={poolStyles.detailsColumn}>*/}
                            {/*        <span className={poolStyles.detailsLeft}>Estimated EZ APY</span>*/}
                            {/*    </div>*/}
                            {/*    <div className={poolStyles.detailsColumn}>*/}
                            {/*        <span className={poolStyles.detailsRight}>199.05%</span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={poolStyles.detailsRow}>*/}
                            {/*    <div className={poolStyles.detailsColumn}>*/}
                            {/*        <span className={poolStyles.detailsLeft}>Compounds every</span>*/}
                            {/*    </div>*/}
                            {/*    <div className={poolStyles.detailsColumn}>*/}
                            {/*        <span className={poolStyles.detailsRight}>4 Days</span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={poolStyles.detailsRow}>*/}
                            {/*    <div className={poolStyles.detailsColumn}>*/}
                            {/*        <span className={poolStyles.detailsLeft}>Total LP Staked</span>*/}
                            {/*    </div>*/}
                            {/*    <div className={poolStyles.detailsColumn}>*/}
                            {/*        <span className={poolStyles.detailsRight}>{zmbeLpLocked} ($ {lpValue.toFixed(2)})</span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className={poolStyles.detailsRow}>*/}
                            {/*    <div className={poolStyles.detailsColumn}>*/}
                            {/*        <span className={poolStyles.detailsLeft}>Contract</span>*/}
                            {/*    </div>*/}
                            {/*    <div className={poolStyles.detailsColumn}>*/}
                            {/*        <span className={poolStyles.detailsRight}>*/}
                            {/*            <Link*/}
                            {/*                href="https://bscscan.com/address/0x5a87d0173a2a22579b878a27048c8a9b09bff496"*/}
                            {/*                passHref={true}*/}
                            {/*                className={poolStyles.detailsContractLink}>*/}
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
                <div className={poolStyles.collectionCard}>
                    <div className={poolStyles.imageWrapper}>
                        <Image
                            src={babyCardCover}
                            width={500}
                            height={500}
                            alt="Eternal Zombies Collection"
                            className={poolStyles.coverImage}
                        ></Image>
                    </div>
                    <div className={poolStyles.bottomContainer}>
                        <div className={poolStyles.bottomHeadingContainer}>
                            <h3>BABY pool</h3>
                        </div>
                        <div className={poolStyles.detailsContainer}>
                            <div className={poolStyles.detailsRow}>
                                <div className={poolStyles.detailsColumn}>
                                    <span className={poolStyles.detailsLeft}>Pool</span>
                                </div>
                                <div className={poolStyles.detailsColumn}>
                                    <span className={poolStyles.detailsRight}>Babyswap BABY-BNB LP pool</span>
                                </div>
                            </div>
                            <div className={poolStyles.detailsRow}>
                                <div className={poolStyles.detailsColumn}>
                                    <span className={poolStyles.detailsLeft}>Earns</span>
                                </div>
                                <div className={poolStyles.detailsColumn}>
                                    <span className={poolStyles.detailsRight}>BABY</span>
                                </div>
                            </div>
                            {/*<div className={poolStyles.detailsRow}>*/}
                            {/*    <div className={poolStyles.detailsColumn}>*/}
                            {/*        <span>Contract</span>*/}
                            {/*    </div>*/}
                            {/*    <div className={poolStyles.detailsColumn}>*/}
                            {/*        <span>*/}
                            {/*            <a href="https://bscscan.com/address/0x5a87d0173a2a22579b878a27048c8a9b09bff496">0x5a87d...ff496</a>*/}
                            {/*        </span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className={poolStyles.detailsComingSoon}>
                                <h2>Coming soon!</h2>
                            </div>
                        </div>
                    </div>
                    {/*<Link href="./eternalzombies" className={poolStyles.link}></Link>*/}
                </div>
            </div>
        </div>
    )
}

export default Pools;
