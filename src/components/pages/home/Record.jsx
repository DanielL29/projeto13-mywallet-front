import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { RecordWrapper } from "./HomeStyle";
import { BASE_URL, config } from "../../../mock/data";
import axios from 'axios';
import UserContext from '../../../contexts/UserContext';
import { useContext } from 'react';
import { getRecords, sendRecordType } from '../../../functions/home';
import { successToast, errorToast } from '../../../functions/global'
import { IoCloseOutline } from 'react-icons/io5'
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Record({ date, description, price, isIncrease, id, setRecords, setBalance, setLoading, record }) {
    const navigate = useNavigate()
    const priceFormatted = typeof price === 'number' ? Math.abs(price).toFixed(2).toString().replace('.', ',') : price
    const titleStyle = { fontSize: '25px', paddingBottom: '10px', fontWeight: 'bold' }
    const { currentUser } = useContext(UserContext)
    const title = <p style={titleStyle}>Excluir Registro</p>

    function deleteRecord(id) {
        confirmAlert({
            title,
            message: 'Deseja excluir esse registro?',
            buttons: [
                {
                    label: 'Sim', onClick: async () => {
                        try {
                            await axios.delete(`${BASE_URL}/records/${id}`, config(currentUser))
                            getRecords(currentUser, setRecords, setBalance, setLoading)

                            successToast('Registro deletado!')
                        } catch (err) {
                            if (err.response.data) errorToast(err.response.data)
                            else errorToast(err.message)
                        }
                    }, style: { background: '#8C11BE', width: '80px', height: '50px' }
                },
                { label: 'Não', style: { background: '#A328D6', width: '80px', height: '50px' } }
            ]
        })
    }

    return (
        <RecordWrapper>
            <span>{date}</span>
            <p onClick={() => sendRecordType(isIncrease ? 'entry' : 'exit', navigate, record)}>{description}</p>
            <h2 className={isIncrease ? 'green' : 'red'}>{priceFormatted}</h2>
            <IoCloseOutline className='close' onClick={() => typeof price === 'number' ? deleteRecord(id) : () => false} />
            <ToastContainer />
        </RecordWrapper>
    )
}