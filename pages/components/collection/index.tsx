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

    return (
        <div id="collections" className={styles.preview}>
            <div className={styles.previewHeaderWrapper}>
                <h3 className={styles.previewHeader}>We have moved on to EternalLabs.finance!</h3>
            </div>
            <div className={styles.previewHeaderWrapper}>
                <Link
                    href="https://eternallabs.finance"
                    passHref={true}
                    className={collectionStyles.detailsContractLink}>
                    <a target="_blank"><span style={{color: 'aquamarine'}} id="span_element">Click here to go to EternalLabs.finance</span></a>
                </Link>
            </div>
        </div>
    )
}

export default Collections;
