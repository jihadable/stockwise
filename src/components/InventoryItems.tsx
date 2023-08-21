import { ReactElement, useEffect, useState, useRef } from "react";
import "../style/InventoryItems.css"

export default function InventoryItems(): ReactElement {

    type item = {
        id: number,
        name: string,
        category: string,
        price: number,
        quantity: number,
        desc: string
    }

    const [items, setItems] = useState(JSON.parse(localStorage.getItem("items")!))

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items))
    }, [items])

    const handleDelete = (id: number):void => {
        if (confirm("Are You sure to delete this item?")){
            setItems((items: item[]) => items.filter((object: item) => object.id !== id))
        }
    }

    const [sortingValue, setSortingValue] = useState("Sort by")
    const sortingItems = ["Alphabet", "Lowest price", "Lowest quantity", "Lowest value"]
    const [showSortingMenu, setShowSortingMenu] = useState(false)
    const [sortingBtn, sortingMenu] = [useRef<HTMLDivElement | null>(null), useRef<HTMLDivElement | null>(null)]

    useEffect(() => {
        const handleClick = (e: Event): void => {
            
            const target = e.target as Node

            if (sortingBtn.current && sortingMenu.current){
                if (!sortingBtn.current.contains(target)){
                    setShowSortingMenu(false)
                }
            }
        }

        document.addEventListener("click", handleClick)

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [sortingValue])

    return (
        <section className="inventory-items">
            <div className="header">
                <div className="title">Inventory Items</div>
                <div className="search">
                    <label htmlFor="search">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                            <path d="M21 21l-6 -6"></path>
                        </svg>
                    </label>
                    <input type="text" id="search" placeholder="Search item" />
                </div>
            </div>
            <div className="sort-by">
                <div className="sort-btn" onClick={() => {setShowSortingMenu(!showSortingMenu)}} ref={sortingBtn}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-sort-descending" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M4 6l9 0"></path>
                        <path d="M4 12l7 0"></path>
                        <path d="M4 18l7 0"></path>
                        <path d="M15 15l3 3l3 -3"></path>
                        <path d="M18 6l0 12"></path>
                    </svg>
                    <span>{sortingValue}</span>
                </div>
                <div className={`sort-menu ${showSortingMenu ? "active" : ""}`} ref={sortingMenu}>
                {
                    sortingItems.map((item, index) => {
                        return <div className="item" key={index} onClick={() => setSortingValue(item)}>{item}</div>
                    })
                }
                </div>
            </div>
            <div className="items-table">
                <table>
                    <thead className="table-header">
                        <tr>
                            <td>No</td>
                            <td>Name</td>
                            <td>Category</td>
                            <td>Price</td>
                            <td>Quantity</td>
                            <td>Value</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            [...items].reverse().map((item: item, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.category}</td>
                                        <td>${item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>${item.price * item.quantity}</td>
                                        <td className="actions">
                                            <div className="detail" title="Detail">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                                                    <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"></path>
                                                </svg>
                                            </div>
                                            <div className="edit" title="Edit">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                                                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                                                    <path d="M16 5l3 3"></path>
                                                </svg>
                                            </div>
                                            <div className="delete" title="Delete" onClick={() => handleDelete(item.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path d="M4 7l16 0"></path>
                                                    <path d="M10 11l0 6"></path>
                                                    <path d="M14 11l0 6"></path>
                                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                                </svg>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}