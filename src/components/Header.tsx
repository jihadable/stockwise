import { ReactElement } from "react";
import "../style/Header.css"

export default function Header(): ReactElement {
    return (
        <header className="header">
            <div className="user">User</div>
            <button type="button">Log out</button>
        </header>
    )
}