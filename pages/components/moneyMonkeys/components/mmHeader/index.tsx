import styles from '../../../../../styles/Mm.module.css';
import React from 'react';
import {MmClaimCard} from '../claim';
import MmMintCard from '../mmMintCard';

export const MmHeader = () => {

    return (
        <div className={styles.introduction}>
            <MmMintCard/>
            <MmClaimCard/>
        </div>
    )
}

export default MmHeader
