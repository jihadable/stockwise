import Navbar from "../components/Navbar";
import Header from "../components/Header";
import "../style/Dashboard.css"
import InventoryStats from "../components/InventoryStats";
import InventoryItems from "../components/InventoryItems";
import { item } from "../components/itemType";

type DashboardType = {
    items: item[],
    setItems: React.Dispatch<any>,
    currencyItems: {code: string, name: string}[],
    selectedCurrency: {code: string, name: string},
    setSelectedCurrency: React.Dispatch<any>
}

export default function Dashboard(props: DashboardType){

    const items: item[] = props.items
    const setItems = props.setItems

    const currencyItems = props.currencyItems
    const selectedCurrency = props.selectedCurrency
    const setSelectedCurrency = props.setSelectedCurrency

    return (
        <>
        <div className="dashboard">
            <Navbar page="Dashboard" />
            <div className="content">
                <Header />
                <InventoryStats items={items} selectedCurrency={selectedCurrency} />
                <InventoryItems items={items} setItems={setItems} currencyItems={currencyItems} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
            </div>
        </div>
        </>
    )
}