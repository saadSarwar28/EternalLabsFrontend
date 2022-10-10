import styles from '../../../styles/Home.module.css';
import React from 'react';



export const Header = () => {

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
                {/*<p className={styles.introText}>*/}
                {/*    Binance Smart Chain yield optimizer platform*/}
                {/*</p>*/}
            </div>
        </div>
    )
}

export default Header
