import { IconPhotoPlus, IconPhotoX } from "@tabler/icons-react";
import axios from "axios";
import { FormEvent, useContext, useState } from "react";
import ReactQuill from 'react-quill';
import { toast } from "react-toastify";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import { LoaderContext } from "../contexts/LoaderContext";
import { ProductContext } from "../contexts/ProductContext";
import "../style/AddProduct.css";
import "../style/quill.snow.css";
import NotFound from "./NotFound";

export default function AddProduct(){

    const { isLogin } = useContext(AuthContext)

    const { products, setProducts } = useContext(ProductContext)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { setLoadingElementWidth, setLoadingElementHeight } = useContext(LoaderContext)

    const [
        [name, setName],
        [image, setImage],
        [category, setCategory],
        [price, setPrice],
        [quantity, setQuantity],
        [description, setDescription]
    ] = [
        useState(""),
        useState<File | null>(null),
        useState(""),
        useState(""),
        useState(""),
        useState("")
    ]

    const [imgPreview, setImgPreview] = useState("")

    if (isLogin === false){
        return <NotFound />
    }

    if (isLogin === true){
        document.title = "StockWise | Add product"

        const handleImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0]
            
            if (file) {
                const allowedExtensions = ["jpg", "jpeg", "png"]
                const extension = file.name.split(".").pop()?.toLowerCase()
          
                if (extension && allowedExtensions.includes(extension)){
                    if (file.size > 1024 * 1024){
                        toast.warn("Image size can not larger than 1MB")

                        return
                    }

                    setImage(file)          
                    const imgPreviewURL = URL.createObjectURL(file)
                    setImgPreview(imgPreviewURL)
                } 
                else {
                    toast.warn("Unsupported image extension")
    
                    return
                }
            }
        }
    
        const handleRemoveImg = () => {
            setImage(null)
            setImgPreview("")
        }
        
        const handleSubmit = async(event: FormEvent) => {
            event.preventDefault()
            
            if (description === ""){
                toast.warn("Please fill out all the columns")
    
                return
            }
    
            try {
                const target = event.target as HTMLFormElement
                setIsLoading(true)
                setLoadingElementWidth(target.querySelector("button.save")?.clientWidth)
                setLoadingElementHeight(target.querySelector("button.save")?.clientHeight)

                const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
                const jwt = localStorage.getItem("jwt")
    
                const newProduct = new FormData()
        
                newProduct.append("name", name)
                if (image !== null){
                    newProduct.append("image", image as Blob)
                }
                newProduct.append("category", category)
                newProduct.append("price", price)
                newProduct.append("quantity", quantity)
                newProduct.append("description", description)
                
                const { data } = await axios.post(`${APIEndpoint}/api/products`, newProduct, {
                    headers: {
                        "Authorization": `Bearer ${jwt}`
                    }
                })
    
                if (products){
                    setProducts([...products, data.data.product])
                }

                toast.success("Successfully added product")
    
                setName("")
                setImgPreview("")
                setImage(null)
                setCategory("")
                setPrice("")
                setQuantity("")
                setDescription("")

                setIsLoading(false)
            } catch(error){
                toast.error("Fail to add product")
                setIsLoading(false)
            }
        }
    
        return (
            <section className="add-product">
                <Navbar page="Add product" />
                <article className="content">
                    <Header />
                    <div className="add-new-product">
                        <form onSubmit={handleSubmit}>
                            <div className="form-header">Add product</div>
                            {imgPreview !== "" &&
                            <div className="img-preview" onClick={handleRemoveImg}>
                                <div className="remove-img">
                                    <IconPhotoX stroke={1.5} />
                                    <p>Click to delete</p>
                                </div>
                                <img src={imgPreview} alt="Image preview" />
                            </div>}
                            <input type="file" id="img" accept=".jpg, .jpeg, .png" onChange={handleImgChange} />
                            <label htmlFor="img">
                                <IconPhotoPlus stroke={1.5} />
                                <p>Choose image (jpg, jpeg, png)</p>
                            </label>
                            
                            <input type="text" required placeholder="Name" spellCheck="false" autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} />
                            
                            <input type="text" required placeholder="Category" spellCheck="false" autoComplete="off" value={category} onChange={(e) => setCategory(e.target.value)} />
                            
                            <input type="number" required min={1} placeholder="Price (Rp)" value={price} onChange={(e) => setPrice(e.target.value)} />
                            
                            <input type="number" required min={1} placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                            
                            <div className="react-quill">
                                <ReactQuill theme="snow" value={description} onChange={setDescription} placeholder="Description" />
                            </div>
                            {isLoading ?
                            <Loader /> :
                            <button type="submit" className="save">Save</button>}
                        </form>
                    </div>
                </article>
            </section>
        )
    }

    return null
}