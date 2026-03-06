
import { createContext, useState } from "react";

export let AuthContext = createContext()


export let AuthContextProvider = ({ children }) => {

    let [user, setuser] = useState(null)
    let [loading, setloading] = useState(true)

    return (
        <AuthContext.Provider value={{ user, setuser, loading, setloading }}>
            {
                children
            }
        </AuthContext.Provider>
    )
}