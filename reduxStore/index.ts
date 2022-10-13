import {configureStore} from "@reduxjs/toolkit";

import accountReducer from "./accountSlice"

export const store = configureStore({
    reducer: {
        createAccountState: accountReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
        {
            serializableCheck: false
        }
    ),
});
