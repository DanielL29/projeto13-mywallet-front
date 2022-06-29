import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import UserContext from '../../../contexts/UserContext'
import Button from '../../templates/button/Button'
import Input from '../../templates/input/Input'
import axios from 'axios'
import { NewRecordWrapper } from './NewRecordStyle'
import { Bars } from 'react-loader-spinner';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { config } from '../../../functions/auth'

export default function NewRecord() {
    const [type, setType] = useState('')
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [record, setRecord] = useState({ price: '', description: '' })

    const location = useLocation()
    const navigate = useNavigate()
    const { currentUser } = useContext(UserContext)

    useEffect(() => {
        if(location.state === null) {
            navigate('/home')
        } else {
            setType(location.state.type)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const changingRecord = (e) => setRecord({ ...record, [e.target.name]: e.target.value })

    async function saveNewRecord(e) {
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
            toast.success(type === 'entry' ? 'Nova entrada registrada!' : 'Nova saida registrada!', {
                autoClose: 1500,
                hideProgressBar: true,
                pauseOnHover: false,
                theme: 'colored'
            })
            setTimeout(() => navigate('/home'), 1500)
        } catch (err) {
            if(err.response.data.details) {
                setErrors(err.response.data.details)
                setLoading(false)
            } else if(err.response.data) {
                 alert(err.response.data)
                 setLoading(false)
            } else {
                alert(err.message)
                setLoading(false)
            }
        }
    }

    function findError(key) {
        const errorFounded = errors.find(erro => erro.context.key === key)

        return (
            <h2>{errorFounded !== undefined ? errorFounded.message : ''}</h2>
        )
    }
    
    return (
        <NewRecordWrapper>
            <h1>{type === 'entry' ? 'Nova entrada' : 'Nova saída'}</h1>
            <form onSubmit={saveNewRecord}>
                <Input type="number" step="0.01" text="Valor" name="price" 
                    onChange={(e) => changingRecord(e)} disabled={loading === true} />
                {errors.length > 0 ? findError('price') : ''}
                <Input type="text" text="Descrição" name="description" 
                    onChange={(e) => changingRecord(e)} disabled={loading === true} />
                {errors.length > 0 ? findError('description') : ''}
                <Button disabled={loading === true} text={loading ? 
                    <Bars heigth="50" width="50" color="#e5e5e5" ariaLabel="loading-indicator" /> :
                    type === 'entry' ? 'Salvar entrada' : 'Salvar saída'} 
                />
            </form>
            <ToastContainer  />
        </NewRecordWrapper>
    )
}