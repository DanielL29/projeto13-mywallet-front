import styled from 'styled-components'

export const HomeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    height: 100vh;
    width: 100%;
    box-sizing: border-box;
    padding: 0 25px;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        width: 100%;
        margin: 25px 0;
        font-size: 26px;
        font-weight: 700;
        color: #fff;
    }

    .no-records {
        display: flex;
        justify-content: center;
        align-items: center;

        height: 100%;
        width: 180px;
        margin: 0 auto;
        font-size: 20px;
        color: #868686;
        text-align: center;
    }

    .logout {
        cursor: pointer;
        transition: all 300ms ease-in-out;
    }

    .logout:hover {
        transform: scale(1.2);
    }

    @media screen and (max-width: 370px) {
        width: 100%;
    }
`

export const RecordsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    background-color: #fff;
    width: 100%;
    flex: 1;
    margin-bottom: 13px;
    border-radius: 5px;
    padding: 0 15px;
    padding-top: 23px;
    padding-bottom: 10px;
    box-sizing: border-box;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }

    .records {
        flex: 1;
    }

    .balance {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    h1 {
        font-size: 17px;
        font-weight: 700;
        color: #000;
    }
`

export const NewRecordButtons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 114px;
    font-size: 17px;
    margin-bottom: 16px;
    color: #fff;

    div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        width: 50%;
        height: 100%;
        background-color: #A328D6;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 10px;
        cursor: pointer;
    }

    .new-record-icon {
        cursor: pointer;
        transition: all 300ms ease-in-out;
        font-size: 23px;
    }

    div:hover img, div:hover .new-record-icon {
        transform: translateY(100%);
    }

    div:first-child {
        margin-right: 15px;
    }

    h3 {
        width: 64px;
        font-weight: 700;
    }
`

export const RecordWrapper = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
    margin-bottom: 25px;

    span {
        color: #C6C6C6;
        margin-right: 7px;
    }

    p {
        flex: 1;
        word-wrap: break-word;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 50%;
        margin-right: 5px;
        cursor: pointer;
    }
    
    h2 {
        margin-right: 10px;
        word-wrap: break-word;
    }

    .close {
        color: #C6C6C6;
        font-size: 17px;
        transition: all 200ms ease-in-out;
        cursor: pointer;
    }

    .close:hover {
        transform: scale(1.3);
        filter: brightness(0.8);
    }

    .Toastify .Toastify__toast {
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);
    }
`