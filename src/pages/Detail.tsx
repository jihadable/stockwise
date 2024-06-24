import { IconArrowLeft, IconEdit, IconPhotoX, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import InventoryStats from "../components/Stats";
import { AuthContext, ProductType } from "../contexts/AuthContext";
import { ProductContext } from "../contexts/ProductContext";
import "../style/Detail.css";
import getIdCurrency from "../utils/getIdCurrency";
import NotFound from "./NotFound";

export default function Detail(){

    const { token, isLogin } = useContext(AuthContext)
    const { getAllProducts, products } = useContext(ProductContext)

    const navigate = useNavigate()
    const { slug } = useParams()

    const [product, setProduct] = useState<ProductType | null>(null)
    
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
                    const productsAPIEndpoint = import.meta.env.VITE_PRODUCTS_API_ENDPOINT

                    await axios.delete(`${productsAPIEndpoint}/${product?.slug}`, {
                        headers: {
                            "Authorization": "Bearer " + token
                        }
                    })

                    await getAllProducts()
                    toast.success("Berhasil menghapus produk")
                    navigate("/dashboard")
                } catch(error){
                    toast.error("Gagal menghapus produk")
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
                            <div className="delete-btn" onClick={handleDelete}>
                                <IconTrash stroke={1.5} />
                                <span>Hapus</span>
                            </div>
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
}