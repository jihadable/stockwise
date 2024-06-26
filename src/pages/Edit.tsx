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
import "../style/Edit.css"
import "../style/quill.snow.css"
import NotFound from "./NotFound"

export default function Edit(){

    const { token, isLogin } = useContext(AuthContext)
    const { getAllProducts, products } = useContext(ProductContext)

    const navigate = useNavigate()
    const { slug } = useParams()

    const [product, setProduct] = useState<ProductType | null>(null)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    useEffect(() => {
        if (products !== null){
            setProduct(products.filter(product => product.slug === slug)[0])
        }
    }, [slug, products])

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
    
    if (isLogin === false || (products !== null && product === undefined)){
        return <NotFound />
    }

    if (isLogin === true && products !== null && product !== undefined){
        document.title = "StockWise | Edit product"
    
        const storageAPIEndpoint = import.meta.env.VITE_STORAGE_API_ENDPOINT 
    
        const handleImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0]
    
            if (file) {
                const allowedExtensions = ["jpg", "jpeg", "png"]
                const extension = file.name.split(".").pop()?.toLowerCase()
          
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
                    toast.warn("Ekstensi file tidak diterima")
                }
            }
        }
    
        const handleSave = async() => {
            if (description === ""){
                toast.warn("Masih ada kolom yang belum diisi!")
                
                return
            }

            try {
                setIsLoading(true)

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
                
                const newProduct = new FormData()
        
                newProduct.append("name", name as string)
                if (image){
                    newProduct.append("image", image as Blob)
                }
                newProduct.append("category", category as string)
                newProduct.append("price", price as string)
                newProduct.append("quantity", quantity as string)
                newProduct.append("description", description as string)
        
                const productsAPIEndpoint = import.meta.env.VITE_PRODUCTS_API_ENDPOINT

                await axios.post(
                    `${productsAPIEndpoint}/${product?.slug}`,
                    newProduct,
                    {
                        params: {
                            "_method": "patch"
                        },
                        headers: {
                            "Authorization": "Bearer " + token
                        }
                    }
                )

                await getAllProducts()
                toast.success("Berhasil memperbarui produk")
                navigate("/dashboard")

                setIsLoading(false)
            } catch(error){
                toast.error("Gagal memperbarui produk")
                setIsLoading(false)
            }
    
        }
    
        return (
            <div className="edit">
                <Navbar page="Dashboard" />
                <div className="content">
                    <Header />
                    <div className="edit-container">
                        <div className="edit-header">Edit produk</div>
                        <div className="edit-content">
                            <div className="img">
                                {
                                    product?.image && imgPreview === "" &&
                                    <img src={`${storageAPIEndpoint}/${product?.image}`} alt="Image Preview" />
                                }
                                {
                                    !product?.image && imgPreview === "" &&
                                    <div className="no-img">
                                        <IconPhotoX stroke={1.5} />
                                        <p>Tidak ada gambar</p>
                                    </div>
                                }
                                {
                                    imgPreview !== "" &&
                                    <img src={imgPreview} alt="Image Preview" />
                                }
                            </div>
                            <div className="info">
                                <div className="item img-input">
                                    <input type="file" id="img" accept=".jpg, .jpeg, .png" onChange={handleImgChange} />
                                    <label htmlFor="img">
                                        <IconPhotoEdit stroke={1.5} />
                                        <span>Ganti gambar</span>
                                    </label>
                                </div>
                                <div className="item">
                                    <div className="label">
                                        <div className="circle"></div>
                                        <span>Nama</span>
                                    </div>
                                    <input type="text" className="value" required spellCheck="false" defaultValue={product?.name} ref={nameElement} />
                                </div>
                                <div className="item">
                                    <div className="label">
                                        <div className="circle"></div>
                                        <span>Kategori</span>
                                    </div>
                                    <input type="text" className="value" required spellCheck="false" defaultValue={product?.category} ref={categoryElement} />
                                </div>
                                <div className="item">
                                    <div className="label">
                                        <div className="circle"></div>
                                        <span>Harga (Rp)</span>
                                    </div>
                                    <input type="number" min={1} className="value" required spellCheck="false" defaultValue={product?.price} ref={priceElement} />
                                </div>
                                <div className="item">
                                    <div className="label">
                                        <div className="circle"></div>
                                        <span>Kuantitas</span>
                                    </div>
                                    <input type="number" min={1} className="value" required spellCheck="false" defaultValue={product?.quantity} ref={quantityElement} />
                                </div>
                                <div className="item">
                                    <div className="label">
                                        <div className="circle"></div>
                                        <span>Deskripsi</span>
                                    </div>
                                    <div className="react-quill value">
                                        <ReactQuill theme="snow" value={description} onChange={setDescription} className="quill-edit" />
                                    </div>
                                </div>
                                <div className="btns">
                                    <Link to={"/dashboard"} className="cancel">Cancel</Link>
                                    {
                                        isLoading ?
                                        <div className="loader">
                                            <div className="custom-loader"></div>
                                        </div> :
                                        <button type="button" className="save" onClick={handleSave}>Simpan</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return null
}