import { InputWrapper } from "./InputStyle"

export default function Input({ type, text, onChange, name, disabled, step }) {
    return (
        <InputWrapper 
            type={type} 
            placeholder={text} 
            name={name} 
            onChange={(e) => onChange(e)} 
            disabled={disabled}
            step={step}
            required
        />
    )
}