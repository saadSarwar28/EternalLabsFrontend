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
import Pools from './components/pools';
import {
    updateCakePoolApr,
    updateCakeYield, updateMainstYield,
    updateRugzombiePancakeswapTombApr,
    updateZmbeYield
} from '../reduxStore/accountSlice';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../reduxStore';
import Bounty from './components/bounty';


const Home: NextPage = () => {

    const dispatch = useDispatch<AppDispatch>();
    // dispatch(
    //     updateRugzombiePancakeswapTombApr()
    // )
    // dispatch(
    //     updateCakePoolApr()
    // )
    dispatch(updateZmbeYield())
    dispatch(updateCakeYield())
    dispatch(updateMainstYield())

    return (
        <div className={styles.container}>
            <ToastContainer/>
            <Head>
                <title>Eternal Labs</title>
                <meta name="eternallabs.finance" content="Binance Smart Chain yield optimizer platform"/>
                <meta name="google-site-verification" content="mLdpfYdmDazUVMLZ9NWfUwH7wBnmMmtb374Hgz6ZiBk"/>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
            </Head>
            <main className={styles.main}>
                <div className={styles.containerCard}>
                    <Navbar/>
                    <Header/>
                    <Bounty/>
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
