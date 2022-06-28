import styled from 'styled-components'

export const ButtonWrapper = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 326px;
    height: 58px;
    color: #fff;
    background-color: #A328D6;
    border-radius: 5px;
    outline: none;
    border: none;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 35px;
    cursor: pointer;
    text-align: center;
    transition: all 300ms ease-in-out;

    &:hover {
        transform: scale(1.1);
    }
`