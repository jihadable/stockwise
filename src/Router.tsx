import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthFrovider from "./contexts/AuthContext";
import LoaderProvider from "./contexts/LoaderContext";
import ProductProvider from "./contexts/ProductContext";
import Account from "./pages/Account";
import AddProduct from "./pages/AddProduct";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import DetailProduct from "./pages/DetailProduct";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import UpdateProduct from "./pages/UpdateProduct";
import VerifyEmail from "./pages/VerifyEmail";

export default function Router(){

    if (!localStorage.getItem("navbar")){
        localStorage.setItem("navbar", JSON.stringify(false))
    }

    return (
        <BrowserRouter>
            <AuthFrovider>
            <ProductProvider>
            <LoaderProvider>
            <ToastContainer
            position="top-center"
            autoClose={750}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="colored"
            />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register"  element={<Register />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/add-product" element={<AddProduct />}></Route>
                <Route path="/account" element={<Account />}></Route>
                <Route path="/verify-email/:token" element={<VerifyEmail />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/detail-product/:id" element={<DetailProduct />}></Route>
                <Route path="/update-product/:id" element={<UpdateProduct />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
            </LoaderProvider>
            </ProductProvider>
            </AuthFrovider>
        </BrowserRouter>
    )
}