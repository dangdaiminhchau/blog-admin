import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './api/authApi';
import authReducer from './state/authSlice';
import { userApi } from './api/userApi';
import { categoriesApi } from './api/categoriesApi';
import { contentPrivateApi, contentPublicApi } from './api/contentApi';
import { feedbackApi } from './api/feedbackApi';
import { webInfoApi } from './api/webInfo';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [contentPublicApi.reducerPath]: contentPublicApi.reducer,
        [contentPrivateApi.reducerPath]: contentPrivateApi.reducer,
        [feedbackApi.reducerPath]: feedbackApi.reducer,
        [webInfoApi.reducerPath]: webInfoApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(
            authApi.middleware,
            userApi.middleware,
            categoriesApi.middleware,
            contentPublicApi.middleware,
            contentPrivateApi.middleware,
            feedbackApi.middleware,
            webInfoApi.middleware,
        ),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
