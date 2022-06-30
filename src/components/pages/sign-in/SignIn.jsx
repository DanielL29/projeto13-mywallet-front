import Button from "../../templates/button/Button";
import Input from "../../templates/input/Input";
import { SignUpWrapper } from "../sign-up/SignUpStyle";
import { Link, useNavigate } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';
import { useContext, useState } from "react";
import UserContext from "../../../contexts/UserContext";
import { changeObject, errorOrNothing } from '../../../functions/global';
import { signIn } from "../../../functions/auth";
import { ToastContainer } from 'react-toastify';

export default function SignIn() {
    const [user, setUser] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    const { setCurrentUser } = useContext(UserContext)

    function callSignIn(e) {
        return signIn(
            e, user, setCurrentUser, 
            setErrors, setLoading, navigate
        )
    }

    return (
        <SignUpWrapper>
            <h1>MyWallet</h1>
            <form onSubmit={callSignIn}>
                <Input type="email" text="E-mail" name="email"
                    onChange={(e) => changeObject(e, user, setUser)} disabled={loading === true} />
                {errorOrNothing('email', errors)}
                <Input type="password" text="Senha" name="password"
                    onChange={(e) => changeObject(e, user, setUser)} disabled={loading === true} />
                {errorOrNothing('password', errors)}
                <Button disabled={loading === true} text={loading ?
                    <Bars heigth="50" width="50" color="#e5e5e5" ariaLabel="loading-indicator" /> : 'Entrar'} />
            </form>
            <Link to="/sign-up" style={{ textDecoration: 'none' }}>
                <p>Primeira vez? Cadastre-se!</p>
            </Link>
            <ToastContainer />
        </SignUpWrapper>
    )
}