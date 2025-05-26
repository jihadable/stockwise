import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import "../style/Header.css"
import goTop from "../utils/goTop"

export default function Header(){

    const navigate = useNavigate()

    const { setIsLogin, user, setUser } = useContext(AuthContext)

    const handleLogout = () => {
        localStorage.removeItem("token")
        setIsLogin(false)
        setUser(null)

        navigate("/")

        goTop()
    }

    return (
        <header className="header">
            <p className="user">{user?.username}</p>
            <button type="button" onClick={handleLogout}>Log out</button>
        </header>
    )
}