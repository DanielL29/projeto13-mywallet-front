import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function NewRecord() {
    const [type, setType] = useState('')
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if(location.state === null) {
            navigate('/home')
        } else {
            setType(location.state.type)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        type === 'entry' ? <div>NOVA ENTRADA</div> : <div>NOVA SAIDA</div> 
    )
}