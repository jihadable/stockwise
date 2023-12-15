import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function GuestPage(){

    const { isLogin } = useContext(AuthContext)

    return (!isLogin && !localStorage.getItem("token")) ? <Outlet /> : <Navigate to={"/dashboard"} />
}