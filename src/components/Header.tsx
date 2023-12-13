import { IconBell } from "@tabler/icons-react"
import "../style/Header.css"

export default function Header({ setIsLogin }: {setIsLogin: React.Dispatch<React.SetStateAction<boolean | null>>}){

    const { name } = JSON.parse(localStorage.getItem("user")!)

    return (
        <header className="header">
            <div className="user">{name}</div>
            <div className="btns">
                <div className="notif">
                    <IconBell stroke={1.5} />
                </div>
                <button type="button" onClick={() => setIsLogin(false)}>Log out</button>
            </div>
        </header>
    )
}