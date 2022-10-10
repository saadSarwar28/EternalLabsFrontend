import styles from '../../../../../styles/Ez.module.css';
import React from 'react';
import {EcMintCard} from '../ecMintCard';
import {EcClaimCard} from '../claim';

export const EcHeader = () => {

    return (
        <div id="home" className={styles.introduction}>
            <EcMintCard/>
            <EcClaimCard/>
            {/*<EzLotteryCard/>*/}
        </div>
    )
}

export default EcHeader
