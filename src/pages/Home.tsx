import "../style/Home.css"
import { Link } from "react-router-dom";

export default function Home(){
    return (
        <div className="home">
            <div className="home-content">
                <h1>Inventory & Stock Management Solution</h1>
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