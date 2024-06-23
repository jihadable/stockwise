import { IconLock, IconMail, IconUserCircle } from "@tabler/icons-react";
import axios from "axios";
import { FormEvent, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import "../style/Register.css";

export default function Register(){
    
    document.title = "StockWise | Register"
    
    const navigate = useNavigate()

    const { setToken } = useContext(AuthContext)

    const emailElement = useRef<HTMLInputElement | null>(null)
    const usernameElement = useRef<HTMLInputElement | null>(null)
    const passwordElement = useRef<HTMLInputElement | null>(null)
    const confirmPasswordElement = useRef<HTMLInputElement | null>(null)

    const handleRegister = async(e: FormEvent) => {
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
            toast.warn("Konfirmasi password tidak cocok")

            return
        }

        try {
            const usersAPIEndpoint = import.meta.env.VITE_USERS_API_ENDPOINT
    
            const { data } = await axios.post(
                `${usersAPIEndpoint}/register`,
                {
                    email, username, password
                }
            )

            localStorage.setItem("token", data.token)
            setToken(localStorage.getItem("token"))

            navigate("/dashboard")
        } catch(error){
            console.log(error)
            toast.error("Gagal melakukan registrasi")
        }

    }

    return (
        <div className="register">
            <form method="post" onSubmit={handleRegister}>
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
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to={"/login"}>Login</Link></p>
        </div>
    )
}