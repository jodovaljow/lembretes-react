import { faCalendarAlt, faCalendarCheck, faInbox } from '@fortawesome/free-solid-svg-icons'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { PropsBadge } from '../components/Badge'

const initialState: PropsBadge[] = [
    {
        name: "Hoje",
        active: true,
        color: "#047aff",
        icon: faCalendarCheck,
        count: 123,
    },
    {
        name: "Programados",
        active: false,
        color: "#ff3c2f",
        icon: faCalendarAlt,
        count: 123,
    },
    {
        name: "Todos",
        active: false,
        color: "#5b626a",
        icon: faInbox,
        count: 123,
    },
]

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        select: (state, action: PayloadAction<string>) => state.map(badge => ({ ...badge, active: badge.name === action.payload }))
    }
})

export const { select } = menuSlice.actions
export default menuSlice.reducer