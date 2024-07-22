import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://study-notes-nine.vercel.app' }),
  tagType: ['Note', 'User'],
  endpoints: (builder) => ({}),
})
