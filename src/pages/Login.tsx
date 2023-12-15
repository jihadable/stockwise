import { IconLock, IconUserCircle } from "@tabler/icons-react"
import "../style/Login.css"
import { FormEvent, useContext, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"

export default function Login(){

    document.title = "StockWise | Login"

    const navigate = useNavigate()

    const { isLogin, setIsLogin } = useContext(AuthContext)

    useEffect(() => {
        if (isLogin) navigate("/dashboard")
    }, [isLogin, navigate])

    const usernameOrEmailElement = useRef<HTMLInputElement | null>(null)
    const passwordElement = useRef<HTMLInputElement | null>(null)

    const onLogin = async(e: FormEvent) => {
        e.preventDefault()

        const [
            usernameOrEmail, 
            password
        ] = [
            usernameOrEmailElement.current?.value, 
            passwordElement.current?.value
        ]

        const apiEndpoint = import.meta.env.VITE_API_ENDPOINT

        const response = await fetch(`${apiEndpoint}/login`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                login: usernameOrEmail,
                password: password
            })
        })

        const data = await response.json()

        if (data.status){
            setIsLogin(true)
            localStorage.setItem("token", data.token)

            navigate("/dashboard")
        }
        else {
            setIsLogin(false)
        }
    }

    return (
        <div className="login">
            <form method="post" onSubmit={(e) => onLogin(e)}>
                <h2>Login Stockwise</h2>
                <div className="username-email">
                    <IconUserCircle stroke={1.5} />
                    <input type="text" placeholder="Username or Email" required ref={usernameOrEmailElement} />
                </div>
                <div className="password">
                    <IconLock stroke={1.5} />
                    <input type="password" placeholder="Password" required ref={passwordElement} />
                </div>
                <button type="submit">Login</button>
            </form>
            {isLogin === false && <p className="login-fail">Invalid username or password</p>}
            <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
        </div>
    )
}