import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle } from "@fortawesome/free-regular-svg-icons";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Popover, } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import { useAppDispatch as UseAppDispatch, useAppSelector, } from "../redux/hooks";
import { dateIsPast } from "../core/date-utils";
import { delTask, editTask, Task } from "../core/task-query";
import { operation, select } from "../redux/reducer";

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
    align-items: center;
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

const ButtonEdit = styled.button`
    margin: 0.6rem;
    font-size: 1.2rem;
    background-color: #fff;
    color: #047aff;
    border: none;
    cursor: pointer;
`;

const ButtonDel = styled.button`
    margin: 0.6rem;
    font-size: 1.2rem;
    background-color: #fff;
    color: #ff3c2f;
    border: none;
    cursor: pointer;
`;

const ButtonMenu = styled.button`
    margin: 0.6rem;
    font-size: 1.2rem;
    background-color: #fff;
    color: #686667;
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

    function onDellTask() {

        delTask(task)

        if (activedBadge)
            dispatch(select(activedBadge.filter.name))
    }

    function onEditTask() {

        dispatch(operation({ type: 'editing', id: task.id }))
    }

    function onCheckTask() {

        editTask({ ...task, done: !task.done })

        if (activedBadge)
            dispatch(select(activedBadge.filter.name))
    }

    const menu = (
        <>
            <ButtonDel onClick={onDellTask}>

                <FontAwesomeIcon icon={faTrash} />
            </ButtonDel>

            <ButtonEdit onClick={onEditTask}>

                <FontAwesomeIcon icon={faPencilAlt} />
            </ButtonEdit>
        </>
    );

    return <Container>

        <Checkbox onClick={onCheckTask}>

            <FontAwesomeIcon icon={task.done ? faCheckCircle : faCircle} />
        </Checkbox>
        <Content>
            <ContentNameDate>

                <Name>{task.name}</Name>
                {task.date && <DateField inPast={dateIsPast(task.date)}>{formatDate()}</DateField>}
            </ContentNameDate>

            <Popover placement="leftTop" content={menu} trigger="click" >

                <ButtonMenu>

                    <MenuOutlined />
                </ButtonMenu>
            </Popover>
        </Content>
    </Container>
}