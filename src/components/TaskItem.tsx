import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle } from "@fortawesome/free-regular-svg-icons";
import { dateIsPast } from "../core/date-utils";

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

export default function TaskItem(task: Task) {

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

    return <Container>

        <Checkbox>

            <FontAwesomeIcon icon={task.done ? faCheckCircle : faCircle} />
        </Checkbox>
        <Content>
            <Name>{task.name}</Name>
            {task.date && <DateField inPast={dateIsPast(task.date)}>{formatDate()}</DateField>}
        </Content>
    </Container>
}

export interface Task {
    id: string
    done: boolean
    name: string
    date?: string | null
}