import axios from "axios";
import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { AuthContext, UserType } from "../contexts/AuthContext";
import { LoaderContext } from "../contexts/LoaderContext";
import "../style/Account.css";
import NotFound from "./NotFound";

export default function Account(){

    const { isLogin, user } = useContext(AuthContext)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { setLoadingElementWidth, setLoadingElementHeight } = useContext(LoaderContext)
    const [isShowUpdateProfileForm, setIsShowUpdateProfileForm] = useState<boolean>(false)
    const [isShowUpdatePasswordForm, setIsShowUpdatePasswordForm] = useState<boolean>(false)

    const handleSendEmailVerification = async(event: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const target = event.target as HTMLButtonElement
            setLoadingElementWidth(target.clientWidth)
            setLoadingElementHeight(target.clientHeight)
            setIsLoading(true)

            const jwt = localStorage.getItem("jwt")
            const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
            await axios.post(`${APIEndpoint}/api/email-verifications/send-email-verification`, null, {
                headers: {
                    "Authorization": "Bearer " + jwt
                }
            })

            setIsLoading(false)
            toast.success("Email verification sent!")
        } catch(error){
            console.log(error)
            toast.error("Fail to send email verification")
            setIsLoading(false)
        }
    }

    if (isLogin === false){
        return <NotFound />
    }

    if (isLogin === true){
        document.title = "StockWise | Account"
    
        return (
            <section className="account">
                <Navbar page="Account" />
                <article className="content">
                    <Header />
                    <article className={`user-info ${isShowUpdateProfileForm ? "edit-active" : ""}`}>
                        <div className="img">
                            <img src={`${import.meta.env.VITE_AVATAR_GENERATOR}&name=${user?.username}`} alt="User image" />
                        </div>
                        {!isShowUpdateProfileForm && !isShowUpdatePasswordForm &&
                        <article className="side">
                            <div className="info">
                                <div className="item">
                                    <div className="label">Username</div>
                                    <p className="value">{user?.username}</p>
                                </div>
                                <div className="item">
                                    {user?.is_email_verified ? 
                                    <div className="label">Email</div> :
                                    <div className="label" style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
                                        <span>Email</span>
                                        {isLoading ? 
                                        <Loader /> :
                                        <button type="button" className="verify-email-btn" onClick={handleSendEmailVerification}>Send email verification</button>}
                                    </div>}
                                    <p className="value">{user?.email}</p>
                                </div>
                                <button className="change-password-btn" onClick={() => setIsShowUpdatePasswordForm(true)}>Change password</button>
                                <div className="item">
                                    <div className="label">Bio</div>
                                    <p className="value">{user?.bio ?? "-"}</p>
                                </div>
                            </div>
                            <div className="edit-btn" onClick={() => setIsShowUpdateProfileForm(true)}>Update profile</div>
                        </article>}
                        {isShowUpdateProfileForm &&
                        <UpdateProfileForm setIsShowUpdateProfileForm={setIsShowUpdateProfileForm} user={user} />}
                        {isShowUpdatePasswordForm &&
                        <UpdatePasswordFrom setIsShowUpdatePasswordForm={setIsShowUpdatePasswordForm} user={user} />}
                    </article>
                </article>
            </section>
        )
    }

    return null
}

type UpdateProfileFormPropsType = {
    setIsShowUpdateProfileForm: React.Dispatch<React.SetStateAction<boolean>>,
    user: UserType | null
}

