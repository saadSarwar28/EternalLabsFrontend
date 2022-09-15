import styles from '../../../styles/Home.module.css';
import React from 'react';

export const Roadmap = () => {
    return (
        <div id="roadmap" className={styles.roadmap}>
            <div className={styles.roadmapHeaderWrapper}>
                <h1 className={styles.roadmapHeader}>Where are we headed?</h1>
            </div>
            <div className={styles.roadmapContainer}>
                <div className={styles.timeline}>
                    {/*<div className="timeline__event  animated fadeInUp delay-3s timeline__event--type1">*/}
                    <div className={styles.timeline__event__one}>
                        <div className={styles.timeline__event__icon__one}>
                            <h3>1</h3>
                        </div>
                        <div className={styles.timeline__separator}></div>
                        <div className={styles.timeline__event__date}>
                            01-09-2022
                        </div>
                        <div className={styles.timeline__event__content}>
                            <div className={styles.timeline__event__title}>
                                The Uprising
                            </div>
                            <div className={styles.timeline__event__description}>
                                <p>Website launch, first collection launch, community building, collabs,
                                    AMAs and marketing.</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.timeline__event__two}>
                        <div className={styles.timeline__event__icon__two}>
                            <h3>2</h3>
                        </div>
                        <div className={styles.timeline__separator}></div>
                        <div className={styles.timeline__event__date__two}>
                            TBA
                        </div>
                        <div className={styles.timeline__event__content__two}>
                            <div className={styles.timeline__event__title}>
                                The Cake Feast
                            </div>
                            <div className={styles.timeline__event__description}>
                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                <p>Second collection launch, most probably for PancakeSwap's CAKE tokens(Yet
                                    to be decided). More focus on community building, more collabs and
                                    marketting.</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.timeline__event__one}>
                        <div className={styles.timeline__event__icon__one}>
                            <h3>3</h3>
                        </div>
                        <div className={styles.timeline__separator}></div>
                        <div className={styles.timeline__event__date}>
                            TBA
                        </div>
                        <div className={styles.timeline__event__content}>
                            <div className={styles.timeline__event__title}>
                                The DAO
                            </div>
                            <div className={styles.timeline__event__description}>
                                <p>
                                    Launch the EZ DAO, yeah that is right, we will be giving the power to
                                    decide about the next collection to the EZ holders. Along with that,
                                    the EZ holders will be able to make certain critical decisions about
                                    the future of EZ collection metrics.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.timeline__event__two}>
                        <div className={styles.timeline__event__icon__two}>
                            <h3>4</h3>
                        </div>
                        <div className={styles.timeline__separator}></div>
                        <div className={styles.timeline__event__date__two}>
                            TBA
                        </div>
                        <div className={styles.timeline__event__content__two}>
                            <div className={styles.timeline__event__title}>
                                The DAO celebrations
                            </div>
                            <div className={styles.timeline__event__description}>
                                <p>Third collection launch based on the votings and proposals submitted in
                                    the EZ DAO. There is more to come. Stay tuned!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Roadmap
