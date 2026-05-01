import { setuser, setloading, seterror } from "../state/auth.slice"
import { register, login, getme } from "../services/auth.api"
import { useDispatch } from "react-redux"

export const useAuth = () => {
    let dispatch = useDispatch()

    let handelRegister = async ({ email, contact, password, fullname, isSeller = false }) => {
        let data = await register({ email, contact, password, fullname, isSeller })
        dispatch(setuser(response.user))

        return  data.user
    }

    async function handleLogin({ email, password }) {

        const data = await login({ email, password })
        console.log(data.user)
        dispatch(setuser(data.user))

        return  data.user
    }

    async function handelgetme() {
        try {
            dispatch(setloading(true))

            const data = await getme()
            
            dispatch(setuser(data.user))
        } catch (err) {
            // console.log(err)
        } finally {
            dispatch(setloading(false))
        }
    }

    return { handelRegister, handleLogin, handelgetme }

}

