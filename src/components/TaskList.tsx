import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch as UseAppDispatch, useAppSelector } from "../redux/hooks";
import { addTask, TypesTasksFilter } from '../core/task-query'
import { default as TaskItem, } from "./TaskItem";
import { select } from "../redux/reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

const ButtonAdd = styled.button`
    margin: 0.6rem;
    font-size: 2rem;
    background-color: #fff;
    border: none;
    cursor: pointer;
`;

export default function TaskList() {

    const tasksFilter = useAppSelector(state => state.menuOptions)

    const dispatch = UseAppDispatch()

    const activedBadge = tasksFilter.find(taskFilter => taskFilter.filter.active)

    function onAddTask(type: TypesTasksFilter) {

        addTask({
            id: uuidv4(),
            done: true,
            name: 'teste 2 away',
            date: '2021-08-07',
        })

        dispatch(select(type))
    }

    return <>
        {!!activedBadge ?

            <Container>

                {activedBadge.tasks.map((taskItem, index) => <TaskItem key={index} {...taskItem}></TaskItem>)}

                <ButtonAdd onClick={() => onAddTask(activedBadge?.filter.name)}>

                    <FontAwesomeIcon icon={faPlusCircle} />
                </ButtonAdd>
            </Container>
            :
            <p>...</p>}
    </>
}