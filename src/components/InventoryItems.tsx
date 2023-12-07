import { useEffect, useState, useRef } from "react";
import "../style/InventoryItems.css"
import { item } from "./itemType";
import { Link } from "react-router-dom";
import { IconDatabaseX, IconEdit, IconEye, IconSearch, IconSortDescending, IconTrash } from "@tabler/icons-react";

type InventoryItemsProps = {
    items: item[],
    setItems: React.Dispatch<React.SetStateAction<item[]>>
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

    // delete all
    const handleDeleteAll = () => {
        if (confirm("Are You sure to delete all items?")){
            setItems([])
            localStorage.setItem("idNow", JSON.stringify(1))
        }
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
    const [sortingValue, setSortingValue] = useState("Default")
    const sortingItems = ["Default", "Alphabet", "Lowest price", "Lowest quantity", "Lowest value"]
    const [showSortingMenu, setShowSortingMenu] = useState(false)
    const sortingBtn = useRef<HTMLDivElement | null>(null)

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
    const searchInput = useRef<HTMLInputElement | null>(null!)

    // show sorting menu
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {

            if (sortingBtn.current && !sortingBtn.current.contains(e.target as Node)){
                setShowSortingMenu(false)
            }
        }

        document.addEventListener("keyup", function(e: KeyboardEvent){
            if (e.key === '/' && searchInput.current){
                searchInput.current.focus()
            }
        })

        document.addEventListener("click", handleClick)
    }, [])


    return (
        <section className="inventory-items">
            <div className="header">Inventory Items</div>
            <div className="tools">
                <div className="left">
                    <div className="sort-by">
                        <div className="sort-btn" onClick={() => setShowSortingMenu(!showSortingMenu)} ref={sortingBtn}>
                            <IconSortDescending stroke={1.5} />
                            <span>{sortingValue}</span>
                        </div>
                        <div className={`sort-menu ${showSortingMenu ? "active" : ""}`}>
                        {sortingItems.map((item, index) => {
                                return <div className="item" key={index} onClick={() => setSortingValue(item)}>{item}</div>
                        })}
                        </div>
                    </div>
                    <div className="delete-all" onClick={() => {handleDeleteAll()}}>
                        <IconDatabaseX stroke={1.5} />
                        <span>Delete all</span>
                    </div>
                </div>
                <div className="search">
                    <label htmlFor="search">
                        <IconSearch stroke={1.5} />
                    </label>
                    <input type="text" id="search" placeholder="Search item" spellCheck="false" value={keyword} onChange={(e) => setKeyword(e.target.value)} ref={searchInput} />
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
                                            <Link to={`/detail/${item.id}`} className="detail" title="Detail">
                                                <IconEye stroke={1.5} />
                                            </Link>
                                            <Link to={`/edit/${item.id}`} className="edit" title="Edit">
                                                <IconEdit stroke={1.5} />
                                            </Link>
                                            <div className="delete" title="Delete" onClick={() => handleDelete(item.id)}>
                                                <IconTrash stroke={1.5} />
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