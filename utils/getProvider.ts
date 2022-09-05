import CONSTANTS from './constants';

export const getProvider = (chainId: string) => {
    if (chainId === '0') {
        return CONSTANTS.PROVIDER['56']
    }
    // @ts-ignore
    return CONSTANTS.PROVIDER[chainId]
}
