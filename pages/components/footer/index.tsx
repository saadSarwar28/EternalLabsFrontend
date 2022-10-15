import styles from '../../../styles/Home.module.css';
import React from 'react';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerWrapper}>
                <div className={styles.logoWrapper}>
                    <img
                        src="/EternalLabs_Logo_V2_without_text.svg"
                        alt="EternalLabs"
                        className={styles.logoFooter}
                    />
                </div>
                <div className={styles.footerLinks}>
                    <ul className={styles.footerList}>
                        <li>
                            <a className={styles.footerListLinks}
                               href="https://discord.gg/2qFsymKv" target="_blank" rel="noreferrer">
                                <img src="/discord-brands.png" height={30} width={30} alt="discord"/>
                            </a>
                        </li>
                        <li>
                            <a className={styles.footerListLinks} href="https://t.me/EternalLabs" target="_blank"
                               rel="noreferrer">
                                <img src="/telegram-brands.png" height={30} width={30} alt="telegram"/>
                            </a>
                        </li>
                        <li>
                            <a className={styles.footerListLinks}
                               href="https://twitter.com/EternalLabs__"
                               target="_blank" rel="noreferrer">
                                <img src="/twitter-logo.png" height={30} width={30} alt="twitter"/>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <br/>
            <p className={styles.copyright}>All rights reserved © EternalLabs</p>
        </footer>
    )
}

export default Footer;
