import styles from '../../../styles/Home.module.css';
import React from 'react';

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
        </div>
    )
}

export default Header
