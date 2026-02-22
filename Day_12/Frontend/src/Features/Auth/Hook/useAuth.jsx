import { useContext } from "react";
import { Authcontext } from "../auth.context";
import { login, register } from "../services/auth.api";

 export let useAuth = () => {
    // state ko leke aoo authContext se
    let context = useContext(Authcontext)
    let { user, setuser, loading, setloading } = context

    //APIs ko leke aoo or une handel kro function create krke
    let handellogin = async (username, password) => {
        setloading(true)

        let responce = await login(username, password)
        setuser(responce.user)

        setloading(false)
    }


    let handelregister = async (username, email, password) => {
        setloading(true)

        let responce = await register(username, email, password)
        setuser(responce.user)

        setloading(false)
    }

    return { loading, user, handellogin, handelregister }
}