import { IconLock, IconUserCircle } from "@tabler/icons-react"
import "../style/Login.css"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function Login(){

    document.title = "StockWise | Login"

    const [isLogin, setIsLogin] = useState<boolean | null>(null)

    // const onLogin = async() => {
    //     const apiEndpoint = import.meta.env.VITE_API_ENDPOINT

    // }

    return (
        <div className="login">
            <form action="">
                <h2>Login Stockwise</h2>
                <div className="username">
                    <IconUserCircle stroke={1.5} />
                    <input type="text" placeholder="Username" required />
                </div>
                <div className="password">
                    <IconLock stroke={1.5} />
                    <input type="password" placeholder="Password" required />
                </div>
                <button type="submit">Login</button>
            </form>
            {isLogin === false && <p className="login-fail">Incorrect username/password</p>}
            <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
        </div>
    )
}