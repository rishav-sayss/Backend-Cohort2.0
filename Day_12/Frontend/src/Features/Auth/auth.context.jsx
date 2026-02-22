import { createContext, useState } from "react";

export let Authcontext = createContext()

export let Authprovider = ({ children }) => {
    /**
     * we have only TWO states
     */
    let [user, setuser] = useState(null)
    let [loading, setloading] = useState(false)

    return (
        <Authcontext.Provider value={{ user, setuser, loading, setloading }} >
            {
                children
            }
        </Authcontext.Provider>
    )
} 