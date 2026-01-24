import { configureStore } from '@reduxjs/toolkit'
import LoginUserReducer from './LoginUser'

export const store = configureStore({
  reducer: {
    LoginUser: LoginUserReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch