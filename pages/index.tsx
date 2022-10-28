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
import {useCallback} from "react";
import type {Container, Engine} from "tsparticles-engine";
import Particles from "react-particles";
import {loadFull} from "tsparticles";
import CONSTANTS from '../utils/constants';
import ParticlesBackground from './components/Particles';
import Pools from './components/pools';
import halloweenBackground from '../public/HalloweenBG.png'
import {isMobile} from 'react-device-detect';


const Home: NextPage = () => {

    return (
        <div className={styles.container}>
            <ToastContainer/>
            <Head>
                <title>Eternal Labs</title>
                <meta name="eternallabs.finance" content="Binance Smart Chain yield optimizer platform"/>
                <meta name="google-site-verification" content="mLdpfYdmDazUVMLZ9NWfUwH7wBnmMmtb374Hgz6ZiBk"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <div className={styles.containerCard}>
                    <div className={styles.header} style={{backgroundImage: `url(${halloweenBackground.src})`}}>
                        {/*<ParticlesBackground/>*/}
                        <Navbar/>
                        <Header/>
                    </div>
                    <Collections/>
                    <Pools/>
                    {/*<Roadmap/>*/}
                    <Team/>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default Home
