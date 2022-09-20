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

