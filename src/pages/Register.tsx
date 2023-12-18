import "../style/Register.css"
import { IconLock, IconMail, IconUserCircle } from "@tabler/icons-react";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";

export default function Register(){
    
    document.title = "StockWise | Register"
    
    const navigate = useNavigate()

    const { isAuth, setIsAuth, setToken } = useContext(AuthContext)

    const [isRegister, setIsRegister] = useState<boolean | null>(null)
    
    useEffect(() => {
        if (isAuth) navigate("/dashboard")
    }, [isAuth, navigate])

    const emailElement = useRef<HTMLInputElement | null>(null)
    const usernameElement = useRef<HTMLInputElement | null>(null)
    const passwordElement = useRef<HTMLInputElement | null>(null)
    const confirmPasswordElement = useRef<HTMLInputElement | null>(null)

    const onRegister = async(e: FormEvent) => {
        e.preventDefault()

        const [
            email, 
            username, 
            password, 
            confirmPassword
        ] = [
            emailElement.current?.value, 
            usernameElement.current?.value, 
            passwordElement.current?.value, 
            confirmPasswordElement.current?.value
        ]

        if (password !== confirmPassword){
            toast.warn("The password confirmation does not match.")

            return
        }

        const apiEndpoint = import.meta.env.VITE_API_ENDPOINT

        const response = await fetch(`${apiEndpoint}/register`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })

        const data = await response.json()

        if (data.status){
            setIsAuth(true)
            setToken(data.token)

            navigate("/dashboard")
        }
        else {
            setIsRegister(false)
            setIsAuth(false)
        }
    }

    return (
        <div className="register">
            <ToastContainer
            position="top-center"
            autoClose={750}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="colored"
            />
            <form method="post" onSubmit={(e) => onRegister(e)}>
                <h2>Register Stockwise</h2>
                <div className="email">
                    <IconMail stroke={1.5} />
                    <input type="text" placeholder="Email" required ref={emailElement} />
                </div>
                <div className="username">
                    <IconUserCircle stroke={1.5} />
                    <input type="text" placeholder="Username" required ref={usernameElement} />
                </div>
                <div className="password">
                    <IconLock stroke={1.5} />
                    <input type="password" placeholder="Password" required ref={passwordElement} />
                </div>
                <div className="confirm-password">
                    <IconLock stroke={1.5} />
                    <input type="password" placeholder="Confirm password" required ref={confirmPasswordElement} />
                </div>
                <button type="submit">Register</button>
            </form>
            {isRegister === false && <p className="login-fail">Username or email is already in use</p>}
            <p>Already have an account? <Link to={"/login"}>Login</Link></p>
        </div>
    )
}