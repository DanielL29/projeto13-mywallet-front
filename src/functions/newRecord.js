import axios from 'axios'
import { config } from '../mock/data'
import { errorToast, successToast } from './global'

async function saveNewRecord(e, record, type, currentUser, navigate, setLoading, setErrors) {
    e.preventDefault()
    setErrors([])

    const recordObj = { 
        price: Number(record.price), 
        description: record.description, 
        isIncrease: type === 'entry' ? true : false 
    }

    try {
        setLoading(true)

        await axios.post('http://localhost:5000/records', recordObj, config(currentUser))
        
        setLoading(false)
        successToast(type === 'entry' ? 'Nova entrada registrada!' : 'Nova saida registrada!')
        setTimeout(() => navigate('/home'), 2000)
    } catch (err) {
        if(err.response.data.details) {
            setErrors(err.response.data.details)
            setLoading(false)
        } else if(err.response.data) {
             errorToast(err.response.data)
             setLoading(false)
        } else {
            errorToast(err.message)
            setLoading(false)
        }
    }
}

export { saveNewRecord }