import axios from "axios";
import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { AuthContext, UserType } from "../contexts/AuthContext";
import "../style/Account.css";
import NotFound from "./NotFound";
import Loader from "../components/Loader";
import { LoaderContext } from "../contexts/LoaderContext";

export default function Account(){

    const { isLogin, user } = useContext(AuthContext)

    const [edit, setEdit] = useState<boolean>(false)

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
                    <article className={`user-info ${edit ? "edit-active" : ""}`}>
                        <div className="img">
                            <img src={`${import.meta.env.VITE_AVATAR_GENERATOR}&name=${user?.username}`} alt="User image" />
                        </div>
                        {!edit &&
                        <article className="side">
                            <div className="info">
                                <div className="item">
                                    <div className="label">Username</div>
                                    <p className="value">{user?.username}</p>
                                </div>
                                <div className="item">
                                    <div className="label">Email</div>
                                    <p className="value">{user?.email}</p>
                                </div>
                                <div className="item">
                                    <div className="label">Bio</div>
                                    <p className="value">{user?.bio ?? "-"}</p>
                                </div>
                            </div>
                            <div className="edit-btn" onClick={() => setEdit(true)}>Update profile</div>
                        </article>
                        }
                        {edit &&
                        <EditUser setEdit={setEdit} user={user} />}
                    </article>
                </article>
            </section>
        )
    }

    return null
}

type EditUserPropsType = {
    setEdit: React.Dispatch<React.SetStateAction<boolean>>,
    user: UserType | null
}

function EditUser({ setEdit, user }: EditUserPropsType){

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
            const token = localStorage.getItem("token")

            await axios.put(`${APIEndpoint}/api/users`, requestBody, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })

            if (user){
                setUser({...user, username, bio})
            }
            toast.success("Successfully updated user data")
            setEdit(false)
            setIsLoading(false)
        } catch(error){
            setIsLoading(false)
            toast.error("Failed to update user data")
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
                <button type="button" className="cancel" onClick={() => setEdit(false)}>Cancel</button>
                {isLoading ?
                <Loader /> :
                <button type="button" className="save" onClick={handelSave}>Save changes</button>}
            </article>
        </section>
    )
}