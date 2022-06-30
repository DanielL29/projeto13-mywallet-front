import { HomeWrapper, RecordsWrapper, NewRecordButtons } from "./HomeStyle";
import { useContext, useEffect, useState } from "react";
import UserContext from '../../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import Record from './Record'
import { getRecords, logout, sendRecordType } from "../../../functions/home";
import { IoLogOutOutline, IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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

    function renderRecords() {
        if (records.length > 0) {
            return (
                <>
                    <div className="records">
                        {records.map(record =>
                            <Record key={record._id}
                                id={record._id}
                                date={loading ? <Skeleton width={70} height={20} /> : record.date}
                                description={loading ? <Skeleton width="99%" height={20} /> : record.description}
                                price={loading ? <Skeleton width={70} height={20} /> : record.price}
                                isIncrease={record.isIncrease}
                                setRecords={setRecords}
                                setBalance={setBalance}
                                setLoading={setLoading}
                            />
                        )}
                    </div>
                    <div className="balance">
                        <h1>SALDO</h1>
                        <h2 className={balanceStatus}>{loading ? <Skeleton width={70} height={30} /> : balanceFormatted}</h2>
                    </div>
                </>
            )
        } else if(!loading && records.length === 0) {
            return <div className="no-records">Não há registros de entrada ou saída</div>
        } 
    }

    return (
        <HomeWrapper>
            <div className="header">
                <h1>Olá, {currentUser.name}</h1>
                <IoLogOutOutline className="logout" onClick={() => logout(setCurrentUser, navigate)} />
            </div>
            <RecordsWrapper>
                {renderRecords()}
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