import { Link } from "react-router-dom";
import Header from "../components/Header";
import InventoryStats from "../components/InventoryStats";
import Navbar from "../components/Navbar";
import { item } from "../components/itemType";
import "../style/Detail.css"
import { IconArrowLeft } from "@tabler/icons-react";

export default function Detail(props: any){

    const detailItem: item = props.detailItem
    const items: item[] = props.items

    return (
        <div className="detail">
            <Navbar page="Dashboard" />
            <div className="content">
                <Header />
                <InventoryStats items={items} />
                <div className="detail-container">
                    <Link to="/" className="back">
                        <IconArrowLeft stroke={1.5} />
                        <span>Back to dashboard</span>
                    </Link>
                    <div className="detail-header">Item detail</div>
                    <div className="detail-content">
                        <div className="name-category">
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
                        </div>
                        <div className="price-quantity">
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
                        </div>
                        <div className="item desc">
                            <div className="label">
                                <div className="circle"></div>
                                <span>Description</span>
                            </div>
                            <div className="value">{detailItem.desc}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}