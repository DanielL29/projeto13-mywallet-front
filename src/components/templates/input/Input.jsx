import { InputWrapper } from "./InputStyle"

export default function Input({ type, text, onChange, name, loading }) {
    return (
        <InputWrapper 
            type={type} 
            placeholder={text} 
            name={name} 
            onChange={(e) => onChange(e)} 
            disabled={loading}
            required
        />
    )
}