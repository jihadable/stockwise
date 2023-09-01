import { useEffect, useState, useRef } from "react";
import "../style/InventoryItems.css"
import { item } from "./itemType";

type InventoryItemsProps = {
    items: item[],
    setItems: React.Dispatch<any>,
    setProductDetail: React.Dispatch<React.SetStateAction<any>>,
    setShowProductDetail: React.Dispatch<React.SetStateAction<boolean>>,
    setProductEdit: React.Dispatch<React.SetStateAction<any>>,
    setShowProductEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export default function InventoryItems(props: InventoryItemsProps){

    const items = props.items
    const setItems = props.setItems

    let showItems: item[] = [...items].reverse()

    // delete
    const handleDelete = (id: number):void => {
        if (confirm("Are You sure to delete this item?")){
            setItems((items: item[]) => items.filter((object: item) => object.id !== id))
        }
    }

    // set product to show the detail
    const setProductDetail = props.setProductDetail
    const setShowProductDetail = props.setShowProductDetail

    function handleDetail(item: item): void {
        setProductDetail(item)
        setShowProductDetail(true)
    }

    // set product to edit
    const setProductEdit = props.setProductEdit
    const setShowProductEdit = props.setShowProductEdit

    function handleEdit(item: item): void {
        setProductEdit(item)
        setShowProductEdit(true)
    }

    // search
    const [keyword, setKeyword] = useState("")
    
    if (keyword !== ""){
        showItems = searchItem([...items].reverse(), keyword)
    }

    function searchItem(array: item[], keyword: string){
        const filteredArray = array.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()));

        return filteredArray;
    }

    // sorting
    const [sortingValue, setSortingValue] = useState("Sort by")
    const sortingItems = ["Alphabet", "Lowest price", "Lowest quantity", "Lowest value"]
    const [showSortingMenu, setShowSortingMenu] = useState(false)
    const sortingBtn = useRef<HTMLDivElement>(null)

    function sortAlphabet(array: item[]){
        const sortedArray = [...array];

        sortedArray.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });

        return sortedArray;
    }

    function sortPriceAndQuantity(array: item[], key: keyof item) {
        return array.sort((a, b) => {
            const valueA = a[key];
            const valueB = b[key];
        
            if (valueA < valueB) return -1;
            if (valueA > valueB) return 1;
        
            return 0;
        });
    }

    function sortValue(array: item[]) {
        return array.sort((a, b) => {
            const valueA = a.price * a.quantity;
            const valueB = b.price * b.quantity;
        
            if (valueA < valueB) return -1;
            if (valueA > valueB) return 1;
        
            return 0;
        });
    }

    if (sortingValue === "Alphabet"){
        showItems = sortAlphabet(showItems)
    }
    
    else if (sortingValue === "Lowest price"){
        showItems = sortPriceAndQuantity(showItems, "price")
    }

    else if (sortingValue === "Lowest quantity"){
        showItems = sortPriceAndQuantity(showItems, "quantity")
    }

    else if (sortingValue === "Lowest value"){
        showItems = sortValue(showItems)
    }

    // focusing search input
    const searchInput = useRef<HTMLInputElement>(null!)

    // show sorting menu
    useEffect(() => {
        const handleClick = (e: Event): void => {
            
            const target = e.target as Node

            if (!(sortingBtn.current?.contains(target))){
                setShowSortingMenu(false)
            }
        }

        document.addEventListener("keyup", function(){
            searchInput.current.focus()
        })

        document.addEventListener("click", handleClick)
    }, [])


    return (
        <section className="inventory-items">
            <div className="header">Inventory Items</div>
            <div className="tools">
                <div className="sort-by">
                    <div className="sort-btn" onClick={() => {setShowSortingMenu(!showSortingMenu)}} ref={sortingBtn}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-sort-descending" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M4 6l9 0"></path>
                            <path d="M4 12l7 0"></path>
                            <path d="M4 18l7 0"></path>
                            <path d="M15 15l3 3l3 -3"></path>
                            <path d="M18 6l0 12"></path>
                        </svg>
                        <span>{sortingValue}</span>
                    </div>
                    <div className={`sort-menu ${showSortingMenu ? "active" : ""}`}>
                    {
                        sortingItems.map((item, index) => {
                            return <div className="item" key={index} onClick={() => sortingValue === item ? setSortingValue("Sort by") : setSortingValue(item)}>{item}</div>
                        })
                    }
                    </div>
                </div>
                <div className="search">
                    <label htmlFor="search">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                            <path d="M21 21l-6 -6"></path>
                        </svg>
                    </label>
                    <input type="text" id="search" placeholder="Search item" value={keyword} onChange={(e) => setKeyword(e.target.value)} ref={searchInput} />
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
                            showItems.map((item: item, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.category}</td>
                                        <td>${item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td>${item.price * item.quantity}</td>
                                        <td className="actions">
                                            <div className="detail" title="Detail" onClick={() => {handleDetail(item)}}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                                                    <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"></path>
                                                </svg>
                                            </div>
                                            <div className="edit" title="Edit" onClick={() => {handleEdit(item)}}>
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