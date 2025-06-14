import { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/icon.png";
import { AuthContext } from "../contexts/AuthContext";
import "../style/Home.css";

export default function Home(){

    document.title = "Stockwise"

    const { isLogin } = useContext(AuthContext)

    return (
        <div className="home">
            <div className="logo">
                <img src={logo} alt="Logo" />
                <h1>Stockwise</h1>
            </div>
            <div className="home-content">
                <h2>Inventory Management Solution</h2>
                <div>Monitor and manage warehouse products in real time and in an integrated manner, making it easier to grow your business</div>
                <div className="btns">
                {isLogin === true &&
                <Link to={"/dashboard"}>Dashboard</Link>}
                {isLogin === false &&
                <>
                <Link to={"/register"}>Register</Link>
                <Link to={"/login"}>Login</Link>
                </>}
                </div>
            </div>
            <p className="footer">Copyright ©️ 2025 | Umar Jihad</p>
        </div>
    )
}