import { useEffect, useState } from "react";
import "../style/Navbar.css"
import { Link } from "react-router-dom";
import goTop from "./goTop";
import { IconLayoutDashboard, IconLayoutSidebar, IconLayoutSidebarLeftCollapse, IconMessage, IconTextPlus, IconUserCircle } from "@tabler/icons-react";

export default function Navbar(props: {page: string}){

    const page = props.page

    const links = [
        {
            title: "Dashboard",
            path: "/",
            svg: <IconLayoutDashboard stroke={1.5} />
        },
        {
            title: "Add product",
            path: "/add-product",
            svg: <IconTextPlus stroke={1.5} />
        },
        {
            title: "Account",
            path: "/account",
            svg: <IconUserCircle stroke={1.5} />
        },
        {
            title: "Contact us",
            path: "/contact",
            svg: <IconMessage stroke={1.5} />
        }
    ]

    const [showNavbar, setShowNavbar] = useState(JSON.parse(localStorage.getItem("navbar")!))

    useEffect(() => {
        localStorage.setItem("navbar", JSON.stringify(showNavbar))
    }, [showNavbar])

    return (
        <nav className={`navbar ${showNavbar ? "" : "off"}`}>
            <div className="logo" onClick={() => {showNavbar ? "" : setShowNavbar(true)}}>
                <div className="show-close-navbar-btn" onClick={() => {setShowNavbar(!showNavbar)}}>
                    <IconLayoutSidebar stroke={1.5} className="show" />
                    <IconLayoutSidebarLeftCollapse stroke={1.5} className="close" />
                </div>
                <span>
                    <p>StockWise</p>
                </span>
            </div>
            <div className="links">
            {
                links.map((link, index) => {
                    return (
                        <Link to={link.path} onClick={goTop} key={index} className={`${page === link.title ? "page" : ""}`}>
                            <div className="link-svg">
                                {link.svg}
                            </div>
                            <span>
                                <p>{link.title}</p>
                            </span>
                        </Link>
                    )
                })
            }
            </div>
        </nav>
    )
}