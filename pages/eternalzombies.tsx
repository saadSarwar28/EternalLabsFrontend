import type {NextPage} from 'next'
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'
import styles from '../styles/Ez.module.css'
import "react-multi-carousel/lib/styles.css";
import {Ez} from './components/ez';

const EternalZombies: NextPage = () => {

    return (
        <div className={styles.container}>
            <Head>
                <title>Eternal Labs</title>
                <meta name="eternallabs.finance" content="Binance Smart Chain yield optimizer platform"/>
                <meta name="google-site-verification" content="mLdpfYdmDazUVMLZ9NWfUwH7wBnmMmtb374Hgz6ZiBk"/>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet"/>
            </Head>
            <Ez/>
        </div>
    )
}

export default EternalZombies
