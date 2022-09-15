import styles from '../../../../../styles/Ez.module.css';
import React from 'react';
import {EzMintCard} from '../ezMintCard';
import {EzLotteryCard} from '../ezLotteryCard';
import {EzClaimCard} from '../claim';

export const EzHeader = () => {

    return (
        <div id="home" className={styles.introduction}>
            <EzMintCard/>
            <EzClaimCard/>
            {/*<EzLotteryCard/>*/}
        </div>
    )
}
