import { IconMail } from "@tabler/icons-react";
import axios from "axios";
import { FormEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { LoaderContext } from "../contexts/LoaderContext";
import "../style/ForgetPassword.css";

export default function ForgetPassword(){

    document.title = "StockWise | Forget Password"

    const [email, setEmail] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { setLoadingElementWidth, setLoadingElementHeight } = useContext(LoaderContext)
    
    const handleSendPasswordResetEmail = async(event: FormEvent) => {
        try {
            event.preventDefault()

            const target = event.currentTarget as HTMLFormElement
            setIsLoading(true)
            setLoadingElementWidth(target.querySelector('button[type="submit"]')?.clientWidth)
            setLoadingElementHeight(target.querySelector('button[type="submit"]')?.clientHeight)

            const requestBody = { email }

            const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
            await axios.post(`${APIEndpoint}/api/password-resets/send-password-reset-email`, requestBody)

            toast.success("Password reset email sent")
            setEmail("")
            setIsLoading(false)
        } catch(error){
            toast.error("Fail to send password reset email")
            setIsLoading(false)
            console.log(error)
        }
    }
    
    return (
        <section className="forget-password" onSubmit={handleSendPasswordResetEmail}>
            <form>
                <h2>Password Reset</h2>
                <p>Forgotten your password? Enter your email address below, and we'll send you an email allowing you to reset it.</p>
                <div className="email">
                    <IconMail stroke={1.5} />
                    <input type="text" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                {isLoading ?
                <Loader /> :
                <button type="submit">Submit</button>}
            </form>
            <Link to={"/login"}>Login</Link>
        </section>
    )
}