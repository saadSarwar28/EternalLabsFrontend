import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const defaultState = {
    userData: {
        walletConnected: false,
        account: '',
        balance: 0,
        pendingZmbe: 0,
    },
    chainId: 0,
    web3Provider: null,
    web3WithWallet: null,
}

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
        [disconnectWallet.fulfilled.toString()]: (state) => {
            state.userData.account = ''
            state.userData.walletConnected = false
        }
    }
})

// @ts-ignore
export const selectCreateAccountState = (state) => state.createAccountState

export const {
    clearFullState,
} = createAccountSlice.actions

export default createAccountSlice.reducer;
