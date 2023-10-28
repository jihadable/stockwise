import { IconCoin, IconShoppingCart, IconTriangleSquareCircle } from "@tabler/icons-react"
import "../style/InventoryStats.css"
import { item } from "./itemType"

type InventoryStatsProps = {
    items: item[], 
    selectedCurrency: {code: string, name: string}
}

export default function InventoryStats(props: InventoryStatsProps){

    // currency
    const selectedCurrency = props.selectedCurrency

    const items: item[] = props.items

    const totalProductValue = items.length
    
    let totalStoreValue = 0
    items.forEach((item: item) => totalStoreValue += item.price * item.quantity)

    const totalCategory: number = [...new Set(items.map((item: item) => item.category))].length

    const inventoryStats = [
        {
            title: "Total Product",
            value: totalProductValue,
            svg: <IconShoppingCart stroke={1.5} />
        },
        {
            title: "Total store value",
            value: `${selectedCurrency.code} ${totalStoreValue}`,
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