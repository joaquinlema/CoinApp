import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//TODO: pasar a .env
const cryptoApiHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '2e833f1b0bmsh72ab761018d1311p1b7cb5jsn1003604fe404'
}

//INFO: url de donde traemos la data
const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

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