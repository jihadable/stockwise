import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import "../style/Header.css"
import goTop from "../utils/goTop"

export default function Header(){

    const navigate = useNavigate()

    const { setToken, user } = useContext(AuthContext)

    const handleLogout = () => {
        localStorage.removeItem("token")
        
        setToken(localStorage.getItem("token"))

        navigate("/")

        goTop()
    }

    return (
        <header className="header">
            <div className="user">{user?.username}</div>
            <button type="button" onClick={handleLogout}>Log out</button>
        </header>
    )
}