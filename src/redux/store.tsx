import { configureStore } from '@reduxjs/toolkit'

import menuReducer from './reducer'

const store = configureStore({
    reducer: {
        menuOptions: menuReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;