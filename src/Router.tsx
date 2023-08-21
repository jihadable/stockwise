import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import Account from "./pages/Account";
import Contact from "./pages/Contact";
// import ProductDetail from "./pages/ProductDetail";
import { useState } from "react";

// function App(){
//     console.log("hai")
//     return <h1>hai</h1>
// }

export default function Router(){

    // type item = {
    //     id: number,
    //     name: string,
    //     category: string,
    //     price: number,
    //     quantity: number,
    //     desc: string
    // }

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
                {/* <Route path="/product-detail/10" element={<ProductDetail id={10} />}></Route>
                {
                    items.map((item: item, index) => {
                        return <Route path={`/product-detail/${item.id}`} element={<ProductDetail id={item.id} />} key={index}></Route>
                    })
                } */}
            </Routes>
        </BrowserRouter>
    )
}