import { login, register, getme, Logout } from "../services/auth.api";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";

export let useAuth = () => {

    let context = useContext(AuthContext)
    let { user, setuser, loading, setloading } = context

    let handellogin = async ({ username, email, password }) => {
        setloading(true)
        let data = await login({ username, email, password })
        setuser(data.user)
        setloading(false)

    }

    let handelregister = async ({ username, email, password }) => {
        setloading(true)
        let data = await register({ username, email, password })
        setuser(data.user)
        setloading(false)
    }

    let handelgetme = async () => {
        setloading(true)
        let data = await getme()
        setuser(data.user)
        setloading(false)
    }

    let handellogout = async () => {
        setloading(true)
        await Logout()
        setuser(null)
        setloading(false)
    }

    useEffect(() => {
        handelgetme()
    }, [])


    return ({
        user, loading, handellogin, handelregister, handelgetme, handellogout
    })

}