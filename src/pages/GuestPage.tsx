import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function GuestPage(){

    const { isAuth } = useContext(AuthContext)

    if (isAuth === false) return <Outlet />
    if (isAuth === true) return <Navigate to={"/dashboard"} />
    else return null
}