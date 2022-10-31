import BigNumber from 'bignumber.js';

export const BSC_BLOCK_TIME = 3

const CONSTANTS = {
    ZMBE: '0x50ba8bf9e34f0f83f96a340387d1d3888ba4b3b5',
    CAKE: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    WRAPPED_BNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    USDT: '0x55d398326f99059fF775485246999027B3197955',
    EZ_POOL_ID: '11',
    CAKE_POOL_ID: '2',
    // 'CHAIN_ID': 56, mainnet
    'PROVIDER':
        {
            '56': 'https://bsc-dataseed1.defibit.io/',
            '97': 'https://data-seed-prebsc-1-s1.binance.org:8545/'
        },
    PARTICLES_ONE: {
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
    },
    ZMBE_PER_BLOCK: new BigNumber(10),
    BLOCKS_PER_YEAR: new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24 * 365) // 10512000
}

export default CONSTANTS
