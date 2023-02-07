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

export const getMoneyMonkeysMinterAddress = (chainId: string) => {
    if (chainId === '0') {
        // return mainnet if chain id not initialized yet
        return ADDRESSES.MONEY_MONKEYS_MINTER['56']
    }
    // @ts-ignore
    return ADDRESSES.MONEY_MONKEYS_MINTER[chainId]
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

export const getMoneyMonkeysDistributorAddress = (chainId: any) => {
    if (chainId === 0) {
        // return mainnet if chain id not initialized yet
        return ADDRESSES.MONEY_MONKEYS_DISTRIBUTOR['56']
    }
    // @ts-ignore
    return ADDRESSES.MONEY_MONKEYS_DISTRIBUTOR[chainId]
}

export const getMoneyMonkeysStakerAddress = (chainId: any) => {
    if (chainId === 0) {
        // return mainnet if chain id not initialized yet
        return ADDRESSES.MONEY_MONKEYS_STAKER['56']
    }
    // @ts-ignore
    return ADDRESSES.MONEY_MONKEYS_STAKER[chainId]
}

export const getMoneyMonkeysBountyAddress = (chainId: any) => {
    if (chainId === 0) {
        // return mainnet if chain id not initialized yet
        return ADDRESSES.MONEY_MONKEYS_BOUNTY['56']
    }
    // @ts-ignore
    return ADDRESSES.MONEY_MONKEYS_BOUNTY[chainId]
}

export const getPancakeMasterchefAddress = (chainId: any) => {
    if (chainId === 0) {
        // return mainnet if chain id not initialized yet
        return ADDRESSES.PANCAKE_MASTERCHEF['56']
    }
    // @ts-ignore
    return ADDRESSES.PANCAKE_MASTERCHEF[chainId]
}

export const getRewardApeAddress = (chainId: any) => {
    if (chainId === 0) {
        // return mainnet if chain id not initialized yet
        return ADDRESSES.BEP20_REWARD_APE['56']
    }
    // @ts-ignore
    return ADDRESSES.BEP20_REWARD_APE[chainId]
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

export const getBountyTicketsAddress = (chainId: any) => {
    if (chainId === 0) {
        // return mainnet if chain id not initialized yet
        return ADDRESSES.BOUNTY_TICKETS['56']
    }
    // @ts-ignore
    return ADDRESSES.BOUNTY_TICKETS[chainId]
}

