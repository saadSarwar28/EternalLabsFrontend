import styles from '../../../styles/Home.module.css';
import React, {useEffect, useState} from 'react';
import {isMobile} from 'react-device-detect';

export const Team = () => {

    const [showCards, setShowCards] = useState(false)
    const [offset, setOffset] = useState(0);
    const [_isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(isMobile)
    }, [])

    useEffect(() => {
        if (!showCards) {
            if (window.pageYOffset > (_isMobile ? 4250 : 2300)) {
                setShowCards(true)
            }
            const onScroll = () => setOffset(window.pageYOffset);
            // clean up code
            window.removeEventListener('scroll', onScroll);
            window.addEventListener('scroll', onScroll, {passive: true});
            return () => window.removeEventListener('scroll', onScroll);
        }
    }, []);

    useEffect(() => {
        if (offset > (_isMobile ? 4250 : 2300)) {
            setShowCards(true)
        }
    }, [offset])

    return (
        <div id="team" className={styles.team}>
            <div className={styles.previewHeaderWrapper}>
                <h1 className={styles.previewHeader}>Meet the team</h1>
            </div>
            {
                showCards ?
                    <div className={styles.teamInfoContainer}>
                        <div className={styles.teamMemberContainer}>
                            <img src="/team/saad.png" className={styles.teamMemberImage} alt="Saad Sarwar"/>
                            <div className={styles.teamMemberTextContainer}>
                                <h3 className={styles.teamMemberName}>Saad Sarwar</h3>
                                <h2 className={styles.teamMemberTitle}>The Engineer</h2>
                                <a className={styles.teamMemberLink}
                                   href="https://discordapp.com/users/782332876460916736" target="_blank"
                                   rel="noreferrer">@saad_sarwar</a>
                            </div>
                        </div>
                        <div className={styles.teamMemberContainer}>
                            <img
                                src="https://media.discordapp.net/attachments/935228255982731264/1006562526831595652/4.gif?width=675&height=675"
                                className={styles.teamMemberImage} alt="CanadianCryptoJunkie"/>
                            <div className={styles.teamMemberTextContainer}>
                                <h3 className={styles.teamMemberName}>CanadianCryptoJunkie</h3>
                                <h2 className={styles.teamMemberTitle}>The Artist</h2>
                                <a className={styles.teamMemberLink}
                                   href="https://discordapp.com/users/240226213128306688" target="_blank"
                                   rel="noreferrer">@Canadian Crypto Junkie 🍁</a>
                            </div>
                        </div>
                    </div> : null
            }
        </div>
    )
}

export default Team
