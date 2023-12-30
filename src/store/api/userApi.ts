import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '../type/user.type';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: (headers, { getState }: any) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
                return headers;
            }
        },
    }),
    endpoints: build => ({
        getAllUser: build.query<IUser[], void>({
            query: () => ({
                url: '/User/All',
                method: 'GET',

                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
        }),
        getUser: build.query({
            query: () => ({
                url: '/User',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
        }),
        deletetUser: build.mutation<object, number>({
            query: id => ({
                url: `/User?id=${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
        }),
    }),
});

export const { useGetAllUserQuery, useGetUserQuery, useDeletetUserMutation } = userApi;
