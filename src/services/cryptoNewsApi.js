import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//TODO: pasar a .env
const cryptoApiHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': process.env.REACT_APP_BINGHOST,
    'x-rapidapi-key': process.env.REACT_APP_RAPIDKEYBING
}

//INFO: url de donde traemos la data
const baseUrl = process.env.REACT_APP_URL_BING

//INFO: funcion para agregar los headers en la consulta
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

// Define a service using a base URL and expected endpoints
export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptosNews: builder.query({
            query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCryptosNewsQuery } = cryptoNewsApi;