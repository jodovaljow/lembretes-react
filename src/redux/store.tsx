import { configureStore } from '@reduxjs/toolkit'

import menuReducer from './reducer'
import tasksReducer from './reducerTasks'

const store = configureStore({
    reducer: {
        menuOptions: menuReducer,
        tasks: tasksReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;