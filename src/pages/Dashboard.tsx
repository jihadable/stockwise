import { ReactElement, useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import "../style/Dashboard.css"
import InventoryStats from "../components/InventoryStats";
import InventoryItems from "../components/InventoryItems";

export default function Dashboard(): ReactElement{

    // const [items, setItems] = useState()

    return (
        <>
        <div className="dashboard">
            <Navbar page="Dashboard" />
            <div className="content">
                <Header />
                <InventoryStats />
                <InventoryItems />
            </div>
        </div>
        </>
    )
}