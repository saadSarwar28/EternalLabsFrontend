import BigNumber from 'bignumber.js';

export const BSC_BLOCK_TIME = 3

const CONSTANTS = {
    ZMBE: '0x50ba8bf9e34f0f83f96a340387d1d3888ba4b3b5',
    CAKE: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    MAINST : '0x8FC1A944c149762B6b578A06c0de2ABd6b7d2B89',
    BANANA: '0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95',
    WRAPPED_BNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    USDT: '0x55d398326f99059fF775485246999027B3197955',
    ETERNAL_CAKES_FARM_BOOSTER_PROXY: '0xd8C408676B6af16dFD131c90F4bb5448301C54D3',
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
    CAKE_PER_BLOCK: new BigNumber(2.03),
    BLOCKS_PER_YEAR: new BigNumber((60 / BSC_BLOCK_TIME) * 60 * 24 * 365), // 10512000
    COINGECKO: {
        BASE_URI: "https://api.coingecko.com/api/v3/",
        // ALREADY_MAX_NFT_MINTABLE: (maxMint, nftBalance) => `Max ${maxMint} nft mintable and you already have ${nftBalance.toString()}`,
        PRICE_API: ({id, currency}: any) => `simple/price?ids=${id}&vs_currencies=${currency}`,
        ZMBE: {
            ID: "rugzombie"
        },
        CAKE: {
            ID: "pancakeswap-token"
        },
        BNB: {
            ID: "binancecoin"
        },
        VS_CURRENCIES: "usd"
    }
}

export default CONSTANTS
