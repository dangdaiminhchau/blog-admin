/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
    user: any;
    token: string | null;
}

const initialState: AuthState = {
    user: {},
    token: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload;
        },
        logout: state => {
            localStorage.removeItem('token');
            (state.token = null), (state.user = null);
        },
    },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
