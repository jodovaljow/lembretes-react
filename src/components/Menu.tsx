import styled from "styled-components";

import Badge, { PropsBadge } from "./Badge"
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { select } from "../redux/reducer";
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

    const menuOptions = useAppSelector(state => state.menuOptions)
    const dispatch = useAppDispatch()

    function onSelectMenuOption(typesTasksFilter: TypesTasksFilter) {

        dispatch(select(typesTasksFilter))
    }

    function getPropsBadge(tasksFilter: TasksFilter): PropsBadge {

        return {
            ...tasksFilter.filter,
            count: tasksFilter.tasks.length
        }
    }

    return <Container>
        {menuOptions.map((menuOption, index) =>
            <Item key={index} onClick={() => onSelectMenuOption(menuOption.filter.name)}>
                <Badge {...getPropsBadge(menuOption)}></Badge>
            </Item>)}
    </Container >
}