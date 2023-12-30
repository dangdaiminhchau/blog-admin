import { IUpdatePending } from './../type/content.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IContent, IContentBody } from '../type/content.type';

export const contentPublicApi = createApi({
    reducerPath: 'contentPublicApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
    }),

    endpoints: build => ({
        getContentTopDate: build.query<IContent[], void>({
            query: () => '/guest/Content/TopDate',
        }),
        getContentTopView: build.query<IContent[], void>({
            query: () => '/guest/Content/TopViews',
        }),
        getContentInCates: build.query({
            query: categoryId => `/guest/Category?categoryId=${categoryId}`,
        }),
        getAllContent: build.query<IContent[], void>({
            query: () => '/guest/Content/All',
        }),
        getContent: build.query<IContent, number>({
            query: id => `/guest/Content?id=${id}`,
        }),
    }),
});

export const contentPrivateApi = createApi({
    reducerPath: 'contentPrivateApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'api',
        prepareHeaders: (headers, { getState }: any) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
                return headers;
            }
        },
    }),

    endpoints: build => ({
        getContentPending: build.query<IContent[], void>({
            query() {
                return {
                    url: '/Content/Pending',
                    mode: 'cors',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
            },
        }),
        addContent: build.mutation<IContent, IContentBody>({
            query(body) {
                return {
                    url: '/Content',
                    method: 'POST',
                    body,
                    mode: 'cors',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
            },
        }),
        deleteContent: build.mutation<IContent, number>({
            query(id) {
                return {
                    url: `/Content?id=${id}`,
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
            },
        }),
        updatePendingContent: build.mutation<IContent, IUpdatePending>({
            query(body) {
                return {
                    url: '/Content',
                    method: 'PUT',
                    body: body,
                    mode: 'cors',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
            },
        }),
    }),
});

export const {
    useGetContentTopDateQuery,
    useGetContentTopViewQuery,
    useGetContentInCatesQuery,
    useGetAllContentQuery,
    useGetContentQuery,
} = contentPublicApi;
export const {
    useAddContentMutation,
    useDeleteContentMutation,
    useGetContentPendingQuery,
    useUpdatePendingContentMutation,
} = contentPrivateApi;
