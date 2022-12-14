import styles from '../../../styles/Mm.module.css';
import React from 'react';
import {Footer} from '../footer';
import MmNavbar from './components/mmNavbar';
import MmHeader from './components/mmHeader';
import MmBountyCard from './components/mmBounty';
import {useDispatch, useSelector} from 'react-redux';
import {selectCreateAccountState, updatePendingMainst} from '../../../reduxStore/accountSlice';

export const MoneyMonkeys = () => {

    const dispatch = useDispatch()

    // @ts-ignore
    const {userData} = useSelector(
        selectCreateAccountState
    )

    if (userData.walletConnected) {
        dispatch(
            // @ts-ignore
            updatePendingMainst(userData.account)
        )
    }

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
