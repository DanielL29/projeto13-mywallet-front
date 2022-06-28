import { Routes, Route } from 'react-router-dom'
import SignIn from './pages/sign-in/SignIn'
import SignUp from './pages/sign-up/SignUp'

export default function Router() {
    return (
        <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/home' />
            <Route path='/new-record' />
        </Routes>
    )
}