import { IconBell } from "@tabler/icons-react"
import "../style/Header.css"

type HeaderPropsType = {
    setIsLogin: React.Dispatch<React.SetStateAction<boolean | null>>,
    token: string | null,
    setToken: React.Dispatch<React.SetStateAction<string | null>>
}

export default function Header({ setIsLogin, token, setToken }: HeaderPropsType){

    const { name } = JSON.parse(localStorage.getItem("user")!)

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
        }
    }

    return (
        <header className="header">
            <div className="user">{name}</div>
            <div className="btns">
                <div className="notif">
                    <IconBell stroke={1.5} />
                </div>
                <button type="button" onClick={onLogout}>Log out</button>
            </div>
        </header>
    )
}