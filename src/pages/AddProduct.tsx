import { ReactElement } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import "../style/AddProduct.css"

export default function AddProduct(): ReactElement{
    return (
        <div className="add-product">
            <Navbar page="Add product" />
            <Header />
        </div>
    )
}