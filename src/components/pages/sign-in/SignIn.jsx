import Button from "../../templates/button/Button";
import Input from "../../templates/input/Input";
import { SignUpWrapper } from "../sign-up/SignUpStyle";
import { Link, useNavigate } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';
import { useState } from "react";
import axios from 'axios'

export default function SignIn() {
    const [user, setUser] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const changingUser = (e) => setUser({ ...user, [e.target.name]: e.target.value })

    async function signIn(e) {
        e.preventDefault()
        setErrors([])

        try {
            setLoading(true)

            const userData = await axios.post('http://localhost:5000/sign-in', user)
            localStorage.setItem('currentUser', JSON.stringify(userData.data))

            setLoading(false)
            navigate('/home')
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
            <form onSubmit={signIn}>
                <Input type="email" text="E-mail" name="email"
                    onChange={(e) => changingUser(e)} disabled={loading} />
                {errors.length > 0 ? findError('email') : ''}
                <Input type="password" text="Senha" name="password"
                    onChange={(e) => changingUser(e)} disabled={loading} />
                {errors.length > 0 ? findError('password') : ''}
                <Button disabled={loading} text={loading ?
                    <Bars heigth="50" width="50" color="#e5e5e5" ariaLabel="loading-indicator" /> : 'Entrar'} />
            </form>
            <Link to="/sign-up" style={{ textDecoration: 'none' }}>
                <p>Primeira vez? Cadastre-se!</p>
            </Link>
        </SignUpWrapper>
    )
}