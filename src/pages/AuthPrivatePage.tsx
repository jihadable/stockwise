import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function AuthPrivatePage(){

    const { isAuth } = useContext(AuthContext)

    return (isAuth || localStorage.getItem("token")) ? <Outlet /> : <Navigate to={"/"} />
}