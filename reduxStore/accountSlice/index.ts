import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {getCakePoolApr, getCakeYield, getZmbeTombApr, getZmbeYield} from '../../utils/apr';

const defaultState = {
    userData: {
        walletConnected: false,
        account: '',
        balance: 0,
        pendingZmbe: 0,
        pendingCake: 0,
    },
    zmbeBnbPoolApr: 0,
    zmbeYield: 0,
    cakeBnbPoolApr: 0,
    cakeYield: 0,
    chainId: 0,
    web3Provider: null,
    web3WithWallet: null,
    tvl: 0,
}

export const updateRugzombiePancakeswapTombApr = createAsyncThunk(
    "ACCOUNT/UPDATE_ZMBE_BNB_POOL_APR",
    ()=> {
        return new Promise<void>((resolve, reject) => {
            // @ts-ignore
            resolve(getZmbeTombApr());
        });
    }
)

export const updateZmbeYield = createAsyncThunk(
    "ACCOUNT/UPDATE_ZMBE_YIELD",
    ()=> {
        return new Promise<void>((resolve, reject) => {
            // @ts-ignore
            resolve(getZmbeYield());
        });
    }
)

export const updateCakeYield = createAsyncThunk(
    "ACCOUNT/UPDATE_CAKE_YIELD",
    ()=> {
        return new Promise<void>((resolve, reject) => {
            // @ts-ignore
            resolve(getCakeYield());
        });
    }
)

export const updateCakePoolApr = createAsyncThunk(
    "ACCOUNT/UPDATE_CAKE_BNB_POOL_APR",
    ()=> {
        return new Promise<void>((resolve, reject) => {
            // @ts-ignore
            resolve(getCakePoolApr());
        });
    }
)

export const updateAccount = createAsyncThunk(
    "ACCOUNT/UPDATE",
    ( address,thunkAPI) => {
        return new Promise<void>((resolve, reject) => {
            resolve(address);
        });
    }
);

export const updateWeb3Provider = createAsyncThunk(
    "ACCOUNT/UPDATE_WEB3",
    (web3Provider: any,) => {
        return new Promise<void>((resolve, reject) => {
            resolve(web3Provider)
        })
    }
)

export const updatePendingZmbe = createAsyncThunk(
    "ACCOUNT/UPDATE_PENDING_ZMBE",
    (zmbe: any,) => {
        return new Promise<void>((resolve, reject) => {
            resolve(zmbe)
        })
    }
)

export const updateTvl = createAsyncThunk(
    "ACCOUNT/UPDATE_TVL",
    (value: any,) => {
        return new Promise<void>((resolve, reject) => {
            resolve(value)
        })
    }
)

export const updatePendingCake = createAsyncThunk(
    "ACCOUNT/UPDATE_PENDING_CAKE",
    (cake: any,) => {
        return new Promise<void>((resolve, reject) => {
            resolve(cake)
        })
    }
)

export const disconnectWallet = createAsyncThunk(
    "ACCOUNT/DISCONNECT_WALLET",
    () => {
        return new Promise<void>((resolve, reject) => {
            resolve()
        })
    }
)

const createAccountSlice = createSlice({
    name: "ACCOUNT_SLICE",
    initialState: defaultState,
    reducers: {
        clearFullState: () => defaultState,
    },
    extraReducers: {
        [updateAccount.fulfilled.toString()]: (state, {payload}) => {
            state.userData.account = payload
            state.userData.walletConnected = true
        },
        [updateWeb3Provider.fulfilled.toString()]: (state, {payload}) => {
            state.web3Provider = payload
        },
        [updatePendingZmbe.fulfilled.toString()]: (state, {payload}) => {
            state.userData.pendingZmbe += payload
        },
        [updatePendingCake.fulfilled.toString()]: (state, {payload}) => {
            state.userData.pendingCake += payload
        },
        [updateTvl.fulfilled.toString()]: (state, {payload}) => {
            if (state.tvl === 0) {
                state.tvl = payload
            }
        },
        [disconnectWallet.fulfilled.toString()]: (state) => {
            state.userData.account = ''
            state.userData.walletConnected = false
        },
        [updateRugzombiePancakeswapTombApr.fulfilled.toString()]: (state, {payload}) => {
            state.zmbeBnbPoolApr = payload
        },
        [updateCakePoolApr.fulfilled.toString()]: (state, {payload}) => {
            state.cakeBnbPoolApr = payload
        },
        [updateZmbeYield.fulfilled.toString()]: (state, {payload}) => {
            state.zmbeYield = payload
        },
        [updateCakeYield.fulfilled.toString()]: (state, {payload}) => {
            state.cakeYield = payload
        }
    }
})

// @ts-ignore
export const selectCreateAccountState = (state) => state.createAccountState

export const {
    clearFullState,
} = createAccountSlice.actions

export default createAccountSlice.reducer;
