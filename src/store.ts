import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './redux/reducers/UserSlice'
import clientReducer from './redux/reducers/ClientSlice';
import scheduleReducer from './redux/reducers/ScheduleSlice'
import employeeScheduleReducer from './redux/reducers/EmployeeSchedules';
import employeeReducer from './redux/reducers/EmployeeSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        client: clientReducer,
        schedule: scheduleReducer,
        employeeSchedule: employeeScheduleReducer,
        employee : employeeReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch