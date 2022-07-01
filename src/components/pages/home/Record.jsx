import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { RecordWrapper } from "./HomeStyle";
import UserContext from '../../../contexts/UserContext';
import { useContext } from 'react';
import { deleteRecord, sendRecordType } from '../../../functions/home';
import { IoCloseOutline } from 'react-icons/io5'
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Record({ date, description, price, isIncrease, id, setRecords, setBalance, setLoading, record }) {
    const navigate = useNavigate()
    const priceFormatted = typeof price === 'number' ? Math.abs(price).toFixed(2).toString().replace('.', ',') : price
    const titleStyle = { fontSize: '25px', paddingBottom: '10px', fontWeight: 'bold' }
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const title = <p style={titleStyle}>Excluir Registro</p>

    function confirmDelete() {
        confirmAlert({
            title,
            message: 'Deseja excluir esse registro?',
            buttons: [
                {
                    label: 'Sim', onClick: () => deleteRecord(
                        id, currentUser, setCurrentUser, 
                        setRecords, setBalance, setLoading, navigate
                    ), 
                    style: { background: '#8C11BE', width: '80px', height: '50px' }
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
            <IoCloseOutline className='close' onClick={() => typeof price === 'number' ? confirmDelete() : () => false} />
            <ToastContainer />
        </RecordWrapper>
    )
}