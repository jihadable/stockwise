import { IconLock, IconUserCircle } from "@tabler/icons-react"
import axios from "axios"
import { FormEvent, useContext, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AuthContext } from "../contexts/AuthContext"
import "../style/Login.css"

export default function Login(){

    document.title = "StockWise | Login"

    const navigate = useNavigate()
    const { setToken, setIsLogin } = useContext(AuthContext)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const emailElement = useRef<HTMLInputElement | null>(null)
    const passwordElement = useRef<HTMLInputElement | null>(null)

    const handleLogin = async(e: FormEvent) => {
        e.preventDefault()

        try {
            setIsLoading(true)

            const email = emailElement.current?.value
            const password = passwordElement.current?.value
    
            const usersAPIEndpoint = import.meta.env.VITE_USERS_API_ENDPOINT
    
            const { data } = await axios.post(`${usersAPIEndpoint}/login`, {
                email, password
            })

            localStorage.setItem("token", data.token)
            setToken(localStorage.getItem("token"))
            setIsLogin(true)

            navigate("/dashboard")

            setIsLoading(false)
        } catch(error){
            localStorage.removeItem("token")
            toast.error("Gagal login")
            setIsLoading(false)
        }
    }

    return (
        <div className="login">
            <form method="post" onSubmit={handleLogin}>
                <h2>Login Stockwise</h2>
                <div className="username-email">
                    <IconUserCircle stroke={1.5} />
                    <input type="text" placeholder="Email" required ref={emailElement} />
                </div>
                <div className="password">
                    <IconLock stroke={1.5} />
                    <input type="password" placeholder="Password" required ref={passwordElement} />
                </div>
                {
                    isLoading ?
                    <button>
                        <div className="custom-loader"></div>
                    </button> :
                    <button type="submit">Login</button>
                }
            </form>
            <p>Belum punya akun? <Link to={"/register"}>Register</Link></p>
        </div>
    )
}