import BigNumber from 'bignumber.js';
import CONSTANTS from './constants';
import {
    getCakeBnbPairNoWallet,
    getCakeNoWallet, getDistributorNoWallet,
    getDrFrankensteinNoWallet, getEternalCakesDistributorNoWallet,
    getPairNoWallet, getPancakeMasterchefNoWallet,
    getRouterNoWallet,
    getZmbeNoWallet
} from './web3NoWallet';
import {ethers} from 'ethers';
import {getCakeBnbLpTokenValue, getZmbeBnbLpTokenValue} from './lpPrice';
import ADDRESSES from './contractAddresses';
import {getPancakeMasterchefAddress} from './getContractAddress';
import {getTokenPriceFromCoinGecko} from './fetch';

export const getZmbeTombApr = async () => {
    const DrFrankenstein = getDrFrankensteinNoWallet(process.env.NEXT_PUBLIC_CHAIN_ID)
    const poolDetails = await DrFrankenstein.methods.poolInfo('11').call()
    const totalAllocPoint = new BigNumber(await DrFrankenstein.methods.totalAllocPoint().call())
    const poolWeight = new BigNumber(poolDetails?.allocPoint)
    const weight = poolWeight.div(totalAllocPoint)
    const zmbePrice = new BigNumber(await getTokenPriceFromCoinGecko(CONSTANTS.COINGECKO.ZMBE.ID, CONSTANTS.COINGECKO.VS_CURRENCIES))
    const Pair = getPairNoWallet(process.env.NEXT_PUBLIC_CHAIN_ID)
    // @ts-ignore
    const lpStored = await Pair.methods.balanceOf(ADDRESSES.DR_FRANKENSTEIN[process.env.NEXT_PUBLIC_CHAIN_ID]).call()
    const lpValue = await getZmbeBnbLpTokenValue(ethers.utils.formatUnits(lpStored))
    let poolLiquidityUsd = new BigNumber(lpValue)
    const yearlyZmbeRewardAllocation = CONSTANTS.ZMBE_PER_BLOCK.times(CONSTANTS.BLOCKS_PER_YEAR).times(weight)
    const apr = yearlyZmbeRewardAllocation.times(zmbePrice).div(poolLiquidityUsd)
    return Number(apr) * 100
}

export const getZmbeYield = async () => {
    const distributor = getDistributorNoWallet(process.env.NEXT_PUBLIC_CHAIN_ID)
    const cycleCount = await distributor.methods.CYCLE_COUNT().call()
    const cycleDetails = await distributor.methods.distributionCycles(cycleCount).call()
    return Number(ethers.utils.formatUnits(cycleDetails.distributionAmount))
}

export const getCakeYield = async () => {
    const distributor = getEternalCakesDistributorNoWallet(process.env.NEXT_PUBLIC_CHAIN_ID)
    const cycleCount = await distributor.methods.CYCLE_COUNT().call()
    const cycleDetails = await distributor.methods.distributionCycles(cycleCount).call()
    return Number(ethers.utils.formatUnits(cycleDetails.distributionAmount))
}

/**
 * Get the APR value in %
 * @param stakingTokenPrice Token price in the same quote currency
 * @param rewardTokenPrice Token price in the same quote currency
 * @param totalStaked Total amount of stakingToken in the pool
 * @param tokenPerBlock Amount of new cake allocated to the pool for each new block
 * @returns Null if the APR is NaN or infinite.
 */
export const getCakePoolApr = async () => {
    const MasterChef = getPancakeMasterchefNoWallet(process.env.NEXT_PUBLIC_CHAIN_ID)
    const poolDetails = await MasterChef.methods.poolInfo('2').call()
    const totalAllocPoint = new BigNumber(await MasterChef.methods.totalRegularAllocPoint().call())
    const poolWeight = new BigNumber(poolDetails?.allocPoint)
    const weight = poolWeight.div(totalAllocPoint)
    const cakePrice = new BigNumber(await getTokenPriceFromCoinGecko(CONSTANTS.COINGECKO.CAKE.ID, CONSTANTS.COINGECKO.VS_CURRENCIES))
    // console.log(cakePrice.toString(), ' <<<< cake price')
    const Pair = getCakeBnbPairNoWallet(process.env.NEXT_PUBLIC_CHAIN_ID)
    // @ts-ignore
    const lpStored = await Pair.methods.balanceOf(getPancakeMasterchefAddress(process.env.NEXT_PUBLIC_CHAIN_ID)).call()
    // console.log(ethers.utils.formatUnits(lpStored), ' <<<< total lp stored')
    const lpValue = await getCakeBnbLpTokenValue(ethers.utils.formatUnits(lpStored))
    // console.log(lpValue.toString(), ' <<<< lp value')
    let poolLiquidityUsd = new BigNumber(lpValue)

    const cakePerBlock = await MasterChef.methods.cakePerBlock(true).call()
    // console.log(ethers.utils.formatUnits(cakePerBlock), ' <<<< cake per block')
    // console.log(CONSTANTS.CAKE_PER_BLOCK.toNumber(), ' << cake per block')
    // console.log(cakePrice.toNumber(), ' <<< cake price')
    // console.log(lpStored)
    // console.log(lpValue)
    // const yearlyCakeRewardAllocation = cakePerBlock.times(CONSTANTS.BLOCKS_PER_YEAR).times(weight)
    // const apr = yearlyCakeRewardAllocation.times(cakePrice).div(poolLiquidityUsd)
    // return Number(apr) * 100

    const totalRewardPricePerYear = cakePrice.times(cakePerBlock).times(new BigNumber(28000))
    // console.log(totalRewardPricePerYear.toString(), ' <<< total rewards per year')
    // const totalStakingTokenInPool = new BigNumber(lpValue).times(new BigNumber(lpStored))
    const apr = totalRewardPricePerYear.div(lpValue).times(100)
    // console.log(apr.toString(), ' <<< apr')
    // return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
    return 23
}

export default null
