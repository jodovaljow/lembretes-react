import { faCalendarAlt, faCalendarCheck, IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { faInbox } from "@fortawesome/free-solid-svg-icons";

import { dateIsTodayAndPast } from "./date-utils";

function getTasks(): Task[] {

    return JSON.parse(window.localStorage.getItem('tasks') ?? '[]')
        .sort((taskA: Task, taskB: Task) => {

            const dateTaskA: string = taskA.date ?? ''
            const dateTaskB: string = taskB.date ?? ''

            return dateTaskA.localeCompare(dateTaskB)
        })
}

export function getApplicationStateInit(): ApplicationState {

    return {
        operation: 'init',
        tasksFilter: getTasksFilter(),
    }
}

function getTasksFilter(): TasksFilter[] {

    const tasks: Task[] = getTasks()

    return [
        {
            filter: {
                name: "Hoje",
                active: true,
                color: "#047aff",
                icon: faCalendarCheck,
            },
            tasks: tasks.filter(task => task.date && dateIsTodayAndPast(task.date)),
        },
        {
            filter: {
                name: "Programados",
                active: false,
                color: "#ff3c2f",
                icon: faCalendarAlt,
            },
            tasks: tasks.filter(task => !!task.date),
        },
        {
            filter: {
                name: "Todos",
                active: false,
                color: "#5b626a",
                icon: faInbox,
            },
            tasks: tasks,
        },
    ]
}

function setTasks(tasks: Task[]) {

    window.localStorage.setItem('tasks', JSON.stringify(tasks))
}

export function addTask(task: Task) {

    const tasks: Task[] = getTasks()

    tasks.push(task);

    setTasks(tasks)
}

export function delTask(taskToDel: Task) {

    const tasks: Task[] = getTasks().filter(task => task.id !== taskToDel.id)

    setTasks(tasks)
}

export function editTask(taskToEdit: Task) {

    const tasks: Task[] = getTasks().map(task => task.id === taskToEdit.id ? { ...taskToEdit } : task)

    setTasks(tasks)
}

export interface Task {
    id: string
    done: boolean
    name: string
    date?: string | null
}

export interface ApplicationState {
    operation: TypesOperation,
    tasksFilter: TasksFilter[],
}

export interface TasksFilter {
    filter: {
        name: TypesTasksFilter
        color: string
        active: boolean
        icon: IconDefinition
    },
    tasks: Task[],
}

export type TypesTasksFilter = 'Hoje' | 'Programados' | 'Todos'
export type TypesOperation = 'init' | 'editing' | 'adding'