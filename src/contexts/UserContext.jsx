import { createContext, useState } from "react";

const UserContext = createContext()

export function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({})
    const userAuth = JSON.parse(localStorage.getItem("currentUser"))

    if(currentUser.token !== undefined) {
        localStorage.setItem("currentUser", JSON.stringify(currentUser))
    } else if (localStorage.getItem("user") !== null) {
        if(!userAuth.name && !userAuth.email && !userAuth.token) {
            localStorage.clear()
        } else {
            setCurrentUser(userAuth)
        }
    } 

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext