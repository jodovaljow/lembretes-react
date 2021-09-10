import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ApplicationState, getApplicationStateInit, TypesOperation, TypesTasksFilter } from '../core/task-query';

const initialState = getApplicationStateInit()

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        select: (state, action: PayloadAction<TypesTasksFilter>) => {

            const applicationState: ApplicationState = getApplicationStateInit()

            return {
                operation: applicationState.operation,
                tasksFilter: applicationState.tasksFilter.map(taskFilter => {

                    return {
                        filter: { ...taskFilter.filter, active: action.payload === taskFilter.filter.name, count: taskFilter.tasks.length },
                        tasks: taskFilter.tasks,
                    }
                }),
            }
        },
        operation: (state, action: PayloadAction<TypesOperation>) => ({ ...state, operation: action.payload }),
    }
})

export const { select, operation } = menuSlice.actions
export default menuSlice.reducer