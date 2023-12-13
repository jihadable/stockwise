import "../style/Home.css"
import { Link } from "react-router-dom";
import logo from "../assets/icon.png"

export default function Home(){

    document.title = "Stockwise"

    return (
        <div className="home">
            <div className="logo">
                <img src={logo} alt="Logo" />
                <h1>Stockwise</h1>
            </div>
            <div className="home-content">
                <h2>Inventory & Stock Management Solution</h2>
                <div>Inventory system to control and manage proucts in the warehouse in real time and integrated to make it easier to develop your business.</div>
                <div className="btns">
                    <Link to={"/register"}>Register</Link>
                    <Link to={"/login"}>Login</Link>
                </div>
            </div>
            <p className="footer">Copyright ©️ 2023 | Umar Jihad</p>
        </div>
    )
}