import { SignUpWrapper } from './SignUpStyle'
import { Link, useNavigate } from 'react-router-dom'
import Input from "../../templates/input/Input";
import Button from '../../templates/button/Button';
import { Bars } from 'react-loader-spinner'
import { useState } from 'react';
import axios from 'axios'

export default function SignUp() {
    const [user, setUser] = useState({ name: '', email: '', password: '', confirmPassword: '' })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const changingUser = (e) => setUser({ ...user, [e.target.name]: e.target.value })

    async function signUp(e) {
        e.preventDefault()
        setErrors([])

        try {
            setLoading(true)

            await axios.post('http://localhost:5000/sign-up', user)
            
            setLoading(false)
            navigate('/')
        } catch(err) {
            if(err.response.data.details) {
                setErrors(err.response.data.details)
                setLoading(false)
            } else {
                alert(err.response.data)
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
        <SignUpWrapper>
            <h1>MyWallet</h1>
            <form onSubmit={signUp}>
                <Input type="text" text="Nome" name="name" 
                    onChange={(e) => changingUser(e)} disabled={loading} />
                {errors.length > 0 ? findError('name') : ''}
                <Input type="email" text="E-mail" name="email" 
                    onChange={(e) => changingUser(e)} disabled={loading} />
                {errors.length > 0 ? findError('email') : ''}
                <Input type="password" text="Senha" name="password" 
                    onChange={(e) => changingUser(e)} disabled={loading} />
                {errors.length > 0 ? findError('password') : ''}
                <Input type="password" text="Confirme a senha" name="confirmPassword" 
                    onChange={(e) => changingUser(e)} disabled={loading} /> 
                {errors.length > 0 ? findError('confirmPassword') : ''}
                <Button disabled={loading} text={loading ? 
                    <Bars heigth="50" width="50" color="#e5e5e5" ariaLabel="loading-indicator" /> : 'Cadastrar'} />
            </form>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <p>Já tem uma conta? Entre agora!</p>
            </Link>
        </SignUpWrapper>
    )
}