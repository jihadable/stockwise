import { Link, useNavigate, useParams } from "react-router-dom"
import Header from "../components/Header"
import Navbar from "../components/Navbar"
import "../style/Edit.css"
import { useState, useEffect, useContext, useRef } from "react"
import { IconPhotoEdit, IconPhotoX } from "@tabler/icons-react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import ReactQuill from 'react-quill';
import "../style/quill.snow.css"
import { AuthContext, ItemType } from "../contexts/AuthContext"

export default function Edit(){

    document.title = "StockWise | Edit item"

    const { items, token, verifyToken } = useContext(AuthContext)

    const { slug } = useParams<{ slug: string }>()

    const [item, setItem] = useState<ItemType | null>(null)

    const storageEndpoint = import.meta.env.VITE_STORAGE_ENDPOINT 

    useEffect(() => {
        if (items){
            const detailItem: ItemType = items.filter(item => item.slug == slug)[0]
    
            setItem(detailItem)
        }
    }, [slug, items])

    const navigate = useNavigate()

    const [
        nameElement,
        [image, setImage],
        categoryElement,
        priceElement,
        quantityElement
    ] = [
        useRef<HTMLInputElement | null>(null),
        useState<File | string>(""),
        useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null)
    ]

    const [imgPreview, setImgPreview] = useState("")

    const [description, setDescription] = useState(item?.description)

    useEffect(() => {
        setDescription(item?.description)
    }, [item])

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

    const handleSave = async() => {

        const [
            name,
            category, 
            price,
            quantity
        ] = [
            nameElement.current?.value,
            categoryElement.current?.value,
            priceElement.current?.value,
            quantityElement.current?.value
        ]

        if (name === "" || 
        category === "" || 
        price === "" || 
        parseInt(price!) < 1 || 
        quantity === "" || 
        parseInt(quantity!) < 1 || 
        description === ""){
            toast.warn("Please fill the empty field")
            
            return
        }

        const newItem = new FormData()

        newItem.append("name", name!)
        newItem.append("image", image!)
        newItem.append("category", category!)
        newItem.append("price", price!)
        newItem.append("quantity", quantity!)
        newItem.append("description", description! as string)

        const apiEndpoint = import.meta.env.VITE_API_ENDPOINT

        const response = await fetch(`${apiEndpoint}/items/${item?.id}?_method=put`, {
            method: "post",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: newItem
        })

        const data = await response.json()

        console.log(data)

        if (data.status){
            verifyToken()
            toast.success("Item edited")
            
            setTimeout(() => {
                navigate("/dashboard")
            }, 1500);
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
                            {(item?.image && imgPreview === "") &&
                            <img src={`${storageEndpoint}/${item?.image}`} alt="Image Preview" />}
                            {(!item?.image && imgPreview === "") &&
                            <div className="no-img">
                                <IconPhotoX stroke={1.5} />
                                <p>No image added</p>
                            </div>}
                            {imgPreview !== "" &&
                            <img src={imgPreview} alt="Image Preview" />}
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
                                <input type="text" className="value" spellCheck="false" defaultValue={item?.name} ref={nameElement} />
                            </div>
                            <div className="item">
                                <div className="label">
                                    <div className="circle"></div>
                                    <span>Category</span>
                                </div>
                                <input type="text" className="value" spellCheck="false" defaultValue={item?.category} ref={categoryElement} />
                            </div>
                            <div className="item">
                                <div className="label">
                                    <div className="circle"></div>
                                    <span>Price</span>
                                </div>
                                <input type="number" min={0} className="value" spellCheck="false" defaultValue={item?.price} ref={priceElement} />
                            </div>
                            <div className="item">
                                <div className="label">
                                    <div className="circle"></div>
                                    <span>Quantity</span>
                                </div>
                                <input type="number" min={0} className="value" spellCheck="false" defaultValue={item?.quantity} ref={quantityElement} />
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
                                <div className="save" onClick={handleSave}>Save changes</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}