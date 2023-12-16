import { IconCoin, IconShoppingCart, IconTriangleSquareCircle } from "@tabler/icons-react"
import "../style/InventoryStats.css"
import { useContext } from "react"
import { AuthContext, ItemType } from "../contexts/AuthContext"

export default function InventoryStats(){

    const { items } = useContext(AuthContext)

    const totalProductValue = items ? items.length : 0
    
    let totalStoreValue = 0
    if (items){
        items.forEach((item: ItemType) => totalStoreValue += item.price * item.quantity)
    }

    const totalCategory: number = [...new Set(items?.map((item: ItemType) => item.category))].length

    const inventoryStats = [
        {
            title: "Total Product",
            value: totalProductValue,
            svg: <IconShoppingCart stroke={1.5} />
        },
        {
            title: "Total store value",
            value: `$${items ? totalProductValue : 0}`,
            svg: <IconCoin stroke={1.5} />
        },
        {
            title: "All categories",
            value: totalCategory,
            svg: <IconTriangleSquareCircle stroke={1.5} />
        }
    ]

    return (
        <section className="inventory-stats">
        {
            inventoryStats.map((item, index) => {
                return (
                    <div className="item" key={index}>
                        {item.svg}
                        <div className="info">
                            <div className="title">{item.title}</div>
                            <div className="value">{item.value}</div>
                        </div>
                    </div>
                )
            })
        }
        </section>
    )
}