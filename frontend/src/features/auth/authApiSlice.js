import { credentials } from '../../../../config/corsOptions'
import { apiSlice } from '../../app/api/apiSlice'
// log out Action Creator
import { logOut } from './authSlice'

// inject inside of the builder where we can put each endpoint

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // login endpoint
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth',
        method: 'POST',
        body: {
          ...credentials,
        },
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      // rtk query provides onQueryStarted function, which is async
      // it accepts argument, verify that query is fulfilled
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          // dispatch logout reducer -> set token to null in local state
          dispatch(logOut())
          // clear api slice
          // clear cache
          dispatch(apiSlice.util.resetApiState())
        } catch (err) {
          console.log(err)
        }
      },
    }),
    // we are sending get request that includes a cookie
    refresh: builder.mutation({
      query: () => ({
        url: `/auth/refresh`,
        method: 'GET',
      }),
    }),
  }),
})

// export all mutations
export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } =
  authApiSlice
