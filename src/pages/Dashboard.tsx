import { ReactElement, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import "../style/Dashboard.css"
import InventoryStats from "../components/InventoryStats";
import InventoryItems from "../components/InventoryItems";

export default function Dashboard(): ReactElement{

    const [items, setItems] = useState(JSON.parse(localStorage.getItem("items")!))

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items))
    }, [items])

    return (
        <>
        <div className="dashboard">
            <Navbar page="Dashboard" />
            <div className="content">
                <Header />
                <InventoryStats items={items} />
                <InventoryItems items={items} setItems={setItems} />
            </div>
        </div>
        </>
    )
}