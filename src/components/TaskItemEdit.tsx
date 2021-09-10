import { BaseSyntheticEvent, useState, } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle, } from "@fortawesome/free-regular-svg-icons";
import { faSave, faUndo } from "@fortawesome/free-solid-svg-icons";
import { DatePicker, } from "antd";
import 'antd/dist/antd.css';
import 'moment/locale/pt-br';
import ptBr from 'antd/es/date-picker/locale/pt_BR';
import { v4 as uuidv4 } from 'uuid';
import moment, { Moment } from "moment";

import { useAppDispatch as UseAppDispatch, useAppSelector, } from "../redux/hooks";
import { addTask, editTask, Task } from "../core/task-query";
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
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const NameInput = styled.input`
    margin: 0px;
    margin-top: 1rem;
    `;

const ButtonSave = styled.button`
    opacity: ${props => props.disabled ? "0.5" : "1"};
    cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
    margin: 0.6rem;
    font-size: 1.2rem;
    background-color: #fff;
    color: #047aff;
    border: none;
`;

const ButtonCancel = styled.button`
    margin: 0.6rem;
    font-size: 1.2rem;
    background-color: #fff;
    color: #ff9500;
    border: none;
    cursor: pointer;
`;

export default function TaskItemEdit(props: Task) {

    const applicationState = useAppSelector(state => state.applicationState)
    const dispatch = UseAppDispatch()

    const [task, setTask] = useState(props);

    const activedBadge = applicationState.tasksFilter.find(taskFilter => taskFilter.filter.active)

    function formatDate(): Moment | null {

        if (!task.date)
            return null

        return moment(task.date)
    }

    function onCancelTask(task: Task) {

        if (activedBadge)
            dispatch(select(activedBadge.filter.name))
    }

    function onSaveTask(task: Task) {

        if (task.id) {

            editTask(task)
        }
        else {

            addTask({ ...task, id: uuidv4() })
        }

        if (activedBadge)
            dispatch(select(activedBadge.filter.name))
    }

    function onCheckboxClick() {

        setTask({ ...task, done: !task.done })
    }

    function onNameChange(name: BaseSyntheticEvent) {

        setTask({ ...task, name: name.target.value })
    }

    function onDateChange(date: Moment | null) {

        if (date)
            setTask({ ...task, date: date.format('YYYY-MM-DD') })
        else
            setTask({ ...task, date: null })
    }

    function isSaveDisabled(): boolean {

        return !task.name.trim()
    }

    function onKeyPressName(event: React.KeyboardEvent) {

        if (event.key === 'Enter') {

            onSaveTask(task)
        }
    }

    return <Container>

        <Checkbox onClick={onCheckboxClick}>

            <FontAwesomeIcon icon={task.done ? faCheckCircle : faCircle} />
        </Checkbox>
        <Content>
            <ContentNameDate>

                <NameInput value={task.name} onChange={onNameChange} onKeyPress={onKeyPressName}></NameInput>
                <DatePicker onChange={onDateChange} size={"small"} format="LL" locale={ptBr} value={formatDate()} />
            </ContentNameDate>

            <ButtonCancel onClick={() => onCancelTask(task)}>

                <FontAwesomeIcon icon={faUndo} />
            </ButtonCancel>

            <ButtonSave onClick={() => onSaveTask(task)} disabled={isSaveDisabled()}>

                <FontAwesomeIcon icon={faSave} />
            </ButtonSave>
        </Content>
    </Container>
}