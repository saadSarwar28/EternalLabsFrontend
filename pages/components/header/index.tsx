import styles from '../../../styles/Home.module.css';
import React, {useEffect, useState} from 'react';
import Web3 from 'web3';
import {isMobile} from 'react-device-detect';
import minterABI from '../../../abi/minter.json';
import {getMinterAddress} from '../../../utils/getContractAddress';
import WHITELIST from '../../../utils/whitelist';
import {MerkleTree} from 'merkletreejs';
import {notifyInfo, notifyError, notifySuccess} from '../../../utils/toast';
import {MintCard} from './components/mintCard';


export const Header = () => {

    return (
        <div id="home" className={styles.introduction}>
            <div className={styles.introWrapper}>
                <h2 className={styles.introHeading}>Eternal Zombies</h2>
                <p className={styles.introText}>
                    Bored of plain old worthless NFTs that do not hold any value??<br/><br/> Try Eternal
                    Zombies...
                </p>
            </div>
            {/*<MintCard/>*/}
        </div>
    )
}
