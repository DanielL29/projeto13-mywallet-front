import Button from "../../templates/button/Button";
import Input from "../../templates/input/Input";
import { SignUpWrapper } from "../sign-up/SignUpStyle";
import { Link } from 'react-router-dom';

export default function SignIn() {
    return (
        <SignUpWrapper>
            <h1>MyWallet</h1>
            <form>
                <Input type="email" text="E-mail" />
                <Input type="password" text="Senha" />
                <Button text="Entrar" />
            </form>
            <Link to="/sign-up">
                <p>Primeira vez? Cadastre-se!</p>
            </Link>
        </SignUpWrapper>
    )
}