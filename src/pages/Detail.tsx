import { IconArrowLeft, IconEdit, IconPhotoX, IconTrash } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import InventoryStats from "../components/Stats";
import { AuthContext, ItemType } from "../contexts/AuthContext";
import "../style/Detail.css";

export default function Detail(){

    document.title = "StockWise | Item detail"

    const { items, token, refreshData } = useContext(AuthContext)

    const { slug } = useParams<{ slug: string }>()

    const [item, setItem] = useState<ItemType | null>(null)

    const storageEndpoint = import.meta.env.VITE_STORAGE_ENDPOINT

    useEffect(() => {
        if (items){
            const detailItem: ItemType = items.filter(item => item.slug == slug)[0]
    
            setItem(detailItem)
        }
    }, [slug, items])

    const navigate = useNavigate()

    const handleDelete = async() => {
        if (confirm("Are You sure to delete this item?")){
            const apiEndpoint = import.meta.env.VITE_API_ENDPOINT

            const response = await fetch(`${apiEndpoint}/items/${item?.id}`, {
                method: "delete",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            const data = await response.json()

            if (data.status){
                refreshData()
                toast.success("Item deleted")
                navigate("/dashboard")
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
                        <span>Back to dashboard</span>
                    </Link>
                    <div className="detail-header">Item detail</div>
                    <div className="actions">
                        <Link to={`/edit/${slug}`} className="edit-btn">
                            <IconEdit stroke={1.5} />
                            <span>Edit</span>
                        </Link>
                        <div className="delete-btn" onClick={handleDelete}>
                            <IconTrash stroke={1.5} />
                            <span>Delete</span>
                        </div>
                    </div>
                    <div className="detail-content">
                        <div className="img">
                            {item?.image &&
                            <img src={`${storageEndpoint}/${item?.image}`} alt="Image Preview" />}
                            {!item?.image && 
                            <div className="no-img">
                                <IconPhotoX stroke={1.5} />
                                <p>No image added</p>
                            </div>}
                        </div>
                        <div className="info">
                            <div className="item">
                                <div className="label">
                                    <div className="circle"></div>
                                    <span>Time Stamp</span>
                                </div>
                                <div className="value">
                                    <div className="created">Created at: {item?.created_at}</div>
                                    <div className="updated">Last updated at: {item?.updated_at}</div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="label">
                                    <div className="circle"></div>
                                    <span>Name</span>
                                </div>
                                <div className="value">{item?.name}</div>
                            </div>
                            <div className="item">
                                <div className="label">
                                    <div className="circle"></div>
                                    <span>Category</span>
                                </div>
                                <div className="value">{item?.category}</div>
                            </div>
                            <div className="item">
                                <div className="label">
                                    <div className="circle"></div>
                                    <span>Price</span>
                                </div>
                                <div className="value">${item?.price}</div>
                            </div>
                            <div className="item">
                                <div className="label">
                                    <div className="circle"></div>
                                    <span>Quantity</span>
                                </div>
                                <div className="value">{item?.quantity}</div>
                            </div>
                            <div className="item">
                                <div className="label">
                                    <div className="circle"></div>
                                    <span>Description</span>
                                </div>
                                <div className="value" dangerouslySetInnerHTML={{__html: item?.description ?? ""}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}