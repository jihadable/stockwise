import { ReactElement } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import "../style/Account.css"

export default function Account(): ReactElement{
    return (
        <div className="account">
            <Navbar page="Account" />
            <Header />
        </div>
    )
}