import { IconCoin, IconShoppingCart, IconTriangleSquareCircle } from "@tabler/icons-react"
import { useContext } from "react"
import { ProductContext, ProductType } from "../contexts/ProductContext"
import "../style/InventoryStats.css"
import getIdCurrency from "../utils/getIdCurrency"

export default function Stats(){

    const { products } = useContext(ProductContext)

    const totalProductValue = products ? products.length : 0
    
    let totalStoreValue = 0

    if (products){
        products.forEach((product: ProductType) => totalStoreValue += product.price * product.quantity)
    }

    const totalCategory: number = [...new Set(products?.map((product: ProductType) => product.category))].length

    const inventoryStats = [
        {
            title: "Total Produk",
            value: totalProductValue,
            svg: <IconShoppingCart stroke={1.5} />
        },
        {
            title: "Total value",
            value: getIdCurrency(products ? totalStoreValue : 0),
            svg: <IconCoin stroke={1.5} />
        },
        {
            title: "Kategori",
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