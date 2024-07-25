import { Link } from "react-router-dom"
import "../style/NotFound.css"

export default function NotFound(){

    document.title = "StockWise | Not Found"

    return (
        <div className="not-found-container">
            <div className="not-found">
                <div className="title">404</div>
                <div className="oops">Ups! Halaman tidak ditemukan</div>
                <p>Halaman yang Anda tuju tidak ditemukan. Anda mungkin salah menulis nya atau halaman nya sudah berpindah.</p>
                <Link to={"/"}>Kembali ke Beranda</Link>
            </div>
        </div>
    )
}