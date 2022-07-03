import axios from 'axios';
import { BASE_URL, config } from "../mock/data";
import { errorToast, successToast } from './global';

async function getRecords(currentUser, setCurrentUser, setRecords, setBalance, setLoading, navigate) {
    try {
        setLoading(true)

        const recordsData = await axios.get(`${BASE_URL}/wallet/records`, config(currentUser))
        setRecords(recordsData.data.records)
        setBalance(recordsData.data.balance.sum)

        setTimeout(() => setLoading(false), 1000)
    } catch (err) {
        if (err.response.data) {
            if(err.response.status === 401) {
                errorToast('sessão expirada')
                setTimeout(() => logout(setCurrentUser, navigate), 1500)
            } else {
                errorToast(err.response.data)
            }
        }
        else {
            errorToast(err.message)
        }
    }
}

async function deleteRecord(id, currentUser, setCurrentUser, setRecords, setBalance, setLoading, navigate) {
    try {
        await axios.delete(`${BASE_URL}/wallet/records/${id}`, config(currentUser))
        getRecords(currentUser, setCurrentUser, setRecords, setBalance, setLoading, navigate)

        successToast('Registro deletado!')
    } catch (err) {
        if (err.response.data) {
            if(err.response.status === 401) {
                errorToast('sessão expirada')
                setTimeout(() => logout(setCurrentUser, navigate), 1500)
            } else {
                errorToast(err.response.data)
            }
        }
        else {
            errorToast(err.message)
        }
    }
}

function logout(setCurrentUser, navigate) {
    localStorage.clear()
    setCurrentUser({})
    navigate('/')
}

function sendRecordType(type, navigate, record) {
    navigate(`/new-record/${record ? record._id : ''}`, 
    { state: record ? { type, record } : { type } })
} 

export { getRecords, logout, sendRecordType, deleteRecord }