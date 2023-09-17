import { IconBell } from "@tabler/icons-react"
import "../style/Header.css"

export default function Header(){
    return (
        <header className="header">
            <div className="user">User</div>
            <div className="btns">
                <div className="notif">
                    <IconBell stroke={1.5} />
                </div>
                <button type="button">Log out</button>
            </div>
        </header>
    )
}