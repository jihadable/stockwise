import { IconEdit, IconEye, IconSearch, IconSortDescending, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ProductContext, ProductType } from "../contexts/ProductContext";
import "../style/Products.css";
import getIdCurrency from "../utils/getIdCurrency";
import { LoaderContext } from "../contexts/LoaderContext";
import Loader from "./Loader";

export default function Products(){

    const { products, setProducts } = useContext(ProductContext)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { setLoadingElementWidth, setLoadingElementHeight } = useContext(LoaderContext)
    const [selectedProductToDetele, setSelectedProductToDetele] = useState<string>("")

    const [filteredProducts, setFilteredProducts] = useState<ProductType[] | null>(products)

    // delete
    const handleDelete = async(event: React.MouseEvent<HTMLButtonElement>, id: string) => {
        if (confirm("Apakah Anda yakin akan menghapus produk ini?")){
            try {
                const target = event.currentTarget as HTMLButtonElement
                setIsLoading(true)
                setLoadingElementWidth(target.clientWidth)
                setLoadingElementHeight(target.clientHeight)
                setSelectedProductToDetele(id)

                const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
                const token = localStorage.getItem("token")
    
                await axios.delete(`${APIEndpoint}/api/products/${id}`, {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })

                setProducts(products => (
                    products ? products.filter(product => product.id !== id) : null
                ))
                toast.success("Successfully deleted product")
                setIsLoading(false)
            } catch(error){
                toast.error("Failed to delete product")
                setIsLoading(false)
            }
        }
    }

    // search
    const [keyword, setKeyword] = useState("")

    // sorting
    const [sortingValue, setSortingValue] = useState("Default")
    const sortingItems = ["Default", "Alphabet", "Lowest price", "Lowest quantity", "Lowest value"]
    const [showSortingMenu, setShowSortingMenu] = useState(false)
    const sortingBtn = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        let tempProducts = [...(products || [])]

        tempProducts = tempProducts.filter(product => product.name.toLowerCase().includes(keyword.toLowerCase()))

        if (sortingValue === "Alphabet") {
            tempProducts.sort((a, b) => a.name.localeCompare(b.name))
        } 
        else if (sortingValue === "Lowest price") {
            tempProducts.sort((a, b) => a.price - b.price)
        } 
        else if (sortingValue === "Lowest quantity") {
            tempProducts.sort((a, b) => a.quantity - b.quantity)
        } 
        else if (sortingValue === "Lowest value") {
            tempProducts.sort((a, b) => (a.price * a.quantity) - (b.price * b.quantity))
        }

        setFilteredProducts(tempProducts)
    }, [keyword, sortingValue, products])

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
            if (e.key === "/" && searchInput.current){
                searchInput.current.focus()
            }
        })

        document.addEventListener("click", handleClick)
    }, [])

    return (
        <section className="products">
            <p className="header">Inventory</p>
            <article className="tools">
                <div className="left">
                    <div className="sort-by">
                        <div className="sort-btn" onClick={() => setShowSortingMenu(!showSortingMenu)} ref={sortingBtn}>
                            <IconSortDescending stroke={1.5} />
                            <span>{sortingValue}</span>
                        </div>
                        <div className={`sort-menu ${showSortingMenu ? "active" : ""}`}>
                        {sortingItems.map((item, index) => (
                            <div className="item" key={index} onClick={() => setSortingValue(item)}>{item}</div>
                        ))}
                        </div>
                    </div>
                </div>
                <div className="search">
                    <label htmlFor="search">
                        <IconSearch stroke={1.5} />
                    </label>
                    <input type="search" id="search" placeholder="Search" spellCheck="false" value={keyword} onChange={(e) => setKeyword(e.target.value)} ref={searchInput} />
                </div>
            </article>
            <article className="products-table">
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
                    {filteredProducts !== null &&
                    filteredProducts.map((product: ProductType, index: number) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{getIdCurrency(product.price)}</td>
                            <td>{product.quantity}</td>
                            <td>{getIdCurrency(product.price * product.quantity)}</td>
                            <td className="actions">
                                <Link to={`/detail-product/${product.id}`} className="detail" title="Detail">
                                    <IconEye stroke={1.5} />
                                </Link>
                                <Link to={`/update-product/${product.id}`} className="edit" title="Edit">
                                    <IconEdit stroke={1.5} />
                                </Link>
                                {isLoading && selectedProductToDetele === product.id ?
                                <Loader /> :
                                <button type="button" className="delete" title="Delete" onClick={event => handleDelete(event, product.id)}>
                                    <IconTrash stroke={1.5} />
                                </button>}
                            </td>
                        </tr>      
                    ))}
                    </tbody>
                </table>
            </article>
        </section>
    )
}