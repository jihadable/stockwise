import Navbar from "../components/Navbar";
import Header from "../components/Header";
import user from "../assets/user.png"
import "../style/Account.css"
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type AccountPropsType = {
    isLogin: boolean | null,
    setIsLogin: React.Dispatch<React.SetStateAction<boolean | null>>,
    token: string | null,
    setToken: React.Dispatch<React.SetStateAction<string | null>>
}

type UserDatatype = {
    username: string,
    email: string,
    phone: string,
    bio: string
}

export default function Account({ isLogin, setIsLogin, token, setToken }: AccountPropsType){

    document.title = "StockWise | Account"

    const navigate = useNavigate()

    useEffect(() => {
        if (!isLogin) navigate("/")
    }, [isLogin, navigate])

    const [userData, setUserData] = useState<UserDatatype>({
        username: "User",
        email: "user@mail.com",
        phone: "081234567890",
        bio: "Lorem ipsum dolor sit amet."
    })

    const [edit, setEdit] = useState<boolean>(false)

    return (
        <div className="account">
            <Navbar page="Account" />
            <div className="content">
                <Header setIsLogin={setIsLogin} token={token} setToken={setToken} />
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
                <div className={`user-info ${edit ? "edit-active" : ""}`}>
                    <div className="img">
                        <img src={user} alt="User" />
                    </div>
                    {
                        !edit &&
                        <div className="side">
                            <div className="info">
                            <div className="item">
                                <div className="label">Username</div>
                                <div className="value">{userData.username}</div>
                            </div>
                            <div className="item">
                                <div className="label">Email</div>
                                <div className="value">{userData.email}</div>
                            </div>
                            <div className="item">
                                <div className="label">Phone</div>
                                <div className="value">{userData.phone}</div>
                            </div>
                            <div className="item">
                                <div className="label">Bio</div>
                                <div className="value">{userData.bio}</div>
                            </div>
                            </div>
                            <div className="edit-btn" onClick={() => setEdit(true)}>Edit profile</div>
                        </div>
                    }
                    {
                        edit &&
                        <EditUser setEdit={setEdit} userData={userData} setUserData={setUserData} />
                    }
                </div>
            </div>
        </div>
    )
}

type EditUserType = {
    setEdit: React.Dispatch<React.SetStateAction<boolean>>,
    userData: UserDatatype,
    setUserData: React.Dispatch<React.SetStateAction<UserDatatype>>
}

function EditUser({ setEdit, userData, setUserData }: EditUserType){

    const [temporaryUserData, setTemporaryUserData] = useState<UserDatatype>({...userData})

    const handleChange = (value: string, key: string) => {
        setTemporaryUserData((userData: UserDatatype) => {
            return {...userData, [key]: value}
        })
    }

    const handelSave = () => {
        if (temporaryUserData.username === "" || 
        temporaryUserData.email === "" || 
        temporaryUserData.phone === "" || 
        temporaryUserData.bio === ""){
            toast.warn("Please fill the empty field")

            return
        }
        
        setUserData({...temporaryUserData})
        toast.success("User edited")

        setTimeout(() => {
            setEdit(false)
        }, 200);
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
                    <input type="text" className="value" spellCheck="false" defaultValue={userData.username} onChange={(e) => handleChange(e.target.value, "username")} />
                </div>
                <div className="item">
                    <div className="label">Email</div>
                    <input type="text" className="value" spellCheck="false" defaultValue={userData.email} onChange={(e) => handleChange(e.target.value, "email")} />
                </div>
                <div className="item">
                    <div className="label">Phone</div>
                    <input type="text" className="value" spellCheck="false" defaultValue={userData.phone} onChange={(e) => handleChange(e.target.value, "phone")} />
                </div>
                <div className="item">
                    <div className="label">Bio</div>
                    <textarea rows={7} className="value" spellCheck="false" defaultValue={userData.bio} onChange={(e) => handleChange(e.target.value, "bio")}></textarea>
                </div>
            </div>
            <div className="btns">
                <div className="cancel" onClick={() => setEdit(false)}>Cancel</div>
                <div className="save" onClick={handelSave}>Save changes</div>
            </div>
        </div>
    )
}