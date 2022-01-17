import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//TODO: pasar a .env
const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '2e833f1b0bmsh72ab761018d1311p1b7cb5jsn1003604fe404'
}

//INFO: url de donde traemos la data
const baseUrl = 'https://coinranking1.p.rapidapi.com';

//INFO: funcion para agregar los headers en la consulta
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

// Define a service using a base URL and expected endpoints
export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetail: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timeStamp }) => createRequest(`/coin/${coinId}/history?timePeriod=${timeStamp}`)
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCryptosQuery, useGetCryptoDetailQuery, useGetCryptoHistoryQuery } = cryptoApi;