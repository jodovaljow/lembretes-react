import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch as UseAppDispatch, useAppSelector, } from "../redux/hooks";
import { dateIsPast } from "../core/date-utils";
import { delTask, Task } from "../core/task-query";
import { select } from "../redux/reducer";

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%
`;

const Checkbox = styled.span`
    margin: 1rem;
    cursor: pointer;
    font-size: 2rem;
    color: #686667;
`;

const Content = styled.div`
    border-bottom: 1.5px solid #dddddd;
    flex: 1;
    display: flex;
`;

const ContentNameDate = styled.div`
    flex: 1;
`;

const Name = styled.p`
    margin: 0px;
    margin-top: 1rem;
    `;

const DateField = styled.p<{ inPast: boolean }>`
    color: ${props => props.inPast ? "red" : "#999999"};
    margin: 0px;
    margin-top: 0.2rem;
    margin-bottom: 1rem;
`;

const ButtonDel = styled.button`
    margin: 0.6rem;
    font-size: 1.2rem;
    background-color: #fff;
    color: #ff3c2f;
    border: none;
    cursor: pointer;
`;

export default function TaskItem(task: Task) {

    const applicationState = useAppSelector(state => state.applicationState)
    const dispatch = UseAppDispatch()

    const activedBadge = applicationState.tasksFilter.find(taskFilter => taskFilter.filter.active)

    function formatDate() {

        if (!task.date)
            return ''

        return new Date(task.date).toLocaleDateString(
            undefined,
            {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'utc',
            }
        );
    }

    function onDellTask(task: Task) {

        delTask(task)

        if (activedBadge)
            dispatch(select(activedBadge.filter.name))
    }

    return <Container>

        <Checkbox>

            <FontAwesomeIcon icon={task.done ? faCheckCircle : faCircle} />
        </Checkbox>
        <Content>
            <ContentNameDate>

                <Name>{task.name}</Name>
                {task.date && <DateField inPast={dateIsPast(task.date)}>{formatDate()}</DateField>}
            </ContentNameDate>

            <ButtonDel onClick={() => onDellTask(task)}>

                <FontAwesomeIcon icon={faTrash} />
            </ButtonDel>
        </Content>
    </Container>
}