import {useState} from 'react';
import Web3 from 'web3';

export const weiToNumber = (amount: any, decimals: number = 18) => {
    // @ts-ignore
    const web3NoWallet = new Web3(process.env.NEXT_PUBLIC_BINANCE_RPC)
    return Number(web3NoWallet.utils.fromWei(amount)).toFixed(decimals)
}
