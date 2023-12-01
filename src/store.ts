import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './components/Counter/CounterSlice'
import userReducer from './redux/reducers/UserSlice'
import clientReducer from './redux/reducers/ClientSlice';


export const store = configureStore({
    reducer: {
        counter : counterReducer,
        user : userReducer,
        client : clientReducer
    },
  })
  
  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch