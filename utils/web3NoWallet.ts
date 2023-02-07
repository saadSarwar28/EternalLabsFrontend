import minterABI from '../abi/minter.json';
import eternalCakesMinterAbi from '../abi/EternalCakesMinter.json'
import cakeABI from '../abi/cake.json'
import zmbeABI from '../abi/zmbe.json'
import stakerABI from '../abi/staker.json'
import moneyMonkeysStakerABI from '../abi/moneyMonkeysStaker.json'
import distributorABI from '../abi/distributor.json'
import bountyABI from '../abi/bounty.json'
import bountyTicketsABI from '../abi/bountyTickets.json'
import pairABI from '../abi/IUniswapV2Pair.json'
import routerABI from '../abi/IUniswapRouter.json'
import drFrankensteinABI from '../abi/drFrankenstein.json'
import masterchefABI from '../abi/pancakeMasterchef.json'
import rewardApeABI from '../abi/rewardApe.json'
import {
    getBountyAddress,
    getDistributorAddress,
    getDrFrankensteinAddress,
    getMinterAddress,
    getPairAddress,
    getRouterAddress,
    getStakerAddress,
    getEternalCakesMinterAddress,
    getEternalCakesBountyAddress,
    getEternalCakesStakerAddress,
    getEternalCakesDistributorAddress,
    getPancakeMasterchefAddress,
    getCakeBnbPairAddress,
    getCakeAddress,
    getZmbeAddress,
    getMoneyMonkeysDistributorAddress,
    getMoneyMonkeysBountyAddress,
    getMoneyMonkeysMinterAddress,
    getBountyTicketsAddress, getRewardApeAddress, getMoneyMonkeysStakerAddress,
} from './getContractAddress';
import {useState} from 'react';
import Web3 from 'web3';
// for eternal zombies
export const getMinterNoWallet = (chainID: any) => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    // @ts-ignore
    return new web3NoWallet.eth.Contract(minterABI, getMinterAddress(chainID))
}

export const getEternalCakesMinterNoWallet = (chainID: any) => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    // @ts-ignore
    return new web3NoWallet.eth.Contract(eternalCakesMinterAbi, getEternalCakesMinterAddress(chainID))
}

export const getMoneyMonkeysMinterNoWallet = (chainID: any) => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    // @ts-ignore
    return new web3NoWallet.eth.Contract(eternalCakesMinterAbi, getMoneyMonkeysMinterAddress(chainID))
}

export const getStakerNoWallet = (chainID: any) => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    // @ts-ignore
    return new web3NoWallet.eth.Contract(stakerABI, getStakerAddress(chainID))
}

export const getEternalCakesStakerNoWallet = (chainID: any) => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    // @ts-ignore
    return new web3NoWallet.eth.Contract(stakerABI, getEternalCakesStakerAddress(chainID))
}

export const getDistributorNoWallet = (chainID: any) => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    // @ts-ignore
    return new web3NoWallet.eth.Contract(distributorABI, getDistributorAddress(chainID))
}

export const getEternalCakesDistributorNoWallet = (chainID: any) => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    // @ts-ignore
    return new web3NoWallet.eth.Contract(distributorABI, getEternalCakesDistributorAddress(chainID))
}

export const getMoneyMonkeysDistributorNoWallet = (chainID: any) => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    // @ts-ignore
    return new web3NoWallet.eth.Contract(distributorABI, getMoneyMonkeysDistributorAddress(chainID))
}

export const getBountyNoWallet = () => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    // @ts-ignore
    return new web3NoWallet.eth.Contract(bountyABI, getBountyAddress(process.env.NEXT_PUBLIC_CHAIN_ID))
}

export const getBountyTicketsNoWallet = () => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    // @ts-ignore
    return new web3NoWallet.eth.Contract(bountyTicketsABI, getBountyTicketsAddress(process.env.NEXT_PUBLIC_CHAIN_ID))
}

export const getEternalCakesBountyNoWallet = () => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    // @ts-ignore
    return new web3NoWallet.eth.Contract(bountyABI, getEternalCakesBountyAddress(process.env.NEXT_PUBLIC_CHAIN_ID))
}

export const getMoneyMonkeysBountyNoWallet = () => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    // @ts-ignore
    return new web3NoWallet.eth.Contract(bountyABI, getMoneyMonkeysBountyAddress(process.env.NEXT_PUBLIC_CHAIN_ID))
}

export const getDrFrankensteinNoWallet = (chainID: any) => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    // @ts-ignore
    return new web3NoWallet.eth.Contract(drFrankensteinABI, getDrFrankensteinAddress(chainID))
}

export const getPairNoWallet = (chainID: any) => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    // @ts-ignore
    return new web3NoWallet.eth.Contract(pairABI, getPairAddress(chainID))
}

export const getCakeBnbPairNoWallet = (chainID: any) => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    // @ts-ignore
    return new web3NoWallet.eth.Contract(pairABI, getCakeBnbPairAddress(chainID))
}

export const getRouterNoWallet = (chainID: any) => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    // @ts-ignore
    return new web3NoWallet.eth.Contract(routerABI, getRouterAddress(chainID))
}

export const getPancakeMasterchefNoWallet = (chainID: any) => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    // @ts-ignore
    return new web3NoWallet.eth.Contract(masterchefABI, getPancakeMasterchefAddress(chainID))
}

export const getRewardApeNoWallet = (chainID: any) => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    // @ts-ignore
    return new web3NoWallet.eth.Contract(rewardApeABI, getRewardApeAddress(chainID))
}

export const getMoneyMonkeysStakerNoWallet = (chainID: any) => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    // @ts-ignore
    return new web3NoWallet.eth.Contract(moneyMonkeysStakerABI, getMoneyMonkeysStakerAddress(chainID))
}

export const getCakeNoWallet = (chainID: any) => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    // @ts-ignore
    return new web3NoWallet.eth.Contract(cakeABI, getCakeAddress(chainID))
}

export const getZmbeNoWallet = (chainID: any) => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    // @ts-ignore
    return new web3NoWallet.eth.Contract(zmbeABI, getZmbeAddress(chainID))
}
