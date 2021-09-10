import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getTasksFilter, TypesTasksFilter } from '../core/task-query';

const initialState = getTasksFilter()

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        select: (state, action: PayloadAction<TypesTasksFilter>) => getTasksFilter().map(taskFilter => {

            return {
                filter: { ...taskFilter.filter, active: action.payload === taskFilter.filter.name, count: taskFilter.tasks.length },
                tasks: taskFilter.tasks,
            }
        }),
    }
})

export const { select } = menuSlice.actions
export default menuSlice.reducer