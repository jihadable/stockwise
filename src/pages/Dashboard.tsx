import { ReactElement, useState, useEffect } from "react";
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

    return (
        <>
        <div className="dashboard">
            <Navbar page="Dashboard" />
            <div className="content">
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
                <ProductEdit items={items} setItems={setItems} productEdit={productEdit} setShowProductEdit={setShowProductEdit} />
            }
            </div>
        </div>
        </>
    )
}