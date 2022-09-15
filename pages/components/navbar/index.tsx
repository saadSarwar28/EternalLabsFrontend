import styles from '../../../styles/Home.module.css';
import {isMobile} from 'react-device-detect';
import React, {useState} from 'react';
import Link from 'next/link';

export const Navbar = () => {

    const [isNavExpanded, setIsNavExpanded] = useState(false)

    const toggleNavBar = () => {
        setIsNavExpanded(!isNavExpanded)
    }

    const closeNavBar = () => {
        setIsNavExpanded(false)
    }

    return (
        <nav className={styles.nav}>
            <div className={styles.logoWrapper}>
                <img
                    src="/EZLogo1.png"
                    alt="Eternal Zombies"
                    className={styles.logo}
                />
            </div>
            <button className={styles.hamburger} onClick={toggleNavBar}>
                <img src="/menu.png"/>
            </button>
            <ul className={isNavExpanded ? styles.navListMobile : styles.navList}>
                <li className={styles.navLinks} onClick={closeNavBar}><Link href="#home"><a>Home</a></Link></li>
                {isMobile ? <hr/> : null}
                <li className={styles.navLinks} onClick={closeNavBar}><Link href="#collections"><a>Collections</a></Link>
                </li>
                {isMobile ? <hr/> : null}
                <li className={styles.navLinks} onClick={closeNavBar}><Link href="#roadmap"><a>Roadmap</a></Link>
                </li>
                {isMobile ? <hr/> : null}
                <li className={styles.navLinks} onClick={closeNavBar}><Link href="#team"><a>Team</a></Link></li>
            </ul>
            <Link href="https://docs.eternalzombies.com/welcome-to-eternal-zombies"><a target="_blank"
               className={styles.docsButtonNav} rel="noreferrer">Read The Docs</a></Link>
        </nav>
    )
}

export default Navbar
