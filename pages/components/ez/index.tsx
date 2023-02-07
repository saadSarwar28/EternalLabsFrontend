import styles from '../../../styles/Ez.module.css';
import React from 'react';
import {EzNavbar} from './components/ezNavbar';
import {EzHeader} from './components/ezHeader';
import {Footer} from '../footer';
import {useDispatch, useSelector} from 'react-redux';
import {selectCreateAccountState, updatePendingZmbe} from '../../../reduxStore/accountSlice';

export const Ez = () => {

    const dispatch = useDispatch()

    // @ts-ignore
    const {userData} = useSelector(
        selectCreateAccountState
    )

    if (userData.walletConnected) {
        dispatch(
            // @ts-ignore
            updatePendingZmbe(userData.account)
        )
    }

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
