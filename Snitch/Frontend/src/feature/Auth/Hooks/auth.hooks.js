import { setuser, setloading, seterror } from "../state/auth.slice"
import { register, login, getme } from "../services/auth.api"
import { useDispatch } from "react-redux"

const extractUser = (payload) => {
    return payload?.user ?? payload?.data?.user ?? payload?.result?.user ?? null
}

export const useAuth = () => {
    let dispatch = useDispatch()

    let handelRegister = async ({ email, contact, password, fullname, isSeller = false }) => {
        const data = await register({ email, contact, password, fullname, isSeller })
        const user = extractUser(data)
        dispatch(setuser(user))
        dispatch(setloading(false))
        return user
    }

    async function handleLogin({ email, password }) {

        const data = await login({ email, password })
        const user = extractUser(data)
        dispatch(setuser(user))
        dispatch(setloading(false))
        if (user) {
            sessionStorage.setItem("snitch_logged_in", "true")
        } else {
            sessionStorage.removeItem("snitch_logged_in")
        }

        return user
    }

    async function handelgetme() {
        try {
            dispatch(setloading(true))

            const data = await getme()
            const user = extractUser(data)
            dispatch(setuser(user))
            if (user) {
                sessionStorage.setItem("snitch_logged_in", "true")
            } else {
                sessionStorage.removeItem("snitch_logged_in")
            }
            return user
        } catch (err) {
            // console.log(err)
            dispatch(setuser(null))
            sessionStorage.removeItem("snitch_logged_in")
            return null
        } finally {
            dispatch(setloading(false))
        }
    }

    return { handelRegister, handleLogin, handelgetme }

}

