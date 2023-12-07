import { IconLock, IconUserCircle } from "@tabler/icons-react"
import "../style/Login.css"
import { useState } from "react"

export default function Login(){

    const [isLogin, setIsLogin] = useState<boolean | null>(null)

    const onLogin = async() => {
        const apiEndpoint = import.meta.env.VITE_API_ENDPOINT


    }

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
            {isLogin == false && <p>Username/Password salah</p>}
        </div>
    )
}