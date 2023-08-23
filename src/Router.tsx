import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import Account from "./pages/Account";
import Contact from "./pages/Contact";
import { useEffect, useState } from "react";

export default function Router(){

    if (!localStorage.getItem("items")){
        localStorage.setItem("items", JSON.stringify([]))
    }
    
    const [items, setItems] = useState(JSON.parse(localStorage.getItem("items")!))

    if (!localStorage.getItem("idNow")){
        localStorage.setItem("idNow", JSON.stringify(items.length + 1))
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