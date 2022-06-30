import { HomeWrapper, RecordsWrapper, NewRecordButtons } from "./HomeStyle";
import { useContext, useEffect, useState } from "react";
import UserContext from '../../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { getRecords, logout, sendRecordType } from "../../../functions/home";
import { IoLogOutOutline, IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'
import Records from "./Records";

export default function Home() {
    const [records, setRecords] = useState([])
    const [balance, setBalance] = useState(null)
    const [loading, setLoading] = useState(false)
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const navigate = useNavigate()

    const balanceFormatted = Number(balance).toFixed(2).toString().replace('.', ',')
    const balanceStatus = Number(balance) < 0 ? 'red' : 'green'

    useEffect(() => {
        getRecords(currentUser, setRecords, setBalance, setLoading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <HomeWrapper>
            <div className="header">
                <h1>Olá, {currentUser.name}</h1>
                <IoLogOutOutline className="logout" onClick={() => logout(setCurrentUser, navigate)} />
            </div>
            <RecordsWrapper>
                <Records 
                    records={records} 
                    balanceFormatted={balanceFormatted} 
                    balanceStatus={balanceStatus} 
                    loading={loading} 
                    setBalance={setBalance} 
                    setLoading={setLoading} 
                    setRecords={setRecords} 
                />
            </RecordsWrapper>
            <NewRecordButtons>
                <div onClick={() => sendRecordType('entry', navigate)}>
                    <IoAddCircleOutline className="new-record-icon" />
                    <h3>Nova entrada</h3>
                </div>
                <div onClick={() => sendRecordType('exit', navigate)}>
                    <IoRemoveCircleOutline className="new-record-icon" />
                    <h3>Nova saÍda</h3>
                </div>
            </NewRecordButtons>
        </HomeWrapper>
    )
}