import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IFeedback } from '../type/feedback.type';

export const feedbackApi = createApi({
    reducerPath: 'feedbackApi',
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
        getAllFeedback: build.query<IFeedback[], void>({
            query() {
                return {
                    url: '/Feedback/all',
                    mode: 'cors',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
            },
        }),
        deleteFeedback: build.mutation<IFeedback, number>({
            query(id) {
                return {
                    url: `/Feedback?id=${id}`,
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

export const { useGetAllFeedbackQuery, useDeleteFeedbackMutation } = feedbackApi;
