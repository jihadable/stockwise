import { ReactElement, useEffect } from "react";
import "../style/InventoryStats.css"

export default function InventoryStats(): ReactElement{

    type item = {
        id: number,
        name: string,
        category: string,
        price: number,
        quantity: number,
        desc: string
    }

    const items: item[] = JSON.parse(localStorage.getItem("items")!)

    const totalProductValue = items.length
    
    let totalStoreValue = 0
    items.forEach((item: item) => totalStoreValue += item.price * item.quantity)

    const totalCategory: number = [...new Set(items.map((item: item) => item.category))].length

    // useEffect(() => {
    //     console.log(items)   
    // })

    const inventoryStats = [
        {
            title: "Total Product",
            value: totalProductValue,
            svg: 
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                <path d="M17 17h-11v-14h-2"></path>
                <path d="M6 5l14 1l-1 7h-13"></path>
            </svg>
        },
        {
            title: "Total store value",
            value: `$${totalStoreValue}`,
            svg: 
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-coin" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                <path d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1 -1.8 -1"></path>
                <path d="M12 7v10"></path>
            </svg>
        },
        {
            title: "All categories",
            value: totalCategory,
            svg: 
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-packages" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M7 16.5l-5 -3l5 -3l5 3v5.5l-5 3z"></path>
                <path d="M2 13.5v5.5l5 3"></path>
                <path d="M7 16.545l5 -3.03"></path>
                <path d="M17 16.5l-5 -3l5 -3l5 3v5.5l-5 3z"></path>
                <path d="M12 19l5 3"></path>
                <path d="M17 16.5l5 -3"></path>
                <path d="M12 13.5v-5.5l-5 -3l5 -3l5 3v5.5"></path>
                <path d="M7 5.03v5.455"></path>
                <path d="M12 8l5 -3"></path>
            </svg>
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