import { ButtonWrapper } from "./ButtonStyle";

export default function Button({ text, onClick, loading }) {
    return (
        <ButtonWrapper type="submit" onClick={() => onClick} disabled={loading}>
            {text}
        </ButtonWrapper>
    )
}