import styles from '../../../styles/Home.module.css';
import React from 'react';
import {useSelector} from 'react-redux';
import {selectCreateAccountState} from '../../../reduxStore/accountSlice';


export const Header = () => {

    // @ts-ignore
    const {tvl} = useSelector(
        selectCreateAccountState
    )

    return (
        <div id="home" className={styles.introduction}>
            <div className={styles.introWrapper}>
                <div className={styles.logoWrapper}>
                    <img
                        src="/EternalLabs_Logo_V2.svg"
                        alt="EternalLabs"
                        className={styles.logo}
                    />
                </div>
                <h2 className={styles.introHeading}>Binance Smart Chain yield optimizer platform</h2>
                <div className={styles.tvlContainer}>
                    <h2 className={styles.tvlHeading}>TVL</h2>&nbsp;&nbsp;&nbsp;&nbsp;
                    <h2 className={styles.tvlValue}>${Number(tvl).toFixed(2)}</h2>
                </div>
                {/*<p className={styles.introText}>*/}
                {/*    Binance Smart Chain yield optimizer platform*/}
                {/*</p>*/}
            </div>
        </div>
    )
}

export default Header
