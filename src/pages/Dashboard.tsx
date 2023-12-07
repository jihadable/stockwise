import Navbar from "../components/Navbar";
import Header from "../components/Header";
import "../style/Dashboard.css"
import InventoryStats from "../components/InventoryStats";
import InventoryItems from "../components/InventoryItems";
import { item } from "../components/itemType";

type DashboardType = {
    items: item[],
    setItems: React.Dispatch<React.SetStateAction<item[]>>
}

export default function Dashboard(props: DashboardType){

    const items: item[] = props.items
    const setItems = props.setItems

    return (
        <div className="dashboard">
            <Navbar page="Dashboard" />
            <div className="content">
                <Header />
                <InventoryStats items={items} />
                <InventoryItems items={items} setItems={setItems} />
            </div>
        </div>
    )
}