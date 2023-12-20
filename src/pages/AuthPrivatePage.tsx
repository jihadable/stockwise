import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function AuthPrivatePage(){

    const { isAuth } = useContext(AuthContext)

    if (isAuth === false && isAuth !== null) return <Navigate to={"/"} />
    if (isAuth === true && isAuth !== null) return <Outlet />
    else return null
}