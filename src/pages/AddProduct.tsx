import { ReactElement, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import "../style/AddProduct.css"

export default function AddProduct(): ReactElement{

    type item = {
        id: number,
        name: string,
        category: string,
        price: number,
        quantity: number,
        desc: string
    }

    const [items, setItems] = useState(JSON.parse(localStorage.getItem("items")!))

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items))
        console.log(items)
    }, [items])

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
            alert("Please enter the empty field form")
            return
        }

        const idNow = JSON.parse(localStorage.getItem("idNow")!)

        const newItem = {id: idNow ,name, category, price, quantity, desc}

        setItems((items: item[]) => [...items, newItem])

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
                        <input type="text" placeholder="Product name" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="text" placeholder="Product category" value={category} onChange={(e) => setCategory(e.target.value)} />
                        <input type="number" min={0} placeholder="Product price" value={price} onChange={(e) => setPrice(e.target.value)} />
                        <input type="number" min={1} placeholder="Product quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        <textarea rows={7} placeholder="Product description" value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                        <button type="submit">Save product</button>
                    </form>
                </div>
            </div>
        </div>
    )
}