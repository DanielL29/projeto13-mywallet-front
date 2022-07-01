import { BASE_URL } from "../mock/data"
import axios from 'axios'
import { errorToast, successToast } from "./global"

async function signUp(e, user, setErrors, setLoading, navigate) {
    e.preventDefault()
    setErrors([])

    try {
        setLoading(true)

        await axios.post(`${BASE_URL}/auth/sign-up`, user)
        
        setLoading(false)
        successToast('Usuario cadastrado!')
        setTimeout(() => navigate('/'), 2000)
    } catch(err) {
        if(err.response.data.details) {
            setErrors(err.response.data.details)
            setLoading(false)
        } else if(err.response.data) {
            setLoading(false)
            errorToast(err.response.data)
        } else {
            errorToast(err.message)
            setLoading(false)
        }
    }
}

async function signIn(e, user, setCurrentUser, setErrors, setLoading, navigate) {
    e.preventDefault()
    setErrors([])

    try {
        setLoading(true)

        const userData = await axios.post(`${BASE_URL}/auth/sign-in`, user)
        localStorage.setItem('currentUser', JSON.stringify(userData.data))
        
        setLoading(false)
        successToast(`Bem vindo, ${userData.data.name}!`)
        setTimeout(() => {
            setCurrentUser(userData.data)
            navigate('/home')
        }, 2000)
    } catch(err) {
        if(err.response.data.details) {
            setErrors(err.response.data.details)
            setLoading(false)
        } else if(err.response.data) {
            errorToast(err.response.data)
            setLoading(false)
        } else {
            errorToast(err.message)
            setLoading(false)
        }
    }
}

export { signUp, signIn }