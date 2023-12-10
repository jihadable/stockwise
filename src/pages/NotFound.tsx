import { Link } from "react-router-dom"
import "../style/NotFound.css"

export default function NotFound(){

    document.title = "StockWise | Not Found"

    return (
        <div className="not-found-container">
            <div className="not-found">
                <div className="title">404</div>
                <div className="oops">Oops! Page not found</div>
                <p>The page you were looking for doesn't exist. You may have mistyped the address or the page may have moved.</p>
                <Link to={"/"}>Back to Home</Link>
            </div>
        </div>
    )
}