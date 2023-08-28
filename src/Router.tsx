import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import Account from "./pages/Account";
import Contact from "./pages/Contact";
import { useEffect, useState } from "react";
import { item } from "./components/itemType";

export default function Router(){

    if (!localStorage.getItem("navbar")){
        localStorage.setItem("navbar", JSON.stringify(false))
    }

    if (!localStorage.getItem("items")){
        localStorage.setItem("items", JSON.stringify([]))
    }
    
    const [items, setItems] = useState(JSON.parse(localStorage.getItem("items")!))

    let idNow: any = items.map((item: item) => item.id)
    idNow = idNow.length >= 1 ? idNow[idNow.length - 1] + 1 : 1

    if (!localStorage.getItem("idNow")){
        localStorage.setItem("idNow", JSON.stringify(idNow))
    }

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items))
    }, [items])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard items={items} setItems={setItems} />}></Route>
                <Route path="/add-product" element={<AddProduct setItems={setItems} />}></Route>
                <Route path="/account" element={<Account />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
            </Routes>
        </BrowserRouter>
    )
}