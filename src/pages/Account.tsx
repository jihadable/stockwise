import axios from "axios";
import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { AuthContext, UserType } from "../contexts/AuthContext";
import "../style/Account.css";
import NotFound from "./NotFound";

export default function Account(){

    const { isLogin, user } = useContext(AuthContext)

    const [edit, setEdit] = useState<boolean>(false)

    if (isLogin === false){
        return <NotFound />
    }

    if (isLogin === true){
        document.title = "StockWise | Account"
    
        return (
            <div className="account">
                <Navbar page="Account" />
                <div className="content">
                    <Header />
                    <div className={`user-info ${edit ? "edit-active" : ""}`}>
                        <div className="img">
                            <img src={`${import.meta.env.VITE_AVATAR_GENERATOR}&name=${user?.username}`} alt="User image" />
                        </div>
                        {!edit &&
                        <div className="side">
                            <div className="info">
                                <div className="item">
                                    <div className="label">Username</div>
                                    <div className="value">{user?.username}</div>
                                </div>
                                <div className="item">
                                    <div className="label">Email</div>
                                    <div className="value">{user?.email}</div>
                                </div>
                                <div className="item">
                                    <div className="label">Bio</div>
                                    <div className="value">{user?.bio ?? "-"}</div>
                                </div>
                            </div>
                            <div className="edit-btn" onClick={() => setEdit(true)}>Edit profile</div>
                        </div>
                        }
                        {
                            edit &&
                            <EditUser setEdit={setEdit} user={user} />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

type EditUserPropsType = {
    setEdit: React.Dispatch<React.SetStateAction<boolean>>,
    user: UserType | null
}

function EditUser({ setEdit, user }: EditUserPropsType){

    const usernameElement = useRef<HTMLInputElement | null>(null)
    const bioElement = useRef<HTMLTextAreaElement | null>(null)

    const { token, auth } = useContext(AuthContext)

    const handelSave = async() => {
        const username = usernameElement.current?.value

        if (username === ""){
            toast.warn("Masih ada kolom yang belum diisi!")

            return
        }
        
        try {
            const bio = bioElement.current?.value

            const usersAPIEndpoint = import.meta.env.VITE_USERS_API_ENDPOINT

            const { data } = await axios.post(
                usersAPIEndpoint,
                { username, bio: bio === "" ? null : bio },
                {
                    params: {
                        "_method": "patch"
                    },
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            )

            console.log(data)
            await auth()
            toast.success("Berhasil memperbarui data pengguna")
            setEdit(false)
        } catch(error){
            console.log(error)
            toast.error("Gagal memperbarui data pengguna")
        }
    }

    return (
        <div className="edit">
            <div className="info">
                <div className="item">
                    <div className="label">Username</div>
                    <input type="text" className="value" placeholder="Username" required defaultValue={user?.username} ref={usernameElement} />
                </div>
                <div className="item">
                    <div className="label">Email</div>
                    <div className="value">{user?.email}</div>
                </div>
                <div className="item">
                    <div className="label">Bio</div>
                    <textarea rows={7} className="value" spellCheck="false" placeholder="Bio" defaultValue={user?.bio ?? ""} ref={bioElement}></textarea>
                </div>
            </div>
            <div className="btns">
                <div className="cancel" onClick={() => setEdit(false)}>Cancel</div>
                <div className="save" onClick={handelSave}>Save changes</div>
            </div>
        </div>
    )
}