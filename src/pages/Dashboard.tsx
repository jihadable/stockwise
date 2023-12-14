import Navbar from "../components/Navbar";
import Header from "../components/Header";
import "../style/Dashboard.css"
import InventoryStats from "../components/InventoryStats";
import InventoryItems from "../components/InventoryItems";
import { item } from "../components/itemType";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type DashboardType = {
    items: item[],
    setItems: React.Dispatch<React.SetStateAction<item[]>>,
    isLogin: boolean | null,
    setIsLogin: React.Dispatch<React.SetStateAction<boolean | null>>,
    token: string | null,
    setToken: React.Dispatch<React.SetStateAction<string | null>>
}

export default function Dashboard({ items, setItems, isLogin, setIsLogin, token, setToken }: DashboardType){

    document.title = "StockWise | Dashboard"

    const navigate = useNavigate()

    useEffect(() => {
        if (!isLogin) navigate("/"); return
    }, [isLogin, navigate])

    return (
        <div className="dashboard">
            <Navbar page="Dashboard" />
            <div className="content">
                <Header setIsLogin={setIsLogin} token={token} setToken={setToken} />
                <InventoryStats items={items} />
                <InventoryItems items={items} setItems={setItems} />
            </div>
        </div>
    )
}