import { IconLock, IconUserCircle } from "@tabler/icons-react"
import axios from "axios"
import { FormEvent, useContext, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AuthContext } from "../contexts/AuthContext"
import "../style/Login.css"
import Loader from "../components/Loader"
import { LoaderContext } from "../contexts/LoaderContext"

export default function Login(){

    document.title = "StockWise | Login"

    const navigate = useNavigate()
    const { setIsLogin, setUser } = useContext(AuthContext)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { setLoadingElementWidth, setLoadingElementHeight } = useContext(LoaderContext)
    const emailElement = useRef<HTMLInputElement | null>(null)
    const passwordElement = useRef<HTMLInputElement | null>(null)

    const handleLogin = async(event: FormEvent) => {
        event.preventDefault()

        try {
            const target = event.currentTarget as HTMLFormElement
            setIsLoading(true)
            setLoadingElementWidth(target.querySelector('button[type="submit"]')?.clientWidth)
            setLoadingElementHeight(target.querySelector('button[type="submit"]')?.clientHeight)

            const requestBody = {
                email: emailElement.current?.value,
                password: passwordElement.current?.value
            }
            const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
            const { data } = await axios.post(`${APIEndpoint}/api/users/login`, requestBody)

            localStorage.setItem("token", data.data.token)
            setIsLogin(true)
            setUser(data.data.user)

            navigate("/dashboard")

            setIsLoading(false)
        } catch(error){
            localStorage.removeItem("token")
            toast.error("Failed to login")
            setIsLoading(false)
        }
    }

    return (
        <div className="login">
            <form onSubmit={handleLogin}>
                <h2>Login to Stockwise</h2>
                <div className="username-email">
                    <IconUserCircle stroke={1.5} />
                    <input type="text" placeholder="Email" required ref={emailElement} />
                </div>
                <div className="password">
                    <IconLock stroke={1.5} />
                    <input type="password" placeholder="Password" required ref={passwordElement} />
                </div>
                {isLoading ?
                <Loader /> :
                <button type="submit">Login</button>}
            </form>
            <p>Do not have account yet? <Link to={"/register"}>Register</Link></p>
        </div>
    )
}