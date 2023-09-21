import Navbar from "../components/Navbar";
import Header from "../components/Header";
import user from "../assets/user.png"
import "../style/Account.css"
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

type User = {
    name: string,
    email: string,
    phone: string,
    bio: string
}

export default function Account(props: any){

    const userData: User = props.userData
    const setUserData = props.setUserData

    const info = [
        {
            title: "Name",
            value: userData.name
        },
        {
            title: "Email",
            value: userData.email
        },
        {
            title: "Phone",
            value: userData.phone
        },
        {
            title: "Bio",
            value: userData.bio
        }
    ]

    const [edit, setEdit] = useState(false)

    return (
        <div className="account">
            <Navbar page="Account" />
            <div className="content">
                <Header />
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
                            {
                                info.map((item, index) => {
                                    return (
                                        <div className="item" key={index}>
                                            <div className="label">{item.title}</div>
                                            <div className="value">{item.value}</div>
                                        </div>
                                    )
                                })
                            }
                            </div>
                            <div className="edit-btn" onClick={() => setEdit(true)}>Edit profile</div>
                        </div>
                    }
                    {
                        edit &&
                        <EditUser info={info} setEdit={setEdit} userData={userData} setUserData={setUserData} />
                    }
                </div>
            </div>
        </div>
    )
}

function EditUser(props: any){

    const info = props.info
    const setEdit = props.setEdit
    const userData: User = props.userData
    const [temporaryUserData, setTemporaryUserData] = useState({...userData})
    const setUserData = props.setUserData

    const handleChange = (value: string, label: string) => {
        setTemporaryUserData((userData: any) => {
            return {...userData, [label]: value}
        })
    }

    const handelSave = () => {
        if (temporaryUserData.name === "" || temporaryUserData.email === "" || temporaryUserData.phone === "" || temporaryUserData.bio === ""){
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
            {
                info.map((item: {title: string, value: string}, index: number) => {
                    return (
                        <div className="item" key={index}>
                            <div className="label">{item.title}</div>
                        {
                            item.title === "Bio" ? 
                            <textarea rows={7} className="value" spellCheck="false" defaultValue={item.value} onChange={(e) => handleChange(e.target.value, "bio")}></textarea> :
                            <input type="text" className="value" spellCheck="false" defaultValue={item.value} onChange={(e) => handleChange(e.target.value, item.title.toLowerCase())} />
                        }
                        </div>
                    )
                })
            }
            </div>
            <div className="btns">
                <div className="cancel" onClick={() => setEdit(false)}>Cancel</div>
                <div className="save" onClick={() => {handelSave()}}>Save changes</div>
            </div>
        </div>
    )
}