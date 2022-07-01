import axios from 'axios'
import { BASE_URL, config } from '../mock/data'
import { errorToast, successToast } from './global'
import { logout } from './home'

async function saveNewRecord(e, record, type, currentUser, setCurrentUser, navigate, setLoading, setErrors, id) {
    e.preventDefault()
    setErrors([])

    const method = id === '' ? 'post' : 'put'
    const saveType = id === '' ? 'registrada' : 'atualizada'
    const message = type === 'entry' ? `Entrada ${saveType}!` : `Saida ${saveType}!`

    const recordObj = { 
        price: Number(record.price), 
        description: record.description, 
        isIncrease: type === 'entry' ? true : false 
    }

    try {
        setLoading(true)

        await axios[method](`${BASE_URL}/wallet/records/${id}`, recordObj, config(currentUser))
        
        setLoading(false)
        successToast(message)
        setTimeout(() => navigate('/home'), 2000)
    } catch (err) {
        if(err.response.data.details) {
            setErrors(err.response.data.details)
            setLoading(false)
        } else if(err.response.data) {
            if(err.response.status === 401) {
                errorToast(err.response.data)
                setTimeout(() => logout(setCurrentUser, navigate), 1000)
            } else {
                errorToast(err.response.data)
                setLoading(false)
            }
        } else {
            errorToast(err.message)
            setLoading(false)
        }
    }
}

function recordType(label, type) {
    return type === 'entry' ? `${label} entrada` : `${label} saída`
}

function getLocation(isLocation, location, navigate, setType, setRecord) {
    if(isLocation) {
        navigate('/home')
    } else {
        if(location.state.record) {
            setType(location.state.type)
            setRecord({ 
                price: Math.abs(location.state.record.price), 
                description: location.state.record.description
            })
        } else {
            setType(location.state.type)
        }
    }
}

export { saveNewRecord, recordType, getLocation }