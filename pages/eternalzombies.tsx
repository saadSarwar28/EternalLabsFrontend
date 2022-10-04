import type {NextPage} from 'next'
import React from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'
import styles from '../styles/Ez.module.css'
import "react-multi-carousel/lib/styles.css";
import {Footer} from './components/footer';
import {Ez} from './components/ez';

const EternalZombies: NextPage = () => {

    return (
        <div className={styles.container}>
            <Head>
                <title>Eternal Labs</title>
                <meta name="eternallabs.finance" content="Binance Smart Chain yield optimizer platform"/>
                <meta name="google-site-verification" content="mLdpfYdmDazUVMLZ9NWfUwH7wBnmMmtb374Hgz6ZiBk"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Ez/>
        </div>
    )
}

export default EternalZombies
