import ADDRESSES from '../utils/contractAddresses';

export const getMinterAddress = (chainId: string) => {
    if (chainId === '0') {
        // return mainnet if chain id not initialized yet
        return ADDRESSES.MINTER['56']
    }
    // @ts-ignore
    return ADDRESSES.MINTER[chainId]
}

export const getStakerAddress = (chainId: any) => {
    if (chainId === 0) {
        // return mainnet if chain id not initialized yet
        return ADDRESSES.STAKER['56']
    }
    // @ts-ignore
    return ADDRESSES.STAKER[chainId]
}

export const getDistributorAddress = (chainId: any) => {
    if (chainId === 0) {
        // return mainnet if chain id not initialized yet
        return ADDRESSES.DISTRIBUTOR['56']
    }
    // @ts-ignore
    return ADDRESSES.DISTRIBUTOR[chainId]
}

export const getBountyAddress = (chainId: any) => {
    if (chainId === 0) {
        // return mainnet if chain id not initialized yet
        return ADDRESSES.BOUNTY['56']
    }
    // @ts-ignore
    return ADDRESSES.BOUNTY[chainId]
}

export const getDrFrankensteinAddress = (chainId: any) => {
    if (chainId === 0) {
        // return mainnet if chain id not initialized yet
        return ADDRESSES.DR_FRANKENSTEIN['56']
    }
    // @ts-ignore
    return ADDRESSES.DR_FRANKENSTEIN[chainId]
}

export const getPairAddress = (chainId: any) => {
    if (chainId === 0) {
        // return mainnet if chain id not initialized yet
        return ADDRESSES.PAIR['56']
    }
    // @ts-ignore
    return ADDRESSES.PAIR[chainId]
}

export const getCakeBnbPairAddress = (chainId: any) => {
    if (chainId === 0) {
        // return mainnet if chain id not initialized yet
        return ADDRESSES.CAKE_BNB_PAIR['56']
    }
    // @ts-ignore
    return ADDRESSES.CAKE_BNB_PAIR[chainId]
}

export const getRouterAddress = (chainId: any) => {
    if (chainId === 0) {
        // return mainnet if chain id not initialized yet
        return ADDRESSES.ROUTER['56']
    }
    // @ts-ignore
    return ADDRESSES.ROUTER[chainId]
}

export const getEternalCakesMinterAddress = (chainId: string) => {
    if (chainId === '0') {
        // return mainnet if chain id not initialized yet
        return ADDRESSES.ETERNAL_CAKES_MINTER['56']
    }
    // @ts-ignore
    return ADDRESSES.ETERNAL_CAKES_MINTER[chainId]
}

export const getEternalCakesStakerAddress = (chainId: any) => {
    if (chainId === 0) {
        // return mainnet if chain id not initialized yet
        return ADDRESSES.ETERNAL_CAKES_STAKER['56']
    }
    // @ts-ignore
    return ADDRESSES.ETERNAL_CAKES_STAKER[chainId]
}

export const getEternalCakesDistributorAddress = (chainId: any) => {
    if (chainId === 0) {
        // return mainnet if chain id not initialized yet
        return ADDRESSES.ETERNAL_CAKES_DISTRIBUTOR['56']
    }
    // @ts-ignore
    return ADDRESSES.ETERNAL_CAKES_DISTRIBUTOR[chainId]
}

export const getEternalCakesBountyAddress = (chainId: any) => {
    if (chainId === 0) {
        // return mainnet if chain id not initialized yet
        return ADDRESSES.ETERNAL_CAKES_BOUNTY['56']
    }
    // @ts-ignore
    return ADDRESSES.ETERNAL_CAKES_BOUNTY[chainId]
}

export const getPancakeMasterchefAddress = (chainId: any) => {
    if (chainId === 0) {
        // return mainnet if chain id not initialized yet
        return ADDRESSES.PANCAKE_MASTERCHEF['56']
    }
    // @ts-ignore
    return ADDRESSES.PANCAKE_MASTERCHEF[chainId]
}

export const getCakeAddress = (chainId: any) => {
    if (chainId === 0) {
        // return mainnet if chain id not initialized yet
        return ADDRESSES.tokens.CAKE['56']
    }
    // @ts-ignore
    return ADDRESSES.tokens.CAKE[chainId]
}

export const getZmbeAddress = (chainId: any) => {
    if (chainId === 0) {
        // return mainnet if chain id not initialized yet
        return ADDRESSES.tokens.ZMBE['56']
    }
    // @ts-ignore
    return ADDRESSES.tokens.ZMBE[chainId]
}
