import { useCallback, useEffect } from "react";
import styled from "styled-components";

import Badge, { PropsBadge } from "./Badge"
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { operation, select } from "../redux/reducer";
import { TasksFilter, TypesTasksFilter } from "../core/task-query";

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background-color: #e8e2e3;
`;

const Item = styled.div`
    flex: 1;
    padding: 0.5rem;
`;

export default function Menu() {

    const applicationState = useAppSelector(state => state.applicationState)
    const dispatch = useAppDispatch()

    const escFunction = useCallback((event) => {
        if (event.keyCode === 27) {

            dispatch(operation({ type: 'init' }))
        }
    }, [dispatch]);

    useEffect(() => {

        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction]);

    function onSelectMenuOption(typesTasksFilter: TypesTasksFilter) {

        dispatch(select(typesTasksFilter))
    }

    function getPropsBadge(tasksFilter: TasksFilter): PropsBadge {

        return {
            ...tasksFilter.filter,
            count: tasksFilter.tasks.reduce((prev, task) => task.done ? prev : prev + 1, 0)
        }
    }

    return <Container>
        {applicationState.tasksFilter.map((menuOption, index) =>
            <Item key={index} onClick={() => onSelectMenuOption(menuOption.filter.name)}>
                <Badge {...getPropsBadge(menuOption)}></Badge>
            </Item>)}
    </Container >
}