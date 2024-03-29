import styles from '../../../styles/Home.module.css';
import {isMobile} from 'react-device-detect';
import React, {useEffect, useState} from 'react';
import Link from 'next/link';

export const Navbar = () => {

    const [_isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(isMobile)
    }, [])

    const [isNavExpanded, setIsNavExpanded] = useState(false)

    const toggleNavBar = () => {
        setIsNavExpanded(!isNavExpanded)
    }

    const closeNavBar = () => {
        setIsNavExpanded(false)
    }

    const [displayBackground, setDisplayBackground] = useState(false)
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {passive: true});

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (scrollPosition === 0) {
            setDisplayBackground(false)
        } else {
            setDisplayBackground(true)
        }
    }, [scrollPosition])

    return (
        <nav className={
            _isMobile ? styles.nav : displayBackground ? styles.navLocked : styles.nav
        }>
            {/*<div className={styles.logoWrapper}>*/}
            {/*<img*/}
            {/*    src="/eternal_labs_logo.png"*/}
            {/*    alt="EternalLabs"*/}
            {/*    className={styles.logo}*/}
            {/*/>*/}
            {/*</div>*/}
            <button className={styles.hamburger} onClick={toggleNavBar}>
                <img src="/icons8-menu-squared-96.svg" style={{height: '50px'}}/>
            </button>
            <div className={styles.navButtonContainer}></div>
            <ul className={isNavExpanded ? styles.navListMobile : styles.navList}>
                <li className={styles.navLinks} onClick={closeNavBar}><Link href="#home"><a>Home</a></Link></li>
                {/*{isMobile ? <hr/> : null}*/}
                <li className={styles.navLinks} onClick={closeNavBar}><Link href="#collections"><a>Collections</a></Link></li>
                {/*{isMobile ? <hr/> : null}*/}
                <li className={styles.navLinks} onClick={closeNavBar}><Link href="#pools"><a>Pools</a></Link></li>
                {/*{isMobile ? <hr/> : null}*/}
                {/*<li className={styles.navLinks} onClick={closeNavBar}><Link href="#roadmap"><a>Roadmap</a></Link></li>*/}
                {/*{isMobile ? <hr/> : null}*/}
                <li className={styles.navLinks} onClick={closeNavBar}><Link href="#team"><a>Team</a></Link></li>
            </ul>
            <div className={styles.navButtonContainer}>
                <Link href="https://docs.eternallabs.finance/welcome-to-eternallabs">
                    <a target="_blank" className={styles.docsButtonNav} rel="noreferrer">Read The Docs</a>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar
