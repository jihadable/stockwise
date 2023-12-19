import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import InventoryStats from "../components/InventoryStats";
import Navbar from "../components/Navbar";
import "../style/Detail.css"
import { IconArrowLeft, IconPhotoX } from "@tabler/icons-react";
import { AuthContext, ItemType } from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";

export default function Detail(){

    document.title = "StockWise | Item detail"

    const { items } = useContext(AuthContext)

    const { slug } = useParams<{ slug: string }>()

    const [item, setItem] = useState<ItemType | null>(null)

    const storageEndpoint = import.meta.env.VITE_STORAGE_ENDPOINT

    useEffect(() => {
        if (items){
            const detailItem: ItemType = items.filter(item => item.slug == slug)[0]
    
            setItem(detailItem)
        }
    }, [slug, items])

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