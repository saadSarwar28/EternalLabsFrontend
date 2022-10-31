import minterABI from '../abi/minter.json';
import eternalCakesMinterAbi from '../abi/EternalCakesMinter.json'
import stakerABI from '../abi/staker.json'
import distributorABI from '../abi/distributor.json'
import bountyABI from '../abi/bounty.json'
import pairABI from '../abi/IUniswapV2Pair.json'
import routerABI from '../abi/IUniswapRouter.json'
import drFrankensteinABI from '../abi/drFrankenstein.json'
import masterchefABI from '../abi/pancakeMasterchef.json'
import {
    getBountyAddress,
    getDistributorAddress,
    getDrFrankensteinAddress,
    getMinterAddress, getPairAddress, getRouterAddress,
    getStakerAddress,
    getEternalCakesMinterAddress,
    getEternalCakesBountyAddress,
    getEternalCakesStakerAddress,
    getEternalCakesDistributorAddress, getPancakeMasterchefAddress, getCakeBnbPairAddress,
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

export const getBountyNoWallet = () => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    // @ts-ignore
    return new web3NoWallet.eth.Contract(bountyABI, getBountyAddress(process.env.NEXT_PUBLIC_CHAIN_ID))
}

export const getEternalCakesBountyNoWallet = () => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    // @ts-ignore
    return new web3NoWallet.eth.Contract(bountyABI, getEternalCakesBountyAddress(process.env.NEXT_PUBLIC_CHAIN_ID))
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
