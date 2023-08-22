import { ReactElement, useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import "../style/Dashboard.css"
import InventoryStats from "../components/InventoryStats";
import InventoryItems from "../components/InventoryItems";
import ProductDetail from "../components/ProductDetail";
import ProductEdit from "../components/ProductEdit";

export default function Dashboard(): ReactElement{

    const [items, setItems] = useState(JSON.parse(localStorage.getItem("items")!))

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items))
    }, [items])

    const [productDetail, setProductDetail] = useState(undefined)
    const [showProductDetail, setShowProductDetail] = useState(false)

    const [productEdit, setProductEdit] = useState(undefined)
    const [showProductEdit, setShowProductEdit] = useState(false)

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

    const [alertMessage, setAlertMessage] = useState([alertSvg[0], "Product added", false, "success"])

    const submitBtn = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        document.addEventListener("click", function(e: Event){
            if (!submitBtn.current?.contains(e.target as Node)){
                setAlertMessage([alertSvg[0], alertMessage[1], false, "success"])
            }
        })
    }, [alertMessage])

    return (
        <>
        <div className="dashboard">
            <Navbar page="Dashboard" />
            <div className="content">
                <div className={`alert ${alertMessage[2] ? "active": ""} ${alertMessage[3]}`}>
                    {alertMessage[0]}
                    <span>{alertMessage[1]}</span>
                </div>
                <Header />
                <InventoryStats items={items} />
            {
                (!showProductDetail && !showProductEdit) &&
                <InventoryItems items={items} setItems={setItems} setProductDetail={setProductDetail} setShowProductDetail={setShowProductDetail} setProductEdit={setProductEdit} setShowProductEdit={setShowProductEdit} />
            }
            {
                showProductDetail &&
                <ProductDetail productDetail={productDetail} setShowProductDetail={setShowProductDetail} />
            }
            {
                showProductEdit &&
                <ProductEdit items={items} setItems={setItems} productEdit={productEdit} setShowProductEdit={setShowProductEdit} alertMessage={alertMessage} setAlertMessage={setAlertMessage} alertSvg={alertSvg} submitBtn={submitBtn} />
            }
            </div>
        </div>
        </>
    )
}