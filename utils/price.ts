import {ethers} from "ethers";
import {getPairNoWallet, getRouterNoWallet} from './web3NoWallet';
import CONSTANTS from './constants';

export const getLpTokenValue = async (
    amount: string
) => {

    const Pair = getPairNoWallet(process.env.NEXT_PUBLIC_CHAIN_ID)
    const Router = getRouterNoWallet(process.env.NEXT_PUBLIC_CHAIN_ID)

    const reserves = await Pair.methods.getReserves().call();

    const zmbeAmount = ethers.utils.formatUnits(reserves.reserve0)
    const bnbAmount = ethers.utils.formatUnits(reserves.reserve1)
    const totalSupply = Number(ethers.utils.formatUnits(await Pair.methods.totalSupply().call())); // total supply of lp tokens

    const tokenOne = (Number(amount) / totalSupply) * Number(zmbeAmount)
    const tokenTwo = (Number(amount) / totalSupply) * Number(bnbAmount)

    // console.log(zmbeAmount, bnbAmount, totalSupply, ' << total token amounts')
    // console.log(tokenOne, tokenTwo, '   =============')

    // zmbe to bnb
    const amountsOneOut =  await Router.methods.getAmountsOut(ethers.utils.parseUnits(String(tokenOne)),[CONSTANTS.ZMBE, CONSTANTS.WRAPPED_BNB]).call()
    // get converted bnb value in usdt
    const amountsTwoOut = await Router.methods.getAmountsOut(amountsOneOut[1],[CONSTANTS.WRAPPED_BNB, CONSTANTS.USDT]).call()
    const bnbToUSDT = ethers.utils.formatUnits(amountsTwoOut[1])
    // console.log(bnbToUSDT, ' <<< zmbe in USDT')

    // get remaining bnb value in usdt
    const amountsThreeOut = await Router.methods.getAmountsOut(ethers.utils.parseUnits(String(tokenTwo)),[CONSTANTS.WRAPPED_BNB, CONSTANTS.USDT]).call()
    const bnbAmountInUSDT = ethers.utils.formatUnits(amountsThreeOut[1])
    // console.log(bnbAmountInUSDT, ' << bnb in usdt')
    //
    // console.log(Number(bnbAmountInUSDT) + Number(bnbToUSDT), ' <<<<< total lp in usdt')
    return Number(bnbAmountInUSDT) + Number(bnbToUSDT)
};
