import { IconPhotoEdit, IconPhotoX } from "@tabler/icons-react"
import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react"
import ReactQuill from 'react-quill'
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Header from "../components/Header"
import Navbar from "../components/Navbar"
import { AuthContext } from "../contexts/AuthContext"
import { ProductContext, ProductType } from "../contexts/ProductContext"
import "../style/UpdateProduct.css"
import "../style/quill.snow.css"
import NotFound from "./NotFound"
import { LoaderContext } from "../contexts/LoaderContext"
import Loader from "../components/Loader"

export default function UpdateProduct(){

    const { isLogin } = useContext(AuthContext)
    const { setProducts } = useContext(ProductContext)

    const navigate = useNavigate()
    const { id } = useParams()

    const [product, setProduct] = useState<ProductType | null>(null)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { setLoadingElementWidth, setLoadingElementHeight } = useContext(LoaderContext)
    
    useEffect(() => {
        const getProductById = async() => {
            try {
                const token = localStorage.getItem("token")
                const APIEndpoint = import.meta.env.VITE_API_ENDPOINT

                const { data } = await axios.get(`${APIEndpoint}/api/products/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                setProduct(data.data.product)
            } catch(error){
                console.log(error)
            }
        }

        getProductById()
    }, [id])

    const [
        nameElement,
        [image, setImage],
        categoryElement,
        priceElement,
        quantityElement
    ] = [
        useRef<HTMLInputElement | null>(null),
        useState<File | null>(null),
        useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null)
    ]

    const [imgPreview, setImgPreview] = useState("")
    
    const [description, setDescription] = useState(product?.description)

    useEffect(() => {
        setDescription(product?.description)
    }, [product])
    
    if (isLogin === false || product === undefined){
        return <NotFound />
    }

    if (isLogin === true && product !== undefined){
        document.title = "StockWise | Update product" 
    
        const handleImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0]
    
            if (file) {
                const allowedExtensions = ["jpg", "jpeg", "png"]
                const extension = file.name.split(".").pop()?.toLowerCase()
          
                if (extension && allowedExtensions.includes(extension)) {
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
                }
            }
        }
    
        const handleSave = async(event: React.MouseEvent<HTMLButtonElement>) => {
            try {
                if (description === ""){
                    toast.warn("Please fill out all the columns")
                    
                    return
                }
                
                const target = event.target as HTMLButtonElement
                setIsLoading(true)
                setLoadingElementWidth(target.clientWidth)
                setLoadingElementHeight(target.clientHeight)

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
                
                const requestBody = new FormData()
        
                requestBody.append("name", name as string)
                if (image){
                    requestBody.append("image", image as Blob)
                }
                requestBody.append("category", category as string)
                requestBody.append("price", price as string)
                requestBody.append("quantity", quantity as string)
                requestBody.append("description", description as string)
        
                const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
                const token = localStorage.getItem("token")

                const { data } = await axios.put(`${APIEndpoint}/api/products/${id}`, requestBody, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })

                setProducts(products => (
                    products ? products.map(p => p.id === product?.id ? data.data.product : p) : null
                ))
                toast.success("Successfully updated product")
                navigate("/dashboard")

                setIsLoading(false)
            } catch(error){
                toast.error("Failed to update product")
                setIsLoading(false)
            }
    
        }
    
        return (
            <section className="edit">
                <Navbar page="Dashboard" />
                <article className="content">
                    <Header />
                    <article className="edit-container">
                        <p className="edit-header">Update produk</p>
                        <article className="edit-content">
                            <div className="img">
                                {product?.image && imgPreview === "" &&
                                <img src={`${import.meta.env.VITE_IMAGE_API_ENDPOINT}/${product?.image}`} alt="Image Preview" />}
                                {!product?.image && imgPreview === "" &&
                                <div className="no-img">
                                    <IconPhotoX stroke={1.5} />
                                    <p>No image added</p>
                                </div>}
                                {imgPreview !== "" &&
                                <img src={imgPreview} alt="Image Preview" />}
                            </div>
                            <article className="info">
                                <div className="item img-input">
                                    <input type="file" id="img" accept=".jpg, .jpeg, .png" onChange={handleImgChange} />
                                    <label htmlFor="img">
                                        <IconPhotoEdit stroke={1.5} />
                                        <span>Update image</span>
                                    </label>
                                </div>
                                <div className="item">
                                    <div className="label">
                                        <div className="circle"></div>
                                        <span>Name</span>
                                    </div>
                                    <input type="text" className="value" required spellCheck="false" defaultValue={product?.name} ref={nameElement} />
                                </div>
                                <div className="item">
                                    <div className="label">
                                        <div className="circle"></div>
                                        <span>Category</span>
                                    </div>
                                    <input type="text" className="value" required spellCheck="false" defaultValue={product?.category} ref={categoryElement} />
                                </div>
                                <div className="item">
                                    <div className="label">
                                        <div className="circle"></div>
                                        <span>Price (Rp)</span>
                                    </div>
                                    <input type="number" min={1} className="value" required spellCheck="false" defaultValue={product?.price} ref={priceElement} />
                                </div>
                                <div className="item">
                                    <div className="label">
                                        <div className="circle"></div>
                                        <span>Quantity</span>
                                    </div>
                                    <input type="number" min={1} className="value" required spellCheck="false" defaultValue={product?.quantity} ref={quantityElement} />
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
                                    {isLoading ?
                                    <Loader /> :
                                    <button type="button" className="save" onClick={handleSave}>Save changes</button>}
                                </div>
                            </article>
                        </article>
                    </article>
                </article>
            </section>
        )
    }

    return null
}