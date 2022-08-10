import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import roadmapStyles from '../styles/Timeline.module.css'
import {BrowserView, MobileView, isBrowser, isMobile} from 'react-device-detect';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {useState} from 'react';


const Home: NextPage = () => {

    const responsive = {
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    const [isNavExpanded, setIsNavExpanded] = useState(false)

    const toggleNavBar = () => {
        setIsNavExpanded(!isNavExpanded)
    }

    const closeNavBar = () => {
        setIsNavExpanded(false)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Eternal Zombies</title>
                <meta name="eternalzombies.com" content="a collection of 1111 intrinsic value yeild bearing nfts"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <div className={styles.containerCard}>
                    <div className={styles.header}>
                        <nav className={styles.nav}>
                            <div className={styles.logoWrapper}>
                                <img
                                    src="/EZLogo1.png"
                                    alt="Eternal Zombies"
                                    className={styles.logo}
                                />
                            </div>
                            <button className={styles.hamburger} onClick={toggleNavBar}>
                                <img src="/menu.png"/>
                            </button>
                            <ul className={isNavExpanded ? styles.navListMobile : styles.navList}>
                                <li className={styles.navLinks} onClick={closeNavBar}><a href="#home">Home</a></li>
                                <hr/>
                                <li className={styles.navLinks} onClick={closeNavBar}><a href="#preview">Preview</a>
                                </li>
                                <hr/>
                                <li className={styles.navLinks} onClick={closeNavBar}><a href="#roadmap">Roadmap</a>
                                </li>
                                <hr/>
                                <li className={styles.navLinks} onClick={closeNavBar}><a href="#team">Team</a></li>
                            </ul>
                            <button className={styles.discordButtonNav}>Discord</button>
                        </nav>
                        <div id="home" className={styles.introduction}>
                            <div className={styles.introWrapper}>
                                <h2 className={styles.introHeading}>Eternal Zombies</h2>
                                <p className={styles.introText}>
                                    A collection of 1111 yield bearing zombies that keep rewarding their holders with
                                    $ZMBE tokens for eternity
                                </p>
                            </div>
                            <div className={styles.mintCard}>
                                <p>Stay tuned! Mint will be live soon!</p>
                                <p>Join our discord server for further updates.</p>
                                <a href="https://discordapp.com/users/964997634563637258" target="_blank"
                                   rel="noreferrer" className={styles.discordButton}>Discord</a>
                            </div>
                        </div>
                    </div>
                    <div id="preview" className={styles.preview}>
                        <div className={styles.previewHeaderWrapper}>
                            <h3 className={styles.previewHeader}>Have a sneak peak into our collection!</h3>
                        </div>
                        <Carousel
                            swipeable={true}
                            draggable={false}
                            showDots={false}
                            responsive={responsive}
                            ssr={true} // means to render carousel on server-side.
                            infinite={true}
                            autoPlay={true}
                            autoPlaySpeed={2000}
                            keyBoardControl={true}
                            customTransition="all .5"
                            transitionDuration={500}
                            containerClass="carousel-container"
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            dotListClass="custom-dot-list-style"
                            itemClass="carousel-item-padding-40-px"
                        >
                            <div>
                                <img className={styles.carouselItems} src="/preview/1.png"/>
                            </div>
                            <div>
                                <img className={styles.carouselItems} src="/preview/2.png"/>
                            </div>
                            <div>
                                <img className={styles.carouselItems} src="/preview/3.png"/>
                            </div>
                            <div>
                                <img className={styles.carouselItems} src="/preview/4.png"/>
                            </div>
                            <div>
                                <img className={styles.carouselItems} src="/preview/5.png"/>
                            </div>
                            <div>
                                <img className={styles.carouselItems} src="/preview/6.png"/>
                            </div>
                            <div>
                                <img className={styles.carouselItems} src="/preview/7.png"/>
                            </div>
                            <div>
                                <img className={styles.carouselItems} src="/preview/8.png"/>
                            </div>
                            <div>
                                <img className={styles.carouselItems} src="/preview/9.png"/>
                            </div>
                            <div>
                                <img className={styles.carouselItems} src="/preview/10.png"/>
                            </div>
                        </Carousel>
                    </div>
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
                                        15-08-2022
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
                                        01-09-2022
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
                                        01-10-2022
                                    </div>
                                    <div className={styles.timeline__event__content}>
                                        <div className={styles.timeline__event__title}>
                                            The DAO
                                        </div>
                                        <div className={styles.timeline__event__description}>
                                            <p>Launch the EZ DAO, yeah that is right, we will giving the power to decide
                                                about the
                                                next collection to the EZ holders. Along with that, the EZ holders will
                                                be able to make
                                                certain critical decisions about the future of EZ collection
                                                metrics.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.timeline__event__two}>
                                    <div className={styles.timeline__event__icon__two}>
                                        <h3>4</h3>
                                    </div>
                                    <div className={styles.timeline__separator}></div>
                                    <div className={styles.timeline__event__date__two}>
                                        01-11-2022
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
                    <div id="team" className={styles.team}>
                        <div className={styles.previewHeaderWrapper}>
                            <h1 className={styles.previewHeader}>Meet the team</h1>
                        </div>
                        <div className={styles.teamInfoContainer}>
                            <div className={styles.teamMemberContainer}>
                                <img src="/team/saad.png" className={styles.teamMemberImage}/>
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
                                    className={styles.teamMemberImage}/>
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
                </div>
            </main>
            <footer className={styles.footer}>
                <div className={styles.footerWrapper}>
                    <div className={styles.logoWrapper}>
                        <img
                            src="/EZLogo1.png"
                            alt="Eternal Zombies"
                            className={styles.logo}
                        />
                    </div>
                    <div className={styles.footerLinks}>
                        <ul className={styles.footerList}>
                            <li>
                                <a className={styles.footerListLinks}
                                   href="https://discordapp.com/users/964997634563637258" target="_blank"
                                   rel="noreferrer">
                                    <img src="/discord-brands.png" height={30} width={30}/>
                                </a>
                            </li>
                            <li>
                                <a className={styles.footerListLinks} href="https://t.me/EternalZombies" target="_blank"
                                   rel="noreferrer">
                                    <img src="/telegram-brands.png" height={30} width={30}/>
                                </a>
                            </li>
                            <li>
                                <a className={styles.footerListLinks}
                                   href="https://twitter.com/EternalZombies?s=20&t=fZpZNbcCbPBtdlfNGMAgqA"
                                   target="_blank" rel="noreferrer">
                                    <img src="/twitter-logo.png" height={30} width={30}/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <br/>
                <p className={styles.copyright}>All rights reserved © Eternal Zombies</p>
            </footer>
        </div>
    )
}

export default Home
