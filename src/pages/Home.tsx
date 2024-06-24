import { Link } from "react-router-dom";
import logo from "../assets/icon.png";
import "../style/Home.css";

export default function Home(){

    document.title = "Stockwise"

    return (
        <div className="home">
            <div className="logo">
                <img src={logo} alt="Logo" />
                <h1>Stockwise</h1>
            </div>
            <div className="home-content">
                <h2>Solusi Manajemen Inventaris</h2>
                <div>Sistem inventory untuk mengontrol dan mengelola produk di gudang secara real time dan terintegrasi untuk memudahkan pengembangan bisnis Anda.</div>
                <div className="btns">
                    <Link to={"/register"}>Register</Link>
                    <Link to={"/login"}>Login</Link>
                </div>
            </div>
            <p className="footer">Copyright ©️ 2024 | Umar Jihad</p>
        </div>
    )
}