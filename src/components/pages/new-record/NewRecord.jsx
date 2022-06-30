import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import UserContext from '../../../contexts/UserContext'
import Button from '../../templates/button/Button'
import Input from '../../templates/input/Input'
import { NewRecordWrapper } from './NewRecordStyle'
import { Bars } from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { changeObject, errorOrNothing } from '../../../functions/global'
import { getLocation, recordType, saveNewRecord } from '../../../functions/newRecord'

export default function NewRecord() {
    const [type, setType] = useState('')
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [record, setRecord] = useState({ price: '', description: '' })

    const location = useLocation()
    const navigate = useNavigate()
    const { currentUser } = useContext(UserContext)
    const isLocation = location.state === null

    useEffect(() => {
        getLocation(isLocation, location, navigate, setType, setRecord)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function callSendNewRecord(e) {
        return saveNewRecord(
            e, record, type, currentUser, 
            navigate, setLoading, setErrors, 
            !isLocation && !location.state.record ? '' : location.state.record._id
        )
    }
    
    return (
        <NewRecordWrapper>
            <h1>{recordType(!isLocation && !location.state.record ? 'Nova' : 'Editar', type)}</h1>
            <form onSubmit={callSendNewRecord}>
                <Input type="number" step="0.01" text="Valor" name="price" value={record.price} 
                    onChange={(e) => changeObject(e, record, setRecord)} disabled={loading} />
                {errorOrNothing('price', errors)}
                <Input type="text" text="Descrição" name="description" value={record.description} 
                    onChange={(e) => changeObject(e, record, setRecord)} disabled={loading} />
                {errorOrNothing('description', errors)}
                <Button disabled={loading} text={loading ? 
                    <Bars heigth="50" width="50" color="#e5e5e5" ariaLabel="loading-indicator" /> :
                    recordType(!isLocation && !location.state.record ? 'Salvar' : 'Atualizar', type)} 
                />
            </form>
            <ToastContainer  />
        </NewRecordWrapper>
    )
}