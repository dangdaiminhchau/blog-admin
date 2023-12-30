import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategories, IUpdateCateFormat } from '../type/categories.type';

export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
    }),
    endpoints: build => ({
        getCategoriesList: build.query<ICategories[], void>({
            query: () => '/guest/Categories',
        }),
        addCate: build.mutation<ICategories, { name: string }>({
            query(body) {
                return {
                    url: '/Category',
                    method: 'POST',
                    body,
                    mode: 'cors',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
            },
        }),
        deleteCate: build.mutation<ICategories, number>({
            query(id) {
                return {
                    url: `Category?id=${id}`,
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
            },
        }),
        updateCate: build.mutation<ICategories, IUpdateCateFormat>({
            query(updateData) {
                return {
                    url: '/Category',
                    method: 'PUT',
                    body: updateData,
                    mode: 'cors',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
            },
        }),
    }),
});

export const { useGetCategoriesListQuery, useAddCateMutation, useDeleteCateMutation, useUpdateCateMutation } =
    categoriesApi;
