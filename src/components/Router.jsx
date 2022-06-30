import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import UserContext from '../contexts/UserContext'
import Home from './pages/home/Home'
import NewRecord from './pages/new-record/NewRecord'
import SignIn from './pages/sign-in/SignIn'
import SignUp from './pages/sign-up/SignUp'

export default function Router() {
    const { currentUser } = useContext(UserContext)
    const userLogged = currentUser.token !== undefined

    return (
        <Routes>
            <Route path='/' element={userLogged ? <Navigate to="/home" replace /> : <SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path={userLogged ? '/home' : '*'} element={userLogged ? <Home /> : <Navigate to="/" replace />} />
            <Route path={userLogged ? '/new-record' : '*'} element={userLogged ? <NewRecord /> : <Navigate to="/" replace />} />
            <Route path={userLogged ? '/new-record/:id' : '*'} element={userLogged ? <NewRecord /> : <Navigate to="/" replace />} />
        </Routes>
    )
}