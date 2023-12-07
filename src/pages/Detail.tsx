import { Link } from "react-router-dom";
import Header from "../components/Header";
import InventoryStats from "../components/InventoryStats";
import Navbar from "../components/Navbar";
import { item } from "../components/itemType";
import "../style/Detail.css"
import { IconArrowLeft } from "@tabler/icons-react";

type DetailType = {
    detailItem: item,
    items: item[]
}

export default function Detail(props: DetailType){

    const detailItem: item = props.detailItem
    const items: item[] = props.items

    return (
        <div className="detail">
            <Navbar page="Dashboard" />
            <div className="content">
                <Header />
                <InventoryStats items={items} />
                <div className="detail-container">
                    <Link to="/dashboard" className="back">
                        <IconArrowLeft stroke={1.5} />
                        <span>Back to dashboard</span>
                    </Link>
                    <div className="detail-header">Item detail</div>
                    <div className="detail-content">
                        <div className="img">
                            <img src={detailItem.img} alt="Image Preview" />
                        </div>
                        <div className="info">
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
                                <div className="value" dangerouslySetInnerHTML={{__html: detailItem.desc}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}