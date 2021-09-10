import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch as UseAppDispatch, useAppSelector } from "../redux/hooks";
import { Task, TypesTasksFilter } from '../core/task-query'
import { default as TaskItem, } from "./TaskItem";
import { operation } from "../redux/reducer";
import TaskItemEdit from "./TaskItemEdit";
import moment from "moment";

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

const ButtonAdd = styled.button`
    margin: 1rem;
    font-size: 2rem;
    background-color: #fff;
    border: none;
    cursor: pointer;
    padding: 0px;
`;

export default function TaskList() {

    const applicationState = useAppSelector(state => state.applicationState)

    const dispatch = UseAppDispatch()

    const activedBadge = applicationState.tasksFilter.find(taskFilter => taskFilter.filter.active)

    const newTask: Task = {
        id: '',
        done: false,
        name: '',
        date: activedBadge?.filter.name === 'Todos' ? null : moment().format('YYYY-MM-DD'),
    }

    function onAddTask(type: TypesTasksFilter) {

        dispatch(operation('adding'))
    }

    return <>
        {!!activedBadge ?

            <Container>

                {activedBadge.tasks.map((taskItem, index) => <TaskItem key={index} {...taskItem}></TaskItem>)}

                {applicationState.operation === 'init' &&
                    <ButtonAdd onClick={() => onAddTask(activedBadge?.filter.name)}>

                        <FontAwesomeIcon icon={faPlusCircle} />
                    </ButtonAdd>
                }

                {applicationState.operation === 'adding' && <TaskItemEdit {...newTask}></TaskItemEdit>}
            </Container>
            :
            <p>...</p>}
    </>
}