import { IconLock, IconMail, IconUserCircle } from "@tabler/icons-react";
import axios from "axios";
import { FormEvent, useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { AuthContext } from "../contexts/AuthContext";
import { LoaderContext } from "../contexts/LoaderContext";
import "../style/Register.css";

export default function Register(){
    
    document.title = "StockWise | Register"
    
    const navigate = useNavigate()

    const { setIsLogin, setUser } = useContext(AuthContext)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { setLoadingElementWidth, setLoadingElementHeight } = useContext(LoaderContext)
    const emailElement = useRef<HTMLInputElement | null>(null)
    const usernameElement = useRef<HTMLInputElement | null>(null)
    const passwordElement = useRef<HTMLInputElement | null>(null)
    const confirmPasswordElement = useRef<HTMLInputElement | null>(null)

    const handleRegister = async(event: FormEvent) => {
        event.preventDefault()

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
            toast.warn("Password confirmation doesn't match")

            return
        }

        try {
            const target = event.target as HTMLFormElement
            setIsLoading(true)
            setLoadingElementWidth(target.querySelector('button[type="submit"]')?.clientWidth)
            setLoadingElementHeight(target.querySelector('button[type="submit"]')?.clientHeight)

            const requestBody = { email, username, password }
            const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
            const { data } = await axios.post(`${APIEndpoint}/api/users/register`, requestBody)

            localStorage.setItem("jwt", data.data.jwt)
            setIsLogin(true)
            setUser(data.data.user)

            navigate("/dashboard")
            setIsLoading(false)
        } catch(error){
            localStorage.removeItem("jwt")
            toast.error("Fail to register")
            setIsLoading(false)
        }

    }

    return (
        <div className="register">
            <form onSubmit={handleRegister}>
                <h2>Register Stockwise</h2>
                <div className="email">
                    <IconMail stroke={1.5} />
                    <input type="email" placeholder="Email" required ref={emailElement} />
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
                {isLoading ?
                <Loader /> :
                <button type="submit">Register</button>}
            </form>
            <p>Already have an account? <Link to={"/login"}>Login</Link></p>
        </div>
    )
}