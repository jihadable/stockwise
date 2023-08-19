import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import Account from "./pages/Account";
import ReportBug from "./pages/ReportBug";

export default function Router(){

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />}></Route>
                <Route path="/add-product" element={<AddProduct />}></Route>
                <Route path="/account" element={<Account />}></Route>
                <Route path="/report-bug" element={<ReportBug />}></Route>
            </Routes>
        </BrowserRouter>
    )
}