import minterABI from '../abi/minter.json';
import stakerABI from '../abi/staker.json'
import distributorABI from '../abi/distributor.json'
import bountyABI from '../abi/bounty.json'
import pairABI from '../abi/IUniswapV2Pair.json'
import routerABI from '../abi/IUniswapRouter.json'
import drFrankensteinABI from '../abi/drFrankenstein.json'
import {
    getBountyAddress,
    getDistributorAddress,
    getDrFrankensteinAddress,
    getMinterAddress, getPairAddress, getRouterAddress,
    getStakerAddress
} from './getContractAddress';
import {useState} from 'react';
import Web3 from 'web3';

export const getMinterNoWallet = (chainID: any) => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    // @ts-ignore
    return new web3NoWallet.eth.Contract(minterABI, getMinterAddress(chainID))
}

export const getStakerNoWallet = (chainID: any) => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    // @ts-ignore
    return new web3NoWallet.eth.Contract(stakerABI, getStakerAddress(chainID))
}

export const getDistributorNoWallet = (chainID: any) => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    // @ts-ignore
    return new web3NoWallet.eth.Contract(distributorABI, getDistributorAddress(chainID))
}

export const getBountyNoWallet = () => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    // @ts-ignore
    return new web3NoWallet.eth.Contract(bountyABI, getBountyAddress(process.env.NEXT_PUBLIC_CHAIN_ID))
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

export const getRouterNoWallet = (chainID: any) => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    // @ts-ignore
    return new web3NoWallet.eth.Contract(routerABI, getRouterAddress(chainID))
}
