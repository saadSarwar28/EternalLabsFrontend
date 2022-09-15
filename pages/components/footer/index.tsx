import styles from '../../../styles/Home.module.css';
import React from 'react';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerWrapper}>
                <div className={styles.logoWrapper}>
                    <img
                        src="/EZLogo1.png"
                        alt="Eternal Zombies"
                        className={styles.logo}
                    />
                </div>
                <div className={styles.footerLinks}>
                    <ul className={styles.footerList}>
                        <li>
                            <a className={styles.footerListLinks}
                               href="https://discord.gg/gnN7k9am83" target="_blank" rel="noreferrer">
                                <img src="/discord-brands.png" height={30} width={30} alt="discord"/>
                            </a>
                        </li>
                        <li>
                            <a className={styles.footerListLinks} href="https://t.me/EternalZombies" target="_blank"
                               rel="noreferrer">
                                <img src="/telegram-brands.png" height={30} width={30} alt="telegram"/>
                            </a>
                        </li>
                        <li>
                            <a className={styles.footerListLinks}
                               href="https://twitter.com/EternalZombies?s=20&t=fZpZNbcCbPBtdlfNGMAgqA"
                               target="_blank" rel="noreferrer">
                                <img src="/twitter-logo.png" height={30} width={30} alt="twitter"/>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <br/>
            <p className={styles.copyright}>All rights reserved © Eternal Zombies</p>
        </footer>
    )
}
