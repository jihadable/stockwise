import { useEffect, useState } from "react";
import "../style/Navbar.css"

export default function Navbar(props: {page: string}): JSX.Element {

    const page = props.page

    const links = [
        {
            title: "Dashboard",
            path: "/",
            svg: 
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-layout-dashboard" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M4 4h6v8h-6z"></path>
                <path d="M4 16h6v4h-6z"></path>
                <path d="M14 12h6v8h-6z"></path>
                <path d="M14 4h6v4h-6z"></path>
            </svg>
        },
        {
            title: "Add product",
            path: "/add-product",
            svg: 
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-text-plus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M19 10h-14"></path>
                <path d="M5 6h14"></path>
                <path d="M14 14h-9"></path>
                <path d="M5 18h6"></path>
                <path d="M18 15v6"></path>
                <path d="M15 18h6"></path>
            </svg>
        },
        {
            title: "Account",
            path: "/account",
            svg: 
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-circle" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
            </svg>
        },
        {
            title: "Contact us",
            path: "/contact",
            svg: 
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-message" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M8 9h8"></path>
                <path d="M8 13h6"></path>
                <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z"></path>
            </svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-layout-sidebar show" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                        <path d="M9 4l0 16"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-layout-sidebar-left-collapse close" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                        <path d="M9 4v16"></path>
                        <path d="M15 10l-2 2l2 2"></path>
                    </svg>
                </div>
                <span>
                    <p>StockWise</p>
                </span>
            </div>
            <div className="links">
            {
                links.map((link, index) => {
                    return (
                        <a href={link.path} key={index} className={`${page === link.title ? "page" : ""}`}>
                            <div className="link-svg">
                                {link.svg}
                            </div>
                            <span>
                                <p>{link.title}</p>
                            </span>
                        </a>
                    )
                })
            }
            </div>
        </nav>
    )
}