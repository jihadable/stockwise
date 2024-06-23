import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthFrovider from "./contexts/AuthContext";
import ProductProvider from "./contexts/ProductContext";
import Account from "./pages/Account";
import AddProduct from "./pages/AddProduct";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";

export default function Router(){

    if (!localStorage.getItem("navbar")){
        localStorage.setItem("navbar", JSON.stringify(false))
    }

    return (
        <BrowserRouter>
            <AuthFrovider>
            <ProductProvider>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register"  element={<Register />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/add-product" element={<AddProduct />}></Route>
                <Route path="/account" element={<Account  />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/detail/:slug" element={<Detail />}></Route>
                <Route path="/edit/:slug" element={<Edit />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
            </ProductProvider>
            </AuthFrovider>
        </BrowserRouter>
    )
}