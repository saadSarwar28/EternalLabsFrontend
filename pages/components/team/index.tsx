import styles from '../../../styles/Home.module.css';
import React from 'react';

export const Team = () => {
    return (
        <div id="team" className={styles.team}>
            <div className={styles.previewHeaderWrapper}>
                <h1 className={styles.previewHeader}>Meet the team</h1>
            </div>
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
            </div>
        </div>
    )
}
