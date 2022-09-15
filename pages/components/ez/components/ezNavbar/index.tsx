import styles from '../../../../../styles/Ez.module.css';
import {isMobile} from 'react-device-detect';
import React, {useState} from 'react';

export const EzNavbar = () => {

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
                <li className={styles.navLinks} onClick={closeNavBar}><a href="/#home">Back to Home</a></li>
                {/*{isMobile ? <hr/> : null}*/}
                {/*<li className={styles.navLinks} onClick={closeNavBar}><a href="#collections">Collections</a>*/}
                {/*</li>*/}
                {/*{isMobile ? <hr/> : null}*/}
                {/*<li className={styles.navLinks} onClick={closeNavBar}><a href="#roadmap">Roadmap</a>*/}
                {/*</li>*/}
                {/*{isMobile ? <hr/> : null}*/}
                {/*<li className={styles.navLinks} onClick={closeNavBar}><a href="#team">Team</a></li>*/}
            </ul>
            <a href="https://docs.eternalzombies.com/welcome-to-eternal-zombies" target="_blank"
               className={styles.docsButtonNav} rel="noreferrer">Read The Docs</a>
        </nav>
    )
}
