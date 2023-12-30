import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IFormatUpdateWebInfo, IWebInfo, IWebInfoBody } from '../type/webInfo.type';

export const webInfoApi = createApi({
    reducerPath: 'webInfoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'api',
    }),
    endpoints: build => ({
        getAllWebInfo: build.query<IWebInfo[], void>({
            query() {
                return {
                    url: '/guest/WI/all',
                };
            },
        }),
        addWebInfo: build.mutation<IWebInfo, IWebInfoBody>({
            query(body) {
                return {
                    url: `/WI`,
                    method: 'POST',
                    body,
                    mode: 'cors',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
            },
        }),
        updateWebInfo: build.mutation<IWebInfo, IFormatUpdateWebInfo>({
            query(updateData) {
                return {
                    url: '/WI',
                    method: 'PUT',
                    body: updateData,
                    mode: 'cors',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
            },
        }),

        deleteWebInfo: build.mutation<IWebInfo, number>({
            query(id) {
                return {
                    url: `/WI?id=${id}`,
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
            },
        }),
    }),
});

export const { useAddWebInfoMutation, useDeleteWebInfoMutation, useGetAllWebInfoQuery, useUpdateWebInfoMutation } =
    webInfoApi;
