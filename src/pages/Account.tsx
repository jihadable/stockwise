import Navbar from "../components/Navbar";
import Header from "../components/Header"
import "../style/Account.css"
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext, UserType } from "../contexts/AuthContext";
import { IconPhotoEdit, IconPhotoX } from "@tabler/icons-react";

export default function Account(){

    document.title = "StockWise | Account"

    const { user } = useContext(AuthContext)

    const storageEndpoint = import.meta.env.VITE_STORAGE_ENDPOINT

    const [edit, setEdit] = useState<boolean>(false)

    return (
        <div className="account">
            <Navbar page="Account" />
            <div className="content">
                <Header />
                <div className={`user-info ${edit ? "edit-active" : ""}`}>
                    {!edit &&
                    <>
                    <div className="img">
                        {user?.image &&
                        <img src={`${storageEndpoint}/${user?.image}`} alt="Image Preview" />}
                        {!user?.image && 
                        <div className="no-img">
                            <IconPhotoX stroke={1.5} />
                            <p>No image added</p>
                        </div>}
                    </div>
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
                    </>
                    }
                    {
                        edit &&
                        <EditUser setEdit={setEdit} user={user} storageEndpoint={storageEndpoint} />
                    }
                </div>
            </div>
        </div>
    )
}

type EditUserType = {
    setEdit: React.Dispatch<React.SetStateAction<boolean>>,
    user: UserType | null,
    storageEndpoint: string
}

function EditUser({ setEdit, user, storageEndpoint }: EditUserType){

    const [imgPreview, setImgPreview] = useState("")

    const [
        [image, setImage],
        bioElement
    ] = [
        useState<File | string>(""),
        useRef<HTMLTextAreaElement | null>(null)
    ]

    function handleImgChange(event: React.ChangeEvent<HTMLInputElement>){
        const file = event.target.files?.[0]

        if (file) {
            const allowedExtensions = ['jpg', 'jpeg', 'png']
            const extension = file.name.split('.').pop()?.toLowerCase()
      
            if (extension && allowedExtensions.includes(extension)) {
                setImage(file)
                const reader = new FileReader();
      
                reader.onload = () => {
                    const base64String = reader.result as string;
                    setImgPreview(base64String)
                }
      
                reader.readAsDataURL(file);
            } 
            else {
                toast.warn("File's extension is not allowed")
            }
        }
    }

    const handelSave = () => {
        toast.warn("Please fill the empty field")

        return
        
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
        <>
        <div className="img">
            {(user?.image && imgPreview === "") &&
            <img src={`${storageEndpoint}/${user?.image}`} alt="Image Preview" />}
            {(!user?.image && imgPreview === "") &&
            <div className="no-img">
                <IconPhotoX stroke={1.5} />
                <p>No image added</p>
            </div>}
            {imgPreview !== "" &&
            <img src={imgPreview} alt="Image Preview" />}
        </div>
        <div className="edit">
            <div className="info">
                <div className="item">
                    <input type="file" id="edit-img" accept=".jpg, .jpeg, .png" onChange={handleImgChange} />
                    <label htmlFor="edit-img" className="label">
                        <IconPhotoEdit stroke={1.5} />
                        <span>Edit image</span>
                    </label>
                </div>
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
                    <textarea rows={7} className="value" spellCheck="false" defaultValue={user?.bio ?? ""} ref={bioElement}></textarea>
                </div>
            </div>
            <div className="btns">
                <div className="cancel" onClick={() => setEdit(false)}>Cancel</div>
                <div className="save" onClick={handelSave}>Save changes</div>
            </div>
        </div>
        </>
    )
}