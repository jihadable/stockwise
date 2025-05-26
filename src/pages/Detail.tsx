import { IconArrowLeft, IconEdit, IconPhotoX, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import InventoryStats from "../components/Stats";
import { AuthContext } from "../contexts/AuthContext";
import { ProductContext, ProductType } from "../contexts/ProductContext";
import "../style/Detail.css";
import getIdCurrency from "../utils/getIdCurrency";
import NotFound from "./NotFound";
import { DateParser } from "../utils/dateParser";
import Loader from "../components/Loader";
import { LoaderContext } from "../contexts/LoaderContext";

export default function Detail(){

    const { isLogin } = useContext(AuthContext)
    const { setProducts } = useContext(ProductContext)

    const navigate = useNavigate()
    const { id } = useParams()

    const [product, setProduct] = useState<ProductType | null>(null)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { setLoadingElementWidth, setLoadingElementHeight } = useContext(LoaderContext)
    
    useEffect(() => {
        const getProductById = async() => {
            try {
                const token = localStorage.getItem("token")
                const APIEndpoint = import.meta.env.VITE_API_ENDPOINT

                const { data } = await axios.get(`${APIEndpoint}/api/products/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                setProduct(data.data.product)
            } catch(error){
                console.log(error)
            }
        }

        getProductById()
    }, [id])

    if (isLogin === false || product === undefined){
        return <NotFound />
    }

    if (isLogin === true && product !== undefined){
        document.title = "StockWise | Product detail"
    
        const handleDelete = async(event: React.MouseEvent<HTMLButtonElement>) => {
            if (confirm("Apakah Anda yakin akan menghapus produk ini?")){
                try {
                    const target = event.currentTarget as HTMLButtonElement
                    setIsLoading(true)
                    setLoadingElementWidth(target.clientWidth)
                    setLoadingElementHeight(target.clientHeight)

                    const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
                    const token = localStorage.getItem("token")

                    await axios.delete(`${APIEndpoint}/api/products/${id}`, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })

                    setProducts(products => (
                        products ? products.filter(product => product.id !== id) : null
                    ))
                    toast.success("Successfully deleted product")
                    navigate("/dashboard")

                    setIsLoading(false)
                } catch(error){
                    toast.error("Failed to delete product")
                    setIsLoading(false)
                }
            }
        }
    
        return (
            <section className="detail">
                <Navbar page="Dashboard" />
                <article className="content">
                    <Header />
                    <InventoryStats />
                    <article className="detail-container">
                        <Link to="/dashboard" className="back">
                            <IconArrowLeft stroke={1.5} />
                            <span>Back to dashboard</span>
                        </Link>
                        <p className="detail-header">Detail product</p>
                        <div className="actions">
                            <Link to={`/update-product/${id}`} className="edit-btn">
                                <IconEdit stroke={1.5} />
                                <span>Update</span>
                            </Link>
                            {isLoading ?
                            <Loader /> :
                            <button type="button" className="delete-btn" onClick={handleDelete}>
                                <IconTrash stroke={1.5} />
                                <span>Delete</span>
                            </button>}
                        </div>
                        <article className="detail-content">
                            <div className="img">
                                {product?.image &&
                                <img src={`${import.meta.env.VITE_IMAGE_API_ENDPOINT}/${product?.image}`} alt="Image Preview" />}
                                {!product?.image && 
                                <div className="no-img">
                                    <IconPhotoX stroke={1.5} />
                                    <p>No image added</p>
                                </div>}
                            </div>
                            <div className="info">
                                <div className="item">
                                    <div className="label">
                                        <div className="circle"></div>
                                        <span>Timestamp</span>
                                    </div>
                                    <div className="value">
                                        <p className="created">Created at: {DateParser(product?.created_at)}</p>
                                        <p className="updated">Updated at: {DateParser(product?.updated_at)}</p>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="label">
                                        <div className="circle"></div>
                                        <span>Name</span>
                                    </div>
                                    <p className="value">{product?.name}</p>
                                </div>
                                <div className="item">
                                    <div className="label">
                                        <div className="circle"></div>
                                        <span>Category</span>
                                    </div>
                                    <p className="value">{product?.category}</p>
                                </div>
                                <div className="item">
                                    <div className="label">
                                        <div className="circle"></div>
                                        <span>Price</span>
                                    </div>
                                    <p className="value">{getIdCurrency(product ? product.price : 0)}</p>
                                </div>
                                <div className="item">
                                    <div className="label">
                                        <div className="circle"></div>
                                        <span>Quantity</span>
                                    </div>
                                    <p className="value">{product?.quantity}</p>
                                </div>
                                <div className="item">
                                    <div className="label">
                                        <div className="circle"></div>
                                        <span>Description</span>
                                    </div>
                                    <p className="value" dangerouslySetInnerHTML={{__html: product?.description ?? ""}} />
                                </div>
                            </div>
                        </article>
                    </article>
                </article>
            </section>
        )
    }

    return null
}