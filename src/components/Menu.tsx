import styled from "styled-components";

import Badge from "./Badge"
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { select } from "../redux/reducer";

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

const Item = styled.div`
    flex: 1;
    padding: 0.5rem;
`;

export default function Menu() {

    const menuOptions = useAppSelector(state => state.menuOptions)
    const dispatch = useAppDispatch()

    return <Container>
        {menuOptions.map((menuOption, index) => <Item key={index} onClick={() => dispatch(select(menuOption.name))}> <Badge {...menuOption}></Badge></Item>)}
    </Container>
}