function UpdateProfileForm({ setIsShowUpdateProfileForm, user }: UpdateProfileFormPropsType){

    const { setUser } = useContext(AuthContext)

    const usernameElement = useRef<HTMLInputElement | null>(null)
    const bioElement = useRef<HTMLTextAreaElement | null>(null)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { setLoadingElementWidth, setLoadingElementHeight } = useContext(LoaderContext)

    const handelSave = async(event: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const username = usernameElement.current?.value as string

            if (username === ""){
                toast.warn("Please fill out all the columns")

                return
            }
            
            const target = event.target as HTMLButtonElement
            setIsLoading(true)
            setLoadingElementWidth(target.clientWidth)
            setLoadingElementHeight(target.clientHeight)

            const bio = bioElement.current?.value as string

            const requestBody = {
                username,
                bio: bio === "" ? null : bio
            }
            const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
            const jwt = localStorage.getItem("jwt")

            await axios.put(`${APIEndpoint}/api/users`, requestBody, {
                headers: {
                    "Authorization": "Bearer " + jwt
                }
            })

            if (user){
                setUser({...user, username, bio})
            }

            toast.success("Successfully updated user data")
            setIsShowUpdateProfileForm(false)
            setIsLoading(false)
        } catch(error){
            setIsShowUpdateProfileForm(false)
            setIsLoading(false)
            toast.error("Fail to update user data")
        }
    }

    return (
        <section className="edit">
            <article className="info">
                <div className="item">
                    <div className="label">Username</div>
                    <input type="text" className="value" placeholder="Username" required defaultValue={user?.username} ref={usernameElement} />
                </div>
                <div className="item">
                    <div className="label">Email</div>
                    <p className="value">{user?.email}</p>
                </div>
                <div className="item">
                    <div className="label">Bio</div>
                    <textarea rows={7} className="value" spellCheck="false" placeholder="Bio" defaultValue={user?.bio ?? ""} ref={bioElement}></textarea>
                </div>
            </article>
            <article className="btns">
                <button type="button" className="cancel" onClick={() => setIsShowUpdateProfileForm(false)}>Cancel</button>
                {isLoading ?
                <Loader /> :
                <button type="button" className="save" onClick={handelSave}>Save changes</button>}
            </article>
        </section>
    )
}

type UpdatePasswordFormPropsType = {
    setIsShowUpdatePasswordForm: React.Dispatch<React.SetStateAction<boolean>>,
    user: UserType | null
}

function UpdatePasswordFrom({ setIsShowUpdatePasswordForm, user }: UpdatePasswordFormPropsType){
    const [
        oldPasswordElement,
        newPasswordElement,
        newPasswordConfirmationElement
    ] = [
        useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null)
    ]
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { setLoadingElementWidth, setLoadingElementHeight } = useContext(LoaderContext)

    const handleUpdatePassword = async(event: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const oldPassword = oldPasswordElement.current?.value
            const newPassword = newPasswordElement.current?.value
            const newPasswordConfirmation = newPasswordConfirmationElement.current?.value

            if (oldPassword == newPassword){
                toast.warn("New password can not be same as old password")

                return
            }

            if (newPassword != newPasswordConfirmation){
                toast.warn("New password confirmation does not match")

                return
            }

            const target = event.target as HTMLButtonElement
            setIsLoading(true)
            setLoadingElementWidth(target.clientWidth)
            setLoadingElementHeight(target.clientHeight)

            const requestBody = {
                old_password: oldPasswordElement.current?.value,
                new_password: newPasswordElement.current?.value
            }

            const jwt = localStorage.getItem("jwt")
            const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
            await axios.post(`${APIEndpoint}/api/users/change-password`, requestBody, {
                headers: {
                    "Authorization": "Bearer " + jwt
                }
            })

            toast.success("Password changed successfully")
            setIsLoading(false)
            setIsShowUpdatePasswordForm(false)
        } catch(error){
            toast.error("Fail to change password")
            setIsLoading(false)
            setIsShowUpdatePasswordForm(false)
            console.log(error)
        }
    }
    
    return (
        <section className="change-password">
            <article className="info">
                <div className="item">
                    <div className="label">Username</div>
                    <p className="value">{user?.username}</p>
                </div>
                <div className="item">
                    <div className="label">Email</div>
                    <p className="value">{user?.email}</p>
                </div>
                <div className="item">
                    <div className="label">Old password</div>
                    <input type="password" className="value" required ref={oldPasswordElement} />
                </div>
                <div className="item">
                    <div className="label">New password</div>
                    <input type="password" className="value" required ref={newPasswordElement} />
                </div>
                <div className="item">
                    <div className="label">New password (again)</div>
                    <input type="password" className="value" required ref={newPasswordConfirmationElement} />
                </div>
                <div className="item">
                    <div className="label">Bio</div>
                    <p className="value">{user?.bio ?? "-"}</p>
                </div>
            </article>
            <article className="btns">
                <button type="button" className="cancel" onClick={() => setIsShowUpdatePasswordForm(false)}>Cancel</button>
                {isLoading ?
                <Loader /> :
                <button type="button" className="save" onClick={handleUpdatePassword}>Change password</button>}
            </article>
        </section>
    )
}