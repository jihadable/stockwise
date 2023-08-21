import { ReactElement } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

export default function ProductDetail(props: {id: number}): ReactElement{

    const id: number = props.id

    type item = {
        id: number,
        name: string,
        category: string,
        price: number,
        quantity: number,
        desc: string
    }

    const item = JSON.parse(localStorage.getItem("items")!).filter((item: item) => item.id === id)[0]
    const showItem = [
        {
            title: "Name",
            value: item.name
        },
        {
            title: "Category",
            value: item.category
        },
        {
            title: "Price",
            value: `$${item.price}`
        },
        {
            title: "Quantity",
            value: item.quantity
        },
        {
            title: "Description",
            value: item.desc
        }
    ]

    return (
        <div className="product-detail">
            <Navbar page="ProductDetail" />
            <div className="content">
                <Header />
                <div className="detail">
                    <div className="detail-header">Product Detail</div>
                    <div className="detail-content">
                    {
                        showItem.map((item, index: number) => {
                            return (
                                <div className="item" key={index}>
                                    <div className="label">{item.title}</div>
                                    <div className="value">{item.value}</div>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}