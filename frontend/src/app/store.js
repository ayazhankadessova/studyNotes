import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'
import usersReducer from '../features/users/usersSlice'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

// we have enabled some things that we can use in our queries
// in the usersList & NotesList
setupListeners(store.dispatch)
