import {ethers} from "ethers";
import {getCakeBnbPairNoWallet, getPairNoWallet, getRouterNoWallet} from './web3NoWallet';
import CONSTANTS from './constants';
import {getTokenPriceFromCoinGecko} from './fetch';

export const getZmbeBnbLpTokenValue = async (amount: string) => {
    const Pair = getPairNoWallet(process.env.NEXT_PUBLIC_CHAIN_ID)

    const reserves = await Pair.methods.getReserves().call();

    const zmbeAmount = ethers.utils.formatUnits(reserves.reserve0)
    const bnbAmount = ethers.utils.formatUnits(reserves.reserve1)
    const totalSupply = Number(ethers.utils.formatUnits(await Pair.methods.totalSupply().call()));

    const tokenOne = (Number(amount) / totalSupply) * Number(zmbeAmount)
    const tokenTwo = (Number(amount) / totalSupply) * Number(bnbAmount)

    const zmbePrice = Number(await getTokenPriceFromCoinGecko(CONSTANTS.COINGECKO.ZMBE.ID, CONSTANTS.COINGECKO.VS_CURRENCIES))
    const bnbPrice = Number(await getTokenPriceFromCoinGecko(CONSTANTS.COINGECKO.BNB.ID, CONSTANTS.COINGECKO.VS_CURRENCIES))

    return (zmbePrice * tokenOne) + (bnbPrice * tokenTwo)
};

export const getCakeBnbLpTokenValue = async (amount: string) => {

    const Pair = getCakeBnbPairNoWallet(process.env.NEXT_PUBLIC_CHAIN_ID)

    const reserves = await Pair.methods.getReserves().call();

    const cakeAmount = ethers.utils.formatUnits(reserves.reserve0)
    const bnbAmount = ethers.utils.formatUnits(reserves.reserve1)
    const totalSupply = Number(ethers.utils.formatUnits(await Pair.methods.totalSupply().call())); // total supply of lp tokens

    const tokenOne = (Number(amount) / totalSupply) * Number(cakeAmount)
    const tokenTwo = (Number(amount) / totalSupply) * Number(bnbAmount)

    const cakePrice = Number(await getTokenPriceFromCoinGecko(CONSTANTS.COINGECKO.CAKE.ID, CONSTANTS.COINGECKO.VS_CURRENCIES))
    const bnbPrice = Number(await getTokenPriceFromCoinGecko(CONSTANTS.COINGECKO.BNB.ID, CONSTANTS.COINGECKO.VS_CURRENCIES))

    return Number(cakePrice * tokenOne) + Number(bnbPrice * tokenTwo)
};
