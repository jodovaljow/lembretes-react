import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

import { TypesTasksFilter } from "../core/task-query";

const Icon = styled.span<PropsIconBadge>`
    background-color: ${props => props.active ? "#fff" : props.color};
    color: ${props => props.active ? props.color : "#fff"};
    border-radius: 50%;
    margin-right: 1em;
    padding: 0.4rem
`;

const Count = styled.h2`
    margin: 0;
    display: inline;
`;

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 1em;
`;

const Titulo = styled.h4`
    margin: 0;
    text-align: left;
`;

const Button = styled.button<PropsBadge>`
    border-radius: 10px;
    padding: 0.5rem;
    cursor: pointer;
    width: 100%;
    
    color: ${props => props.active ? "#fff" : "#686667"};   
    background-color: ${props => props.active ? props.color : "#d1cccd"};
    border: ${props => props.active ? props.color : "#d1cccd"};
`

export default function Badge(props: PropsBadge) {
    return <Button {...props}>

        <Top>

            <Icon {...props}>

                <FontAwesomeIcon icon={props.icon} />
            </Icon>
            <Count>{props.count}</Count>
        </Top>
        <Titulo>{props.name}</Titulo>
    </Button>
}

export interface PropsBadge {
    name: TypesTasksFilter
    count: number
    color: string
    active: boolean
    icon: IconDefinition
}

interface PropsIconBadge {
    color: string
    active: boolean
}