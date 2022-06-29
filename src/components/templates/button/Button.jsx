import { ButtonWrapper } from "./ButtonStyle";

export default function Button({ text, disabled }) {
    return (
        <ButtonWrapper type="submit" disabled={disabled}>
            {text}
        </ButtonWrapper>
    )
}