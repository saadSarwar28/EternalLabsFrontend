import type {NextPage} from 'next'
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'
import styles from '../styles/Mm.module.css'
import MoneyMonkeys from './components/moneyMonkeys';

const MoneyMonkeysPage: NextPage = () => {

    return (
        <div className={styles.container}>
            <Head>
                <title>Eternal Labs</title>
                <meta name="eternallabs.finance" content="Binance Smart Chain yield optimizer platform"/>
                <meta name="google-site-verification" content="mLdpfYdmDazUVMLZ9NWfUwH7wBnmMmtb374Hgz6ZiBk"/>
                <link rel="icon" href="/favicon.ico"/>
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8271132260511114" crossOrigin="anonymous"></script>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet"/>
            </Head>
            <MoneyMonkeys/>
        </div>
    )
}

export default MoneyMonkeysPage
