import { useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import "../style/AddProduct.css"
import { item } from "../components/itemType"

export default function AddProduct(props: any){
    
    const setItems = props.setItems

    const [
        [name, setName],
        [category, setCategory],
        [price, setPrice],
        [quantity, setQuantity],
        [desc, setDesc]
    ] = [
        useState(""),
        useState(""),
        useState(""),
        useState(""),
        useState("")
    ]
    
    const handleSubmit = (e: any):void => {
        e.preventDefault()

        if (name === "" || category === "" || price === "" || quantity === "" || desc === ""){
            alert("Please fill the empty field")
            return
        }

        const idNow = JSON.parse(localStorage.getItem("idNow")!)

        const newItem = {id: idNow ,name, category, price, quantity, desc}

        setItems((items: item[]) => [...items, newItem])

        alert("Item added")

        setName("")
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
                <div className="add-new-product">
                    <form onSubmit={handleSubmit}>
                        <div className="form-header">Add new product</div>
                        <input type="text" id="name" autoComplete="off" name="name" placeholder="Product name" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="text" id="category" autoComplete="off" name="category" placeholder="Product category" value={category} onChange={(e) => setCategory(e.target.value)} />
                        <input type="number" id="price" name="price" min={0} placeholder="Product price" value={price} onChange={(e) => setPrice(e.target.value)} />
                        <input type="number" id="quantity" name="quantity" min={1} placeholder="Product quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        <textarea id="desc" name="desc" rows={7} placeholder="Product description" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                        <button type="submit">Save product</button>
                    </form>
                </div>
            </div>
        </div>
    )
}