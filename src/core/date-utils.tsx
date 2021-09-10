import { addMinutes, isPast, isToday } from "date-fns"

export function dateIsPast(date: string): boolean {

    let dateTask = new Date(date)
    dateTask = addMinutes(dateTask, dateTask.getTimezoneOffset())

    return isPast(dateTask) && !isToday(dateTask)
}

export function dateIsTodayAndPast(date: string): boolean {

    let dateTask = new Date(date)
    dateTask = addMinutes(dateTask, dateTask.getTimezoneOffset())

    return isPast(dateTask) || isToday(dateTask)
}

export function dateIsToday(date: string): boolean {

    let dateTask = new Date(date)
    dateTask = addMinutes(dateTask, dateTask.getTimezoneOffset())

    return isToday(dateTask)
}