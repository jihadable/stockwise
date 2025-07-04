import { useContext } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Stats from "../components/Stats";
import { AuthContext } from "../contexts/AuthContext";
import "../style/Dashboard.css";
import NotFound from "./NotFound";

export default function Dashboard(){

    const { isLogin } = useContext(AuthContext)

    if (isLogin === false){
        return <NotFound />
    }

    if (isLogin === true){
        document.title = "StockWise | Dashboard"
    
        return (
            <section className="dashboard">
                <Navbar page="Dashboard" />
                <article className="content">
                    <Header />
                    <Stats />
                    <Products />
                </article>
            </section>
        )
    }

    return null
}