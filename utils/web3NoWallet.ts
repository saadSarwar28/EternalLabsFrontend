import minterABI from '../abi/minter.json';
import stakerABI from '../abi/staker.json'
import distributorABI from '../abi/distributor.json'
import drFrankensteinABI from '../abi/drFrankenstein.json'
import {
    getDistributorAddress,
    getDrFrankensteinAddress,
    getMinterAddress,
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

export const getDrFrankensteinNoWallet = (chainID: any) => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    // @ts-ignore
    return new web3NoWallet.eth.Contract(drFrankensteinABI, getDrFrankensteinAddress(chainID))
}
