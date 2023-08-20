import { BrowserRouter, Routes, Route, json } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import Account from "./pages/Account";
import Contact from "./pages/Contact";

export default function Router(){

    if (!localStorage.getItem("navbar")){
        localStorage.setItem("navbar", JSON.stringify(true))
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