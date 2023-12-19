import { useContext } from "react";
import { Outlet, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import NotFound from "./NotFound";

export default function VerifySlug(){

    const { slug } = useParams<{ slug: string }>()

    const { items } = useContext(AuthContext)

    if (items !== null){
        if (items.map(item => item.slug).includes(slug!) === false) return <NotFound />
        if (items.map(item => item.slug).includes(slug!)) return <Outlet />
    }
}