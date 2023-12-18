import { FormEvent, useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import "../style/AddProduct.css"
import { IconPhotoPlus } from "@tabler/icons-react";
import { ToastContainer, toast } from "react-toastify";
import ReactQuill from 'react-quill';
import "../style/quill.snow.css"
import { AuthContext } from "../contexts/AuthContext";

export default function AddProduct(){

    document.title = "StockWise | Add product"

    const { token, verifyToken } = useContext(AuthContext)

    const [
        [name, setName],
        [image, setImage],
        [category, setCategory],
        [price, setPrice],
        [quantity, setQuantity],
        [description, setDescription]
    ] = [
        useState(""),
        useState(""),
        useState(""),
        useState(""),
        useState(""),
        useState("")
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
    
    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault()

        if (name === "" || category === "" || price === "" || quantity === "" || description === ""){
            toast.warn("Please fill the empty field")
            return
        }

        const newItem = {name, image: image === "" ? null : image, category, price: parseInt(price), quantity: parseInt(quantity), description}

        const apiEndpoint = import.meta.env.VITE_API_ENDPOINT

        const response = await fetch(`${apiEndpoint}/items`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newItem)
        })

        const data = await response.json()

        if (data.status){
            verifyToken()
            toast.success("Item added")

            setName("")
            setImage("")
            setCategory("")
            setPrice("")
            setQuantity("")
            setDescription("")
        }
    }

    return (
        <div className="add-product">
            <Navbar page="Add product" />
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
                <div className="add-new-product">
                    <form onSubmit={handleSubmit}>
                        <div className="form-header">Add new product</div>
                        {
                            image !== "" &&
                            <div className="img-preview">
                                <img src={image} alt="Image preview" />
                            </div>
                        }
                        <input type="file" id="img" accept=".jpg, .jpeg, .png" onChange={handleImgChange} />
                        <label htmlFor="img">
                            <IconPhotoPlus stroke={1.5} />
                            <span>Choose an image file</span>
                        </label>
                        <input type="text" id="name" name="name" placeholder="Product name" spellCheck="false" autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="text" id="category" name="category" placeholder="Product category" spellCheck="false" autoComplete="off" value={category} onChange={(e) => setCategory(e.target.value)} />
                        <input type="number" id="price" name="price" min={0} placeholder="Product price" value={price} onChange={(e) => setPrice(e.target.value)} />
                        <input type="number" id="quantity" name="quantity" min={1} placeholder="Product quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        <div className="react-quill">
                            <ReactQuill theme="snow" value={description} onChange={setDescription} placeholder="Product description" />
                        </div>
                        <button type="submit" className="save">Save product</button>
                    </form>
                </div>
            </div>
        </div>
    )
}