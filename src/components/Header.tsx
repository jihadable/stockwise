import "../style/Header.css"

export default function Header(): JSX.Element {
    return (
        <header className="header">
            <div className="user">User</div>
            <button type="button">Log out</button>
        </header>
    )
}