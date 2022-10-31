import styles from '../../../styles/Ec.module.css';
import React from 'react';
import {EcNavbar} from './components/ecNavbar';
import {EcHeader} from './components/ecHeader';
import {Footer} from '../footer';
import EcBountyCard from './components/ecBounty';

export const EternalCakes = () => {
    return (
        <>
            <main className={styles.main}>
                <div className={styles.containerCard}>
                    <div className={styles.header}>
                        <EcNavbar/>
                        {/*<EcBountyCard/>*/}
                        <EcHeader/>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default EternalCakes;
