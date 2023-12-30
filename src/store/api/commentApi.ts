import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICommentBody, IContent } from '../type/content.type';

export const commentApi = createApi({
    reducerPath: 'commentApi',
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
        addComment: build.mutation<IContent, ICommentBody>({
            query(body) {
                return {
                    url: '/Comment',
                    method: 'POST',
                    body,
                    mode: 'cors',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
            },
        }),
    }),
});

export const { useAddCommentMutation } = commentApi;
