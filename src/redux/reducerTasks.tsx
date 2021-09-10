import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

import { Task } from '../components/TaskItem'
import { dateIsTodayAndPast } from '../core/date-utils';

function getTasks(): Task[] {
    return [
        {
            id: uuidv4(),
            done: false,
            name: 'teste sem data',
            date: '',
        },
        {
            id: uuidv4(),
            done: false,
            name: 'teste',
        },
        {
            id: uuidv4(),
            done: true,
            name: 'teste 2 away',
            date: '2021-08-07',
        },
        {
            id: uuidv4(),
            done: true,
            name: 'teste hj',
            date: '2021-08-08',
        },
        {
            id: uuidv4(),
            done: false,
            name: 'teste 3',
            date: '2021-10-07',
        },
        {
            id: uuidv4(),
            done: false,
            name: 'teste 3',
            date: '2021-09-10',
        },
        {
            id: uuidv4(),
            done: false,
            name: 'teste 3',
            date: '2021-09-09',
        },
        {
            id: uuidv4(),
            done: false,
            name: 'teste 3',
            date: '2021-09-11',
        },
    ]
        .sort((taskA, taskB) => {

            const dateTaskA: string = taskA.date ?? ''
            const dateTaskB: string = taskB.date ?? ''

            return dateTaskA.localeCompare(dateTaskB)
        })
}

function getTasksHoje(): Task[] {

    return getTasks().filter(task => task.date && dateIsTodayAndPast(task.date))
}

function getTasksProgramados(): Task[] {

    return getTasks().filter(task => !!task.date)
}

const initialState: Task[] = getTasksHoje()

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        filter: (state, action: PayloadAction<string>) => {

            switch (action.payload) {
                case 'Hoje':

                    return getTasksHoje()
                case 'Programados':

                    return getTasksProgramados()
            }

            return getTasks()
        },
    }
})

export const { filter, } = tasksSlice.actions
export default tasksSlice.reducer