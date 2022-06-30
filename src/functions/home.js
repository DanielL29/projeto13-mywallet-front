import axios from 'axios';
import { BASE_URL, config } from "../mock/data";
import { errorToast } from './global';

async function getRecords(currentUser, setRecords, setBalance, setLoading) {
    try {
        setLoading(true)

        const recordsData = await axios.get(`${BASE_URL}/records`, config(currentUser))
        setRecords(recordsData.data.records)
        setBalance(recordsData.data.balance.sum)

        setTimeout(() => setLoading(false), 1000)
    } catch (err) {
        if (err.response.data) errorToast(err.response.data)
        else errorToast(err.message)
    }
}

function logout(setCurrentUser, navigate) {
    localStorage.clear()
    setCurrentUser({})
    navigate('/')
}

function sendRecordType(type, navigate) {
    navigate('/new-record', { state: { type } })
} 

export { getRecords, logout, sendRecordType }