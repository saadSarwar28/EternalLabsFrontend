import styles from '../../../styles/Mm.module.css';
import React from 'react';
import {Footer} from '../footer';
import MmNavbar from './components/mmNavbar';
import MmHeader from './components/mmHeader';
import MmBountyCard from './components/mmBounty';

export const MoneyMonkeys = () => {
    return (
        <>
            <main className={styles.main}>
                <div className={styles.containerCard}>
                    <div className={styles.header}>
                        <MmNavbar/>
                        <MmBountyCard/>
                        <MmHeader/>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default MoneyMonkeys;
