import {useCallback} from "react";
import type {Engine} from "tsparticles-engine";
import Particles from "react-particles";
import {loadFull} from "tsparticles";
import styles from '../../../styles/Home.module.css';
import {isMobile} from 'react-device-detect';

const ParticlesBackground = () => {

    const particlesInit = useCallback(async (engine: Engine) => {
        // console.log(engine);

        // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    // const particlesLoaded = useCallback(async (container: Container | undefined) => {
    //     // await console.log(container);
    // }, []);

    const options: any = {
        fullScreen: {enable: false, zIndex: 0},
        particles: {
            color: {
                value: "#FF0000",
                animation: {
                    enable: true,
                    speed: 10
                }
            },
            move: {
                attract: {
                    enable: true,
                    rotate: {
                        distance: 100,
                        x: 2000,
                        y: 2000
                    }
                },
                direction: "none",
                enable: true,
                outModes: {
                    default: "destroy"
                },
                path: {
                    clamp: false,
                    enable: true,
                    delay: {
                        value: 0
                    },
                    generator: "polygonPathGenerator",
                    options: {
                        sides: 6,
                        turnSteps: 30,
                        angle: 30
                    }
                },
                random: false,
                speed: 3,
                straight: false,
                trail: {
                    fillColor: "#000",
                    length: 20,
                    enable: true
                }
            },
            number: {
                density: {
                    enable: true,
                    area: 800
                },
                value: 0
            },
            opacity: {
                value: 1
            },
            shape: {
                type: "circle"
            },
            size: {
                value: 2
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse"
                }
            },
            modes: {
                repulse: {
                    distance: 50,
                    duration: 0.4
                }
            }
        },
        background: {
            color: "#000"
        },
        // fullScreen: {
        //     zIndex: -1
        // },
        emitters: {
            direction: "none",
            rate: {
                quantity: 1,
                delay: 0.25
            },
            size: {
                width: 0,
                height: 0
            },
            position: {
                x: 50,
                y: 50
            }
        }
    }

    const mobileOptions: any = {
        fullScreen: {enable: false, zIndex: 0},
        particles: {
            color: {
                value: "#FF0000",
                animation: {
                    enable: true,
                    speed: 10
                }
            },
            move: {
                attract: {
                    enable: true,
                    rotate: {
                        distance: 100,
                        x: 3000,
                        y: 3000
                    }
                },
                direction: "none",
                enable: true,
                outModes: {
                    default: "destroy"
                },
                path: {
                    clamp: false,
                    enable: true,
                    delay: {
                        value: 0
                    },
                    generator: "polygonPathGenerator",
                    options: {
                        sides: 6,
                        turnSteps: 30,
                        angle: 30
                    }
                },
                random: false,
                speed: 3,
                straight: false,
                trail: {
                    fillColor: "#000",
                    length: 20,
                    enable: true
                }
            },
            number: {
                density: {
                    enable: true,
                    area: 800
                },
                value: 0
            },
            opacity: {
                value: 1
            },
            shape: {
                type: "circle"
            },
            size: {
                value: 2
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse"
                }
            },
            modes: {
                repulse: {
                    distance: 50,
                    duration: 0.4
                }
            }
        },
        background: {
            color: "#000"
        },
        // fullScreen: {
        //     zIndex: -1
        // },
        emitters: {
            direction: "none",
            rate: {
                quantity: 1,
                delay: 0.25
            },
            size: {
                width: 0,
                height: 0
            },
            position: {
                x: 50,
                y: 50
            }
        }
    }

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            // loaded={particlesLoaded}
            canvasClassName={styles.particleCanvas}
            options={isMobile ? mobileOptions : options}
            // params={CONSTANTS.PARTICLES_ONE}
        />
    );
};

export default ParticlesBackground;
