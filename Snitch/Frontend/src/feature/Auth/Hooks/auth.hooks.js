import { setuser, setloading, seterror } from "../state/auth.slice"
import { register ,login } from "../services/auth.api"
import { useDispatch } from "react-redux"

export const useAuth = () => {
    let dispatch = useDispatch()

    let handelRegister = async ({ email, contact, password, fullname, seller = false }) => {
        let response = await register({ email, contact, password, fullname, seller })
        console.log(response)
        dispatch(setuser(response.user))
    }

    async function handleLogin({ email, password }) {

        const data = await login({ email, password })
        dispatch(setuser(data.user))
    }

    return { handelRegister, handleLogin }

}

