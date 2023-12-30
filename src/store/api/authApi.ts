import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: builder => ({
        signinUser: builder.mutation({
            query: (body: { username: string; password: string }) => {
                return {
                    url: '/auth/authenticate',
                    method: 'POST',
                    body,
                };
            },
        }),
        signupUser: builder.mutation({
            query: (body: { email: string; username: string; password: string; displayName: string }) => {
                return {
                    url: '/auth/adminRegister',
                    method: 'POST',
                    body,
                };
            },
        }),
        forgotPassword: builder.mutation({
            query: (body: { email: string }) => {
                return {
                    url: `/auth/ForgotPassword?${body}`,
                    method: 'post',
                    body,
                };
            },
        }),
        resetPassword: builder.mutation({
            query: (body: { newPassword: string; resetPasscode: string; email: string }) => {
                return {
                    url: '/auth/ResetPassword',
                    method: 'POST',
                    body,
                };
            },
        }),
    }),
});

export const { useSigninUserMutation, useSignupUserMutation, useForgotPasswordMutation, useResetPasswordMutation } =
    authApi;
