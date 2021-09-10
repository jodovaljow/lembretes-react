import styled from "styled-components";

import { useAppSelector } from "../redux/hooks";
import { default as TaskItem, } from "./TaskItem";

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

export default function TaskList() {

    const taskItems = useAppSelector(state => state.tasks)

    return <Container>

        {taskItems.map((taskItem, index) => <TaskItem key={index} {...taskItem}></TaskItem>)}
    </Container>
}