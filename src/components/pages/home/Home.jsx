import { HomeWrapper, RecordsWrapper, NewRecordButtons, RecordWrapper } from "./HomeStyle";
import remove from '../../../assets/images/remove.svg'
import { useContext, useEffect, useState } from "react";
import axios from 'axios'
import UserContext from '../../../contexts/UserContext'
import { useNavigate } from 'react-router-dom';

function Record({ date, description, price, isIncrease }) {
    const priceFormatted = price.toFixed(2).replace('-', '')

    return (
        <RecordWrapper>
            <span>{date}</span>
            <p>{description}</p>
            <h2 className={isIncrease ? 'green' : 'red'}>{priceFormatted}</h2>
        </RecordWrapper>
    )
}

export default function Home() {
    const [records, setRecords] = useState([])
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        getRecords()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function getRecords() {
        const config = {
            headers: {
                "Authorization": `bearer ${currentUser.token}`
            }
        }

        try {
            const recordsData = await axios.get('http://localhost:5000/records', config)
            setRecords(recordsData.data)
        } catch(err) {
            if(err.response.data) {
                alert(err.response.data)
            } else {
                alert(err.message)
            }
        }
    }

    function logout() {
        localStorage.clear()
        setCurrentUser({})
        navigate('/')
    }

    function sendRecordType(type) {
        navigate('/new-record', { state: { type } })
    }

    return (
        <HomeWrapper>
            <div className="header">
                <h1>Olá, Fulano</h1>
                <ion-icon name="log-out-outline" onClick={logout}></ion-icon>
            </div>
            <RecordsWrapper>
                {records.length > 0 ? (
                    <>
                        <div className="records">
                            {records.map(record => {
                                return (
                                    <Record key={record._id} 
                                        date={record.date} 
                                        description={record.description} 
                                        price={record.price} 
                                        isIncrease={record.isIncrease} 
                                    />
                                )
                            })}
                        </div>
                        <div className="balance">

                        </div>
                    </>
                ) : <div className="no-records">Não há registros de entrada ou saída</div>}
            </RecordsWrapper>
            <NewRecordButtons>
                <div onClick={() => sendRecordType('entry')}>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <h3>Nova entrada</h3>
                </div>
                <div onClick={() => sendRecordType('exit')}>
                    <img src={remove} alt="remove" />
                    <h3>Nova saÍda</h3>
                </div>
            </NewRecordButtons>
        </HomeWrapper>
    )
}