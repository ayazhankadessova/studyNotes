// not api slice

import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null },
  reducers: {
    // payload will have access token
    // then we will state.token to Access Token
    // we are already in auth, so we don't have to set state.auth.token
    setCredentials: (state, action) => {
      const { accessToken } = action.payload
      state.token = accessToken
    },
    // logOut reducer -> set state.toke to null at logout time
    logOut: (state, action) => {
      state.token = null
    },
  },
})

export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer
export const selectCurrentToken = (state) => state.auth.token
