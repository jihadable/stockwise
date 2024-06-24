import { IconPhotoPlus, IconPhotoX } from "@tabler/icons-react";
import axios from "axios";
import { FormEvent, useContext, useState } from "react";
import ReactQuill from 'react-quill';
import { toast } from "react-toastify";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import { ProductContext } from "../contexts/ProductContext";
import "../style/AddProduct.css";
import "../style/quill.snow.css";

export default function AddProduct(){

    document.title = "StockWise | Add product"

    const { token } = useContext(AuthContext)
    const { getAllProducts } = useContext(ProductContext)

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

    function handleImgChange(event: React.ChangeEvent<HTMLInputElement>){
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

                return
            }
        }
    }

    const handleRemoveImg = () => {
        setImage(null)
        setImgPreview("")
    }
    
    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault()
        
        if (description === ""){
            toast.warn("Masih ada kolom yang belum diisi!")

            return
        }

        try {
            const productsAPIEndpoint = import.meta.env.VITE_PRODUCTS_API_ENDPOINT

            const newProduct = new FormData()
    
            newProduct.append("name", name)
            if (image !== null){
                newProduct.append("image", image as Blob)
            }
            newProduct.append("category", category)
            newProduct.append("price", price)
            newProduct.append("quantity", quantity)
            newProduct.append("description", description)
            
            const { data } = await axios.post(
                productsAPIEndpoint,
                newProduct,
                {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            )

            console.log(data)
            await getAllProducts()
            toast.success("Berhasil menambahkan product baru")

            setName("")
            setImgPreview("")
            setImage(null)
            setCategory("")
            setPrice("")
            setQuantity("")
            setDescription("")
        } catch(error){
            console.log(error)
            toast.error("Gagal menambahkan product baru")
        }
    }

    return (
        <div className="add-product">
            <Navbar page="Add product" />
            <div className="content">
                <Header />
                <div className="add-new-product">
                    <form onSubmit={handleSubmit}>
                        <div className="form-header">Tambah produk baru</div>
                        {
                            imgPreview !== "" &&
                            <div className="img-preview" onClick={handleRemoveImg}>
                                <div className="remove-img">
                                    <IconPhotoX stroke={1.5} />
                                    <span>Klik untuk hapus</span>
                                </div>
                                <img src={imgPreview} alt="Image preview" />
                            </div>
                        }
                        <input type="file" id="img" accept=".jpg, .jpeg, .png" onChange={handleImgChange} />
                        <label htmlFor="img">
                            <IconPhotoPlus stroke={1.5} />
                            <span>Pilih gambar (jpg, jpeg, png)</span>
                        </label>
                        
                        <input type="text" required placeholder="Nama" spellCheck="false" autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} />
                        
                        <input type="text" required placeholder="Kategori" spellCheck="false" autoComplete="off" value={category} onChange={(e) => setCategory(e.target.value)} />
                        
                        <input type="number" required min={1} placeholder="Harga" value={price} onChange={(e) => setPrice(e.target.value)} />
                        
                        <input type="number" required min={1} placeholder="Kuantitas" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        
                        <div className="react-quill">
                            <ReactQuill theme="snow" value={description} onChange={setDescription} placeholder="Deskripsi" />
                        </div>
                        
                        <button type="submit" className="save">Simpan</button>
                    </form>
                </div>
            </div>
        </div>
    )
}