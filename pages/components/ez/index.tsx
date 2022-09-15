import styles from '../../../styles/Ez.module.css';
import React from 'react';
import {EzNavbar} from './components/ezNavbar';
import {EzHeader} from './components/ezHeader';
import {Footer} from '../footer';

export const Ez = () => {
    return (
        <>
            <main className={styles.main}>
                <div className={styles.containerCard}>
                    <div className={styles.header}>
                        <EzNavbar/>
                        <EzHeader/>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default Ez;
