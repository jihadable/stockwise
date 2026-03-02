import { IconLock } from "@tabler/icons-react"
import axios from "axios"
import { FormEvent, useContext, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import Loader from "../components/Loader"
import { LoaderContext } from "../contexts/LoaderContext"
import "../style/ResetPassword.css"
import NotFound from "./NotFound"

export default function ResetPassword(){
    const { token } = useParams<string>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { setLoadingElementWidth, setLoadingElementHeight } = useContext(LoaderContext)
    const [newPassword, setNewPassword] = useState<string>("")
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState<string>("")

    const handleResetPassword = async(event: FormEvent) => {
        try {
            event.preventDefault()

            if (newPassword != newPasswordConfirmation){
                toast.warn("New password confirmation does not match")

                return
            }

            const target = event.currentTarget as HTMLFormElement
            setIsLoading(true)
            setLoadingElementWidth(target.querySelector('button[type="submit"]')?.clientWidth)
            setLoadingElementHeight(target.querySelector('button[type="submit"]')?.clientHeight)

            const requestBody = {
                token,
                new_password: newPassword
            }

            const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
            await axios.post(`${APIEndpoint}/api/password-resets/reset-password`, requestBody)

            setNewPassword("")
            setNewPasswordConfirmation("")

            toast.success("Password reset successfully")
            setIsLoading(false)
        } catch(error){
            toast.error("Fail to reset password")
            setIsLoading(false)
            console.log(error)
        }
    }

    if (!token){
        return <NotFound />
    }

    document.title = "StockWise | Reset Password"
    
    return (
        <section className="reset-password" onSubmit={handleResetPassword}>
            <form>
                <h2>Reset Password</h2>
                <div className="new-password">
                    <IconLock stroke={1.5} />
                    <input type="password" placeholder="New password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="confirm-new-password">
                    <IconLock stroke={1.5} />
                    <input type="password" placeholder="Confirm new password" required value={newPasswordConfirmation} onChange={(e) => setNewPasswordConfirmation(e.target.value)} />
                </div>
                {isLoading ?
                <Loader /> :
                <button type="submit">Submit</button>}
            </form>
            <Link to={"/login"}>Login</Link>
        </section>
    )
}