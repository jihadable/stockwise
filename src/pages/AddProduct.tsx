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

    const alertSvg = [
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-checks" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M7 12l5 5l10 -10"></path>
            <path d="M2 12l5 5m5 -5l5 -5"></path>
        </svg>,
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-square-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z"></path>
            <path d="M9 9l6 6m0 -6l-6 6"></path>
        </svg>
    ]
    const [alertMessage, setAlertMessage] = useState([alertSvg[0], "Product added"])

    return (
        <div className="add-product">
            <div className="alert">
                {alertMessage[0]}
                <span>{alertMessage[1]}</span>
            </div>
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