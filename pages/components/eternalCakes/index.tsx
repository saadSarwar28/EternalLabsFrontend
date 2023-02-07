import styles from '../../../styles/Ec.module.css';
import React from 'react';
import {EcNavbar} from './components/ecNavbar';
import {EcHeader} from './components/ecHeader';
import {Footer} from '../footer';
import {useDispatch, useSelector} from 'react-redux';
import {selectCreateAccountState, updatePendingCake} from '../../../reduxStore/accountSlice';

export const EternalCakes = () => {

    const dispatch = useDispatch()

    // @ts-ignore
    const {userData} = useSelector(
        selectCreateAccountState
    )

    if (userData.walletConnected) {
        dispatch(
            // @ts-ignore
            updatePendingCake(userData.account)
        )
    }

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
