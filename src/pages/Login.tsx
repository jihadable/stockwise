import { IconLock, IconUserCircle } from "@tabler/icons-react"
import axios from "axios"
import { FormEvent, useContext, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AuthContext } from "../contexts/AuthContext"
import "../style/Login.css"

export default function Login(){

    document.title = "StockWise | Login"

    const navigate = useNavigate()
    
    const { setToken } = useContext(AuthContext)

    const emailElement = useRef<HTMLInputElement | null>(null)
    const passwordElement = useRef<HTMLInputElement | null>(null)

    const handleLogin = async(e: FormEvent) => {
        e.preventDefault()

        try {
            const email = emailElement.current?.value
            const password = passwordElement.current?.value
    
            const usersAPIEndpoint = import.meta.env.VITE_USERS_API_ENDPOINT
    
            const { data } = await axios.post(`${usersAPIEndpoint}/login`, {
                email, password
            })
    
            console.log(data)

            localStorage.setItem("token", data.token)
            setToken(localStorage.getItem("token"))

            navigate("/dashboard")
        } catch(error){
            toast.error("Gagal login")
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
                    <input type="text" placeholder="Password" required ref={passwordElement} />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
        </div>
    )
}