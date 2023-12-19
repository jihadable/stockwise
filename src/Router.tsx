import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import Account from "./pages/Account";
import Contact from "./pages/Contact";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AuthPrivatePage from "./pages/AuthPrivatePage";
import GuestPage from "./pages/GuestPage";
import VerifySlug from "./pages/VerifySlug";

export default function Router(){

    if (!localStorage.getItem("navbar")){
        localStorage.setItem("navbar", JSON.stringify(false))
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<NotFound />}></Route>
                <Route path="/" element={<Home />}></Route>

                <Route element={<GuestPage />}>
                    <Route path="/login" element={<Login />}></Route>
                    
                    <Route path="/register" 
                    element={
                    <Register />
                    }></Route>
                </Route>
                
                <Route element={<AuthPrivatePage />}>
                    <Route path="/dashboard" element={<Dashboard />}></Route>

                    <Route path="/add-product" element={<AddProduct />}></Route>
                    
                    <Route path="/account" element={<Account  />}></Route>
                    
                    <Route path="/contact" element={<Contact />}></Route>

                    <Route path="/detail/:slug" element={<VerifySlug />}>
                        <Route path="/detail/:slug" element={<Detail />}></Route>
                    </Route>
                    <Route path="/edit/:slug" element={<VerifySlug />}>
                        <Route path="/edit/:slug" element={<Edit />}></Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}