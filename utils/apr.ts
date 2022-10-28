import BigNumber from 'bignumber.js';
import CONSTANTS from './constants';

export const getZmbeTombApr = (
    poolWeight: BigNumber,
    zmbePriceUsd: BigNumber,
    poolLiquidityUsd: BigNumber,
): number => {
    const yearlyZmbeRewardAllocation = CONSTANTS.ZMBE_PER_BLOCK.times(CONSTANTS.BLOCKS_PER_YEAR).times(poolWeight)
    const apr = yearlyZmbeRewardAllocation.times(zmbePriceUsd).div(poolLiquidityUsd)
    return 0
}

export default null
