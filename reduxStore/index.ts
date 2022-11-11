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
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
