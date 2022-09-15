import type {NextPage} from 'next'
import React from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import "react-multi-carousel/lib/styles.css";
import {Collections} from './components/collection';
import {Footer} from './components/footer';
import {Team} from './components/team';
import {Roadmap} from './components/roadmap';
import {Header} from './components/header';
import {Navbar} from './components/navbar';

const Home: NextPage = () => {

    return (
        <div className={styles.container}>
            <ToastContainer/>
            <Head>
                <title>Eternal Zombies</title>
                <meta name="eternalzombies.com" content="a collection of 1111 intrinsic value yield bearing NFTs"/>
                <meta name="google-site-verification" content="mLdpfYdmDazUVMLZ9NWfUwH7wBnmMmtb374Hgz6ZiBk"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <div className={styles.containerCard}>
                    <div className={styles.header}>
                        <Navbar/>
                        <Header/>
                    </div>
                    <Collections/>
                    <Roadmap/>
                    <Team/>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default Home
