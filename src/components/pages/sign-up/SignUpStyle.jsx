import styled from 'styled-components'

export const SignUpWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    h1 {
        margin-bottom: 25px;
        color: #fff;
        font-size: 32px;
        font-family: 'Saira Stencil One', cursive;
    }

    h2 {
        font-weight: 700;
        font-size: 18px;
        color: #f76969;
        align-self: flex-start;
        width: 326px;
        margin-bottom: 10px;
    }

    p {
        font-size: 15px;
        font-weight: 700;
        color: #fff;
    }

    p:hover {
        cursor: pointer;
        text-decoration: underline;
    }
`