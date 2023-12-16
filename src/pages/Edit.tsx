import { Link, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Navbar from "../components/Navbar"
import "../style/Edit.css"
import { useState, useEffect } from "react"
import { IconPhotoEdit, IconPhotoX } from "@tabler/icons-react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import ReactQuill from 'react-quill';
import "../style/quill.snow.css"
import { ItemType } from "../contexts/AuthContext"

type EditType = {
    editItem: ItemType
}

export default function Edit({ editItem }: EditType){

    document.title = "StockWise | Edit item"

    const navigate = useNavigate()

    const [
        id,
        [name, setName],
        [image, setImage],
        [category, setCategory],
        [price, setPrice],
        [quantity, setQuantity],
        [description, setDescription]
    ] = [
        editItem?.id,
        useState(editItem?.name),
        useState(editItem?.image),
        useState(editItem?.category),
        useState(editItem?.price),
        useState(editItem?.quantity),
        useState(editItem?.description)
    ]

    function handleImgChange(event: React.ChangeEvent<HTMLInputElement>){
        const file = event.target.files?.[0]

        if (file) {
            const allowedExtensions = ['jpg', 'jpeg', 'png']
            const extension = file.name.split('.').pop()?.toLowerCase()
      
            if (extension && allowedExtensions.includes(extension)) {
                const reader = new FileReader();
      
                reader.onload = () => {
                    const base64String = reader.result as string;
                    setImage(base64String)
                }
      
                reader.readAsDataURL(file);
            } 
            else {
                toast.warn("File's extension is not allowed")
            }
        }
    }

    function handleSave(): void {

        if (name === "" || image === "" || category === "" || isNaN(price) || isNaN(quantity) || description === ""){
            toast.warn("Please fill the empty field")
            
            return
        }

        toast.success("Item edited")

        setTimeout(() => {
            navigate("/dashboard")
        }, 1500);
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
            <Navbar page="Dashboard" />
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
                <div className="edit-container">
                    <div className="edit-header">Edit product</div>
                    <div className="edit-content">
                        <div className="img">
                            {image &&
                            <img src={image} alt="Image Preview" />}
                            {!image &&
                            <div className="no-img">
                                <IconPhotoX stroke={1.5} />
                                <p>No image added</p>
                            </div>}
                        </div>
                        <div className="info">
                            <div className="item img-input">
                                <input type="file" id="img" accept=".jpg, .jpeg, .png" onChange={handleImgChange} />
                                <label htmlFor="img">
                                    <IconPhotoEdit stroke={1.5} />
                                    <span>Edit image</span>
                                </label>
                            </div>
                            <div className="item">
                                <div className="label">
                                    <div className="circle"></div>
                                    <span>Name</span>
                                </div>
                                <input type="text" className="value" spellCheck="false" value={name} onChange={(e) => {setName(e.target.value)}} />
                            </div>
                            <div className="item">
                                <div className="label">
                                    <div className="circle"></div>
                                    <span>Category</span>
                                </div>
                                <input type="text" className="value" spellCheck="false" value={category} onChange={(e) => {setCategory(e.target.value)}} />
                            </div>
                            <div className="item">
                                <div className="label">
                                    <div className="circle"></div>
                                    <span>Price</span>
                                </div>
                                <input type="number" min={0} className="value" spellCheck="false" value={isNaN(price) ? "" : price} onChange={(e) => {setPrice(parseInt(e.target.value))}} />
                            </div>
                            <div className="item">
                                <div className="label">
                                    <div className="circle"></div>
                                    <span>Quantity</span>
                                </div>
                                <input type="number" className="value" spellCheck="false" value={isNaN(quantity) ? "" : quantity} onChange={(e) => {setQuantity(parseInt(e.target.value))}} />
                            </div>
                            <div className="item">
                                <div className="label">
                                    <div className="circle"></div>
                                    <span>Description</span>
                                </div>
                                <div className="react-quill value">
                                    <ReactQuill theme="snow" value={description} onChange={setDescription} className="quill-edit" />
                                </div>
                            </div>
                            <div className="btns">
                                <Link to={"/dashboard"} className="cancel">Cancel</Link>
                                <div className="save" onClick={() => {handleSave()}}>Save changes</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}