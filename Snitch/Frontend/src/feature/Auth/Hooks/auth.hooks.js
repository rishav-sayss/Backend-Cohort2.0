import { setuser, setloading, seterror } from "../state/auth.slice"
import { register ,login } from "../services/auth.api"
import { useDispatch } from "react-redux"

export const useAuth = () => {
    let dispatch = useDispatch()

    let handelRegister = async ({ email, contact, password, fullname, isSeller = false }) => {
        let response = await register({ email, contact, password, fullname, isSeller })
        dispatch(setuser(response.user))
    }

    async function handleLogin({ email, password }) {

        const data = await login({ email, password })
        console.log(data)
        dispatch(setuser(data.user))
    }

    return { handelRegister, handleLogin }

}

