import { Link } from "react-router-dom";
import Header from "../components/Header";
import InventoryStats from "../components/InventoryStats";
import Navbar from "../components/Navbar";
import "../style/Detail.css"
import { IconArrowLeft, IconPhotoX } from "@tabler/icons-react";
import { ItemType } from "../contexts/AuthContext";

type DetailType = {
    detailItem: ItemType
}

export default function Detail({ detailItem }: DetailType){

    document.title = "StockWise | Item detail"

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
                            {/* {detailItem.image &&
                            <img src={detailItem.image} alt="Image Preview" />}
                            {!detailItem.image && */}
                            <div className="no-img">
                                <IconPhotoX stroke={1.5} />
                                <p>No image added</p>
                            </div>
                        </div>
                        <div className="info">
                            <div className="item">
                                <div className="label">
                                    <div className="circle"></div>
                                    <span>Time Stamp</span>
                                </div>
                                <div className="value">
                                    <div className="created">Created at: {detailItem.created_at}</div>
                                    <div className="updated">Last updated at: {detailItem.updated_at}</div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="label">
                                    <div className="circle"></div>
                                    <span>Name</span>
                                </div>
                                <div className="value">{detailItem.name}</div>
                            </div>
                            <div className="item">
                                <div className="label">
                                    <div className="circle"></div>
                                    <span>Category</span>
                                </div>
                                <div className="value">{detailItem.category}</div>
                            </div>
                            <div className="item">
                                <div className="label">
                                    <div className="circle"></div>
                                    <span>Price</span>
                                </div>
                                <div className="value">${detailItem.price}</div>
                            </div>
                            <div className="item">
                                <div className="label">
                                    <div className="circle"></div>
                                    <span>Quantity</span>
                                </div>
                                <div className="value">{detailItem.quantity}</div>
                            </div>
                            <div className="item">
                                <div className="label">
                                    <div className="circle"></div>
                                    <span>Description</span>
                                </div>
                                <div className="value" dangerouslySetInnerHTML={{__html: detailItem.description}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}