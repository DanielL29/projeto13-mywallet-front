import { toast } from 'react-toastify';

function findError(key, errors) {
    const errorFounded = errors.find(erro => erro.context.key === key)

    return (
        <h2>{errorFounded !== undefined ? errorFounded.message : ''}</h2>
    )
}

function changeObject(e, object, setObject) {
    setObject({ ...object, [e.target.name]: e.target.value })
} 

function errorOrNothing(name, errors) {
    return errors.length > 0 ? findError(name, errors) : ''
}

function errorToast(message) {
    toast.error(message, {
        autoClose: 1500,
        hideProgressBar: true,
        pauseOnHover: true,
        position: 'top-center',
        theme: 'colored'
     })
}

function successToast(message) {
    toast.success(message, {
        autoClose: 1000,
        pauseOnHover: false,
        theme: 'colored'
    })
}

export { changeObject, errorOrNothing, errorToast, successToast }