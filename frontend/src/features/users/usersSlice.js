import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    username: '',
  },
  reducers: {
    setUserUsername: (state, action) => {
      console.log('Here')
      state.username = action.payload
    },
  },
})

// Select the entire users slice state
const selectUsersState = (state) => state.users

// Create a selector to get the username
export const selectUsername = createSelector(
  [selectUsersState],
  (users) => users.username
)

export const { setUserUsername } = usersSlice.actions

export default usersSlice.reducer
