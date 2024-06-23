import { IconDatabaseX, IconEdit, IconEye, IconSearch, IconSortDescending, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext, ProductType } from "../contexts/AuthContext";
import { ProductContext } from "../contexts/ProductContext";
import "../style/Products.css";
import getIdCurrency from "../utils/getIdCurrency";

export default function Products(){

    const { token } = useContext(AuthContext)
    const { getAllProducts, products } = useContext(ProductContext)

    const [filteredProducts, setFilteredProducts] = useState<ProductType[] | null>(products)

    // delete
    const handleDelete = async(slug: string) => {
        if (confirm("Apakah Anda yakin akan menghapus product ini?")){
            try {
                const productsAPIEndpoint = import.meta.env.VITE_PRODUCTS_API_ENDPOINT
    
                const { data } = await axios.delete(
                    `${productsAPIEndpoint}/${slug}`,
                    {
                        headers: {
                            "Authorization": "Bearer " + token
                        }
                    }
                )
                
                console.log(data)

                getAllProducts()
                toast.success("Berhasil menghapus product")
            } catch(error){
                toast.error("Gagal menghapus product")
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
            if (e.key === '/' && searchInput.current){
                searchInput.current.focus()
            }
        })

        document.addEventListener("click", handleClick)
    }, [])

    return (
        <section className="products">
            <ToastContainer
            position="top-center"
            autoClose={750}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="colored"
            />
            <div className="header">Products</div>
            <div className="tools">
                <div className="left">
                    <div className="sort-by">
                        <div className="sort-btn" onClick={() => setShowSortingMenu(!showSortingMenu)} ref={sortingBtn}>
                            <IconSortDescending stroke={1.5} />
                            <span>{sortingValue}</span>
                        </div>
                        <div className={`sort-menu ${showSortingMenu ? "active" : ""}`}>
                        {
                            sortingItems.map((item, index) => (
                                <div className="item" key={index} onClick={() => setSortingValue(item)}>{item}</div>
                            ))
                        }
                        </div>
                    </div>
                    <div className="delete-all">
                        <IconDatabaseX stroke={1.5} />
                        <span>Delete all</span>
                    </div>
                </div>
                <div className="search">
                    <label htmlFor="search">
                        <IconSearch stroke={1.5} />
                    </label>
                    <input type="text" id="search" placeholder="Search product" spellCheck="false" value={keyword} onChange={(e) => setKeyword(e.target.value)} ref={searchInput} />
                </div>
            </div>
            <div className="products-table">
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
                        filteredProducts !== null &&
                        filteredProducts.map((product: ProductType, index: number) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{getIdCurrency(product.price)}</td>
                                <td>{product.quantity}</td>
                                <td>{getIdCurrency(product.price * product.quantity)}</td>
                                <td className="actions">
                                    <Link to={`/detail/${product.slug}`} className="detail" title="Detail">
                                        <IconEye stroke={1.5} />
                                    </Link>
                                    <Link to={`/edit/${product.slug}`} className="edit" title="Edit">
                                        <IconEdit stroke={1.5} />
                                    </Link>
                                    <div className="delete" title="Delete" onClick={() => handleDelete(product.slug)}>
                                        <IconTrash stroke={1.5} />
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </section>
    )
}