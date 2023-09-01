import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import "../style/Dashboard.css"
import InventoryStats from "../components/InventoryStats";
import InventoryItems from "../components/InventoryItems";
import ProductDetail from "../components/ProductDetail";
import ProductEdit from "../components/ProductEdit";
import { item } from "../components/itemType";

export default function Dashboard(props: any){

    const items = props.items
    const setItems = props.setItems

    const [productDetail, setProductDetail] = useState<item>({} as item)
    const [showProductDetail, setShowProductDetail] = useState(false)

    const [productEdit, setProductEdit] = useState<item>({} as item)
    const [showProductEdit, setShowProductEdit] = useState(false)

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

    const submitBtn = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        document.addEventListener("click", function(e: MouseEvent){
            if (!submitBtn.current?.contains(e.target as Node)){
                setAlertMessage([alertMessage[0], alertMessage[1], false, "success"])
            }
        })
    }, [])

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