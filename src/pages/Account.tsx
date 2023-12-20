import Navbar from "../components/Navbar";
import Header from "../components/Header"
import "../style/Account.css"
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext, UserType } from "../contexts/AuthContext";
import userImg from "../assets/user.png"

export default function Account(){

    document.title = "StockWise | Account"

    const { user } = useContext(AuthContext)

    const [edit, setEdit] = useState<boolean>(false)

    return (
        <div className="account">
            <Navbar page="Account" />
            <div className="content">
                <Header />
                <div className={`user-info ${edit ? "edit-active" : ""}`}>
                    <div className="img">
                        <img src={userImg} alt="User image" />
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

type EditUserType = {
    setEdit: React.Dispatch<React.SetStateAction<boolean>>,
    user: UserType | null
}

function EditUser({ setEdit, user }: EditUserType){

    const bioElement = useRef<HTMLTextAreaElement | null>(null)

    const { token, refreshData } = useContext(AuthContext)

    const handelSave = async() => {

        const bio = (bioElement.current?.value) === "" ? null : bioElement.current?.value

        if (bio === user?.bio){
            setEdit(false)

            return
        }
        
        const apiEndpoint = import.meta.env.VITE_API_ENDPOINT

        const response = await fetch(`${apiEndpoint}/users`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({bio})
        })

        const data = await response.json()

        if (data.status){
            refreshData()
            toast.success("User updated")
            setEdit(false)
        }
    }

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = 'Anda memiliki perubahan yang belum disimpan. Apakah Anda yakin ingin meninggalkan halaman ini?';
        };
      
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [])

    const handleLeaveSite = () => {
        return 'Anda akan meninggalkan situs ini. Apakah Anda yakin?';
    };

    useEffect(() => {
        window.onbeforeunload = handleLeaveSite;
    
        return () => {
            window.onbeforeunload = null;
        };
    }, []);

    return (
        <div className="edit">
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