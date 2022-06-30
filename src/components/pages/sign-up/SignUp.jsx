import { SignUpWrapper } from './SignUpStyle'
import { Link, useNavigate } from 'react-router-dom'
import Input from "../../templates/input/Input";
import Button from '../../templates/button/Button';
import { Bars } from 'react-loader-spinner'
import { useState } from 'react';
import { changeObject, errorOrNothing } from '../../../functions/global'
import { signUp } from '../../../functions/auth';
import { ToastContainer } from 'react-toastify';

export default function SignUp() {
    const [user, setUser] = useState({ name: '', email: '', password: '', confirmPassword: '' })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    function callSignUp(e) {
        return signUp(e, user, setErrors, setLoading, navigate)
    }

    return (
        <SignUpWrapper>
            <h1>MyWallet</h1>
            <form onSubmit={callSignUp}>
                <Input type="text" text="Nome" name="name" 
                    onChange={(e) => changeObject(e, user, setUser)} disabled={loading} />
                {errorOrNothing('name', errors)}
                <Input type="email" text="E-mail" name="email" 
                    onChange={(e) => changeObject(e, user, setUser)} disabled={loading} />
                {errorOrNothing('email', errors)}
                <Input type="password" text="Senha" name="password" 
                    onChange={(e) => changeObject(e, user, setUser)} disabled={loading} />
                {errorOrNothing('password', errors)}
                <Input type="password" text="Confirme a senha" name="confirmPassword" 
                    onChange={(e) => changeObject(e, user, setUser)} disabled={loading} /> 
                {errorOrNothing('confirmPassword', errors)}
                <Button disabled={loading} text={loading ? 
                    <Bars heigth="50" width="50" color="#e5e5e5" ariaLabel="loading-indicator" /> : 'Cadastrar'} />
            </form>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <p>Já tem uma conta? Entre agora!</p>
            </Link>
            <ToastContainer />
        </SignUpWrapper>
    )
}