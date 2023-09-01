import { useEffect, useRef, useState } from "react";
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
            setAlertMessage([alertSvg[1], "Please fill the empty field", true, "warning"])
            return
        }

        const idNow = JSON.parse(localStorage.getItem("idNow")!)

        const newItem = {id: idNow ,name, category, price, quantity, desc}

        setItems((items: item[]) => [...items, newItem])

        setAlertMessage([alertSvg[0], "Product added", true, "success"])

        setName("")
        setCategory("")
        setPrice("")
        setQuantity("")
        setDesc("")

        localStorage.setItem("idNow", JSON.stringify(idNow + 1))
    }

    const alertSvg = [
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-checks" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M7 12l5 5l10 -10"></path>
            <path d="M2 12l5 5m5 -5l5 -5"></path>
        </svg>,
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-alert-circle" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
            <path d="M12 8v4"></path>
            <path d="M12 16h.01"></path>
        </svg>,
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-square-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z"></path>
            <path d="M9 9l6 6m0 -6l-6 6"></path>
        </svg>
    ]

    const [alertMessage, setAlertMessage] = useState([alertSvg[0], "Product added", false, "success"])

    const submitBtn = useRef<HTMLButtonElement | null>(null)

    useEffect(() => {
        document.addEventListener("click", function(e: MouseEvent){
            if (submitBtn.current && !submitBtn.current.contains(e.target as Node)){
                setAlertMessage([alertMessage[0], alertMessage[1], false, "success"])
            }
        })
    }, [])

    return (
        <div className="add-product">
            <div className={`alert ${alertMessage[2] ? "active": ""} ${alertMessage[3]}`}>
                {alertMessage[0]}
                <span>{alertMessage[1]}</span>
            </div>
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
                        <button type="submit" ref={submitBtn}>Save product</button>
                    </form>
                </div>
            </div>
        </div>
    )
}