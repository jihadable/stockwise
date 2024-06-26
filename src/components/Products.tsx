import { IconEdit, IconEye, IconSearch, IconSortDescending, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import { ProductContext, ProductType } from "../contexts/ProductContext";
import "../style/Products.css";
import getIdCurrency from "../utils/getIdCurrency";

export default function Products(){

    const { token } = useContext(AuthContext)
    const { getAllProducts, products } = useContext(ProductContext)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [selectedSlugToDetele, setSelectedSlugToDetele] = useState<string>("")

    const [filteredProducts, setFilteredProducts] = useState<ProductType[] | null>(products)

    // delete
    const handleDelete = async(slug: string) => {
        if (confirm("Apakah Anda yakin akan menghapus produk ini?")){
            try {
                setIsLoading(true)
                setSelectedSlugToDetele(slug)

                const productsAPIEndpoint = import.meta.env.VITE_PRODUCTS_API_ENDPOINT
    
                await axios.delete(
                    `${productsAPIEndpoint}/${slug}`,
                    {
                        headers: {
                            "Authorization": "Bearer " + token
                        }
                    }
                )

                await getAllProducts()
                toast.success("Berhasil menghapus produk")

                setIsLoading(false)
            } catch(error){
                toast.error("Gagal menghapus produk")
                setIsLoading(false)
            }
        }
    }

    // search
    const [keyword, setKeyword] = useState("")

    // sorting
    const [sortingValue, setSortingValue] = useState("Default")
    const sortingItems = ["Default", "Abjad", "Harga termurah", "Kuantitas terendah", "Value terendah"]
    const [showSortingMenu, setShowSortingMenu] = useState(false)
    const sortingBtn = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        let tempProducts = [...(products || [])]

        tempProducts = tempProducts.filter(product => product.name.toLowerCase().includes(keyword.toLowerCase()))

        if (sortingValue === "Abjad") {
            tempProducts.sort((a, b) => a.name.localeCompare(b.name))
        } 
        else if (sortingValue === "Harga termurah") {
            tempProducts.sort((a, b) => a.price - b.price)
        } 
        else if (sortingValue === "Kuantitas terendah") {
            tempProducts.sort((a, b) => a.quantity - b.quantity)
        } 
        else if (sortingValue === "Value terendah") {
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
            <div className="header">Inventory</div>
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
                </div>
                <div className="search">
                    <label htmlFor="search">
                        <IconSearch stroke={1.5} />
                    </label>
                    <input type="text" id="search" placeholder="Cari produk" spellCheck="false" value={keyword} onChange={(e) => setKeyword(e.target.value)} ref={searchInput} />
                </div>
            </div>
            <div className="products-table">
                <table>
                    <thead className="table-header">
                        <tr>
                            <td>No</td>
                            <td>Nama</td>
                            <td>Kategori</td>
                            <td>Harga</td>
                            <td>Kuantitas</td>
                            <td>Value</td>
                            <td>Aksi</td>
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
                                    {
                                        isLoading && selectedSlugToDetele === product.slug ?
                                        <div className="loader">
                                            <div className="custom-loader"></div>
                                        </div> :
                                        <button type="button" className="delete" title="Delete" onClick={() => handleDelete(product.slug)}>
                                            <IconTrash stroke={1.5} />
                                        </button>
                                    }
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