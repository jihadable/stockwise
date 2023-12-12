import { FormEvent, useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import "../style/AddProduct.css"
import { item } from "../components/itemType"
import { IconPhotoPlus } from "@tabler/icons-react";
import { ToastContainer, toast } from "react-toastify";
import ReactQuill from 'react-quill';
import "../style/quill.snow.css"

export default function AddProduct(props: {setItems: React.Dispatch<React.SetStateAction<item[]>>}){

    document.title = "StockWise | Add product"
    
    const setItems = props.setItems

    const [
        [name, setName],
        [img, setImg],
        [category, setCategory],
        [price, setPrice],
        [quantity, setQuantity],
        [desc, setDesc]
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
                    setImg(base64String)
                }
      
                reader.readAsDataURL(file);
            } 
            else {
                toast.warn("File's extension is not allowed")
            }
        }
    }
    
    const handleSubmit = (e: FormEvent):void => {
        e.preventDefault()

        if (name === "" || img === "" || category === "" || price === "" || quantity === "" || desc === ""){
            toast.warn("Please fill the empty field")
            return
        }

        const idNow: number = JSON.parse(localStorage.getItem("idNow")!)

        const newItem: item = {id: idNow ,name, img, category, price: parseInt(price), quantity: parseInt(quantity), desc}

        setItems((items: item[]) => [...items, newItem])

        toast.success("Item added")

        setName("")
        setImg("")
        setCategory("")
        setPrice("")
        setQuantity("")
        setDesc("")

        localStorage.setItem("idNow", JSON.stringify(idNow + 1))
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
                            img !== "" &&
                            <div className="img-preview">
                                <img src={img} alt="Image preview" />
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
                            <ReactQuill theme="snow" value={desc} onChange={setDesc} placeholder="Product description" />
                        </div>
                        <button type="submit" className="save">Save product</button>
                    </form>
                </div>
            </div>
        </div>
    )
}