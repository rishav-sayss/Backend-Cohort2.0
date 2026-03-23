import { useDispatch } from "react-redux"
import { register, login, getMe } from "../services/auth.api"
import { setLoading, setuser, setError } from "../auth.slice"



export function useauth() {

    const dispatch = useDispatch()

    async function handelregister({ email, username, password }) {
        try {
            dispatch(setLoading(true))
            let data = await register({ email, username, password })
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Registration failed"))
        }
        finally {
            dispatch(setLoading(false))
        }
    }

    async function handleLogin({ email, password }) {
        try {
            dispatch(setLoading(true))
           
            const data = await login({ email, password })
            dispatch(setuser(data.user))
        } catch (err) {
            dispatch(setError(err.response?.data?.message || "Login failed"))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setuser(data.user))
        } catch (err) {
            dispatch(setError(err.response?.data?.message || "Failed to fetch user data"))
        } finally {
            dispatch(setLoading(false))
        }
    }

    return {
        handelregister,
        handleLogin,
        handleGetMe
    }
}