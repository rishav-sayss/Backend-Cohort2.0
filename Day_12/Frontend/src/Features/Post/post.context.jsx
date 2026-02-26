import {createContext, useState } from "react";

export let postcontext = createContext()

export let PostContextProvider = ({children}) => {

    let [post, setpost] = useState(null)
    let [feed, setfeed] = useState([])
    let [loading, setloading] = useState(false)

    return <postcontext.Provider value={{ post, setpost, feed, setfeed, loading, setloading }} >
            {
                children
            }
    </postcontext.Provider>

}