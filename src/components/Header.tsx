import { IconBell } from "@tabler/icons-react"
import "../style/Header.css"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export default function Header(){

    const navigate = useNavigate()

    const { setIsLogin, token, setToken, user } = useContext(AuthContext)

    const onLogout = async() => {
        const apiEndpoint = import.meta.env.VITE_API_ENDPOINT

        const response = await fetch(`${apiEndpoint}/logout`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        const data = await response.json()

        if (data.status) {
            setIsLogin(false)
            setToken(null)
            navigate("/")
        }
    }

    return (
        <header className="header">
            <div className="user">{user?.username}</div>
            <div className="btns">
                <div className="notif">
                    <IconBell stroke={1.5} />
                </div>
                <button type="button" onClick={onLogout}>Log out</button>
            </div>
        </header>
    )
}