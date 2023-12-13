import { IconLock, IconUserCircle } from "@tabler/icons-react"
import "../style/Login.css"
import { FormEvent, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"

type LoginPropsType = {
    isLogin: boolean | null,
    setIsLogin: React.Dispatch<React.SetStateAction<boolean | null>>
}

export default function Login({ isLogin, setIsLogin }: LoginPropsType){

    document.title = "StockWise | Login"

    const navigate = useNavigate()

    if (isLogin) navigate("/dashboard")

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

        if (data.status === "success"){
            setIsLogin(true)

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