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

export default function Detail(){

    const { isLogin } = useContext(AuthContext)
    const { products, setProducts } = useContext(ProductContext)

    const navigate = useNavigate()
    const { slug } = useParams()

    const [product, setProduct] = useState<ProductType | null>(null)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    useEffect(() => {
        if (products !== null){
            setProduct(products.filter(product => product.slug === slug)[0])
        }
    }, [slug, products])

    if (isLogin === false || (products !== null && product === undefined)){
        return <NotFound />
    }

    if (isLogin === true && products !== null && product !== undefined){
        document.title = "StockWise | Product detail"

        const storageAPIEndpoint = import.meta.env.VITE_STORAGE_API_ENDPOINT
    
        const handleDelete = async() => {
            if (confirm("Apakah Anda yakin akan menghapus produk ini?")){
                try {
                    setIsLoading(true)

                    const productsAPIEndpoint = import.meta.env.VITE_PRODUCTS_API_ENDPOINT
                    const token = localStorage.getItem("token")

                    await axios.delete(`${productsAPIEndpoint}/${product?.slug}`, {
                        headers: {
                            "Authorization": "Bearer " + token
                        }
                    })

                    if (products){
                        setProducts(products.filter(product => product.slug !== slug))
                    }
                    toast.success("Berhasil menghapus produk")
                    navigate("/dashboard")

                    setIsLoading(false)
                } catch(error){
                    toast.error("Gagal menghapus produk")
                    setIsLoading(false)
                }
            }
        }
    
        return (
            <div className="detail">
                <Navbar page="Dashboard" />
                <div className="content">
                    <Header />
                    <InventoryStats />
                    <div className="detail-container">
                        <Link to="/dashboard" className="back">
                            <IconArrowLeft stroke={1.5} />
                            <span>Kembali ke dashboard</span>
                        </Link>
                        <div className="detail-header">Detail produk</div>
                        <div className="actions">
                            <Link to={`/edit/${slug}`} className="edit-btn">
                                <IconEdit stroke={1.5} />
                                <span>Edit</span>
                            </Link>
                            {
                                isLoading ?
                                <div className="loader">
                                    <div className="custom-loader"></div>
                                </div> :
                                <div className="delete-btn" onClick={handleDelete}>
                                    <IconTrash stroke={1.5} />
                                    <span>Hapus</span>
                                </div>
                            }
                        </div>
                        <div className="detail-content">
                            <div className="img">
                                {product?.image &&
                                <img src={`${storageAPIEndpoint}/${product?.image}`} alt="Image Preview" />}
                                {!product?.image && 
                                <div className="no-img">
                                    <IconPhotoX stroke={1.5} />
                                    <p>No image added</p>
                                </div>}
                            </div>
                            <div className="info">
                                {/* <div className="item">
                                    <div className="label">
                                        <div className="circle"></div>
                                        <span>Time Stamp</span>
                                    </div>
                                    <div className="value">
                                        <div className="created">Created at: {item?.created_at}</div>
                                        <div className="updated">Last updated at: {item?.updated_at}</div>
                                    </div>
                                </div> */}
                                <div className="item">
                                    <div className="label">
                                        <div className="circle"></div>
                                        <span>Nama</span>
                                    </div>
                                    <div className="value">{product?.name}</div>
                                </div>
                                <div className="item">
                                    <div className="label">
                                        <div className="circle"></div>
                                        <span>Kategori</span>
                                    </div>
                                    <div className="value">{product?.category}</div>
                                </div>
                                <div className="item">
                                    <div className="label">
                                        <div className="circle"></div>
                                        <span>Harga</span>
                                    </div>
                                    <div className="value">{getIdCurrency(product ? product.price : 0)}</div>
                                </div>
                                <div className="item">
                                    <div className="label">
                                        <div className="circle"></div>
                                        <span>Kuantitas</span>
                                    </div>
                                    <div className="value">{product?.quantity}</div>
                                </div>
                                <div className="item">
                                    <div className="label">
                                        <div className="circle"></div>
                                        <span>Deskripsi</span>
                                    </div>
                                    <div className="value" dangerouslySetInnerHTML={{__html: product?.description ?? ""}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return null
}