import { Link } from "react-router-dom"
import Header from "../components/Header"
import Navbar from "../components/Navbar"
import { item } from "../components/itemType"
import "../style/Edit.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { IconPhotoEdit } from "@tabler/icons-react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import ReactQuill from 'react-quill';
import "../style/quill.snow.css"

type EditType = {
    items: item[],
    editItem: item,
    setItems: React.Dispatch<React.SetStateAction<item[]>>
}

export default function Edit(props: EditType){

    document.title = "StockWise | Edit item"

    const navigate = useNavigate()

    const items: item[] = props.items
    const editItem: item = props.editItem

    const setItems = props.setItems

    const [
        id,
        [name, setName],
        [img, setImg],
        [category, setCategory],
        [price, setPrice],
        [quantity, setQuantity],
        [desc, setDesc]
    ] = [
        editItem?.id,
        useState(editItem?.name),
        useState(editItem?.img),
        useState(editItem?.category),
        useState(editItem?.price),
        useState(editItem?.quantity),
        useState(editItem?.desc)
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
                    setImg(base64String)
                }
      
                reader.readAsDataURL(file);
            } 
            else {
                alert("File's extension is not allowed");
            }
        }
    }

    function handleSave(): void {

        if (name === "" || img === "" || category === "" || isNaN(price) || isNaN(quantity) || desc === ""){
            toast.warn("Please fill the empty field")
            
            return
        }

        const modifiedArray: item[] = items.map((obj: item) => {
            if (obj.id === id) {
                return {
                    ...obj,
                    name: name,
                    img: img,
                    category: category,
                    price: price,
                    quantity: quantity,
                    desc: desc
                };
            }

            return obj;
        });

        setItems(modifiedArray)

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
                            <img src={img} alt="Image Preview" />
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
                                    <ReactQuill theme="snow" value={desc} onChange={setDesc} className="quill-edit" />
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