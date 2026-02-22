import { IconArrowLeft, IconCheck, IconX } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import "../style/VerifyEmail.css"
import NotFound from "./NotFound"

export default function VerifyEmail(){
    const { token } = useParams()
    const [status, setStatus] = useState<string>("loading")

    if (!token){
        return <NotFound />
    }

    useEffect(() => {
        const handleVerifyEmail = async() => {
            try {
                
            } catch(error){
                setStatus("error")
                console.log(error)
            }
        }

        handleVerifyEmail()
    }, [token])
    
    if (status == "loading"){
        return (
            <section className="verify-loading">
                <div className="custom-loader"></div>
            </section>
        )
    }
    if (status == "error"){
        return (
            <section className="verify-error">
                <div className="logo-title"></div>
                <div className="message"><IconX /> <p>Verification failed</p></div>
                <p className="text">This verification link is invalid or has expired.</p>
                <Link to={"/"} className="link">
                    <IconArrowLeft stroke={1.5} />
                    <span>Back to home</span>
                </Link>
            </section>
        )
    }
    if (status == "success"){
        return (
            <section className="verify-success">
                <div className="logo-title"></div>
                <div className="message"><IconCheck /> <p>Email verified</p></div>
                <p className="text">Your email address has been successfully verified.</p>
                <Link to={"/dashboard"} className="link">
                    <IconArrowLeft stroke={1.5} />
                    <span>Dashboard</span>
                </Link>
            </section>
        )
    }
}