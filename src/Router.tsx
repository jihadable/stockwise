import { BrowserRouter, Routes, Route, json } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import Account from "./pages/Account";
import Contact from "./pages/Contact";
import { useState } from "react";

export default function Router(){

    if (!localStorage.getItem("navbar")){
        localStorage.setItem("navbar", JSON.stringify(true))
    }

    const [items, setItems] = useState([])
    if (!localStorage.getItem("items")){
        localStorage.setItem("items", JSON.stringify([]))

        setItems(JSON.parse(localStorage.getItem("items")!))
    }
    
    if (!localStorage.getItem("idNow")){
        localStorage.setItem("idNow", JSON.stringify(items.length + 1))
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />}></Route>
                <Route path="/add-product" element={<AddProduct />}></Route>
                <Route path="/account" element={<Account />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
            </Routes>
        </BrowserRouter>
    )
}