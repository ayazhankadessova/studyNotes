import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

// for normalized state
const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState({
  username: '',
})
// we have already set localhost:3500 as base, now we just add the endpoints -> getUsers
// Validate status
// Transform
// return userAdapter
// trq query will create hook
// selectors
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id
          return user
        })
        return usersAdapter.setAll(initialState, loadedUsers)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'User', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'User', id })),
          ]
        } else return [{ type: 'User', id: 'LIST' }]
      },
    }),
    addNewUser: builder.mutation({
      query: (initialUserData) => ({
        url: '/users',
        method: 'POST',
        body: {
          ...initialUserData,
        },
      }),
      // user list will be invalidated, so it will need to be updated
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    updateUser: builder.mutation({
      query: (initialUserData) => ({
        url: '/users',
        method: 'PATCH',
        body: {
          ...initialUserData,
        },
      }),
      // invalidate specific id of the user
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users`,
        method: 'DELETE',
        body: { id },
      }),
      // invalidate specific id of the user
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  setUserUsername,
} = usersApiSlice

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserUsername: (state, action) => {
      console.log('here')
      state.username = action.payload
    },
  },
})

// export const { setUserUsername } = usersSlice.actions

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

// creates memoized selector
const selectUsersData = createSelector(
  // pass result
  selectUsersResult,
  (usersResult) => usersResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState)

export const selectUsername = (state) => state.users?.username || ''
// export const setUserUsername = (username) => {
//   console.log(username)
//   return (dispatch) => {
//     dispatch(usersApiSlice.endpoints.setUsername.initiate(username))
//   }
// }
