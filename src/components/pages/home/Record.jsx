import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { RecordWrapper } from "./HomeStyle";
import { BASE_URL, config } from "../../../mock/data";
import axios from 'axios';
import UserContext from '../../../contexts/UserContext';
import { useContext } from 'react';

export default function Record({ date, description, price, isIncrease, id, getRecords }) {
    const priceFormatted = Number(price).toFixed(2).toString().replace('-', '').replace('.', ',')
    const titleStyle = { fontSize: '25px', paddingBottom: '10px', fontWeight: 'bold' }
    const { currentUser } = useContext(UserContext)

    function deleteRecord(id) {
        confirmAlert({
            title: <p style={titleStyle}>Excluir Registro</p>,
            message: 'Deseja excluir esse registro?',
            buttons: [
                { label: 'Sim', onClick: async () => {
                    try {
                        await axios.delete(`${BASE_URL}/records/${id}`, config(currentUser))
                        getRecords()
                    } catch (err) {
                        if (err.response.data) alert(err.response.data)
                        else alert(err.message)
                    }
                }, style: { background: '#8C11BE', width: '80px', height: '50px' }},
                { label: 'Não', style: { background: '#A328D6', width: '80px', height: '50px' } }
            ]
        })
    }

    return (
        <RecordWrapper>
            <span>{date}</span>
            <p>{description}</p>
            <h2 className={isIncrease ? 'green' : 'red'}>{priceFormatted}</h2>
            <ion-icon name="close-outline" onClick={() => deleteRecord(id)}></ion-icon>
        </RecordWrapper>
    )
}