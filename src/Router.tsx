import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import Account from "./pages/Account";
import Contact from "./pages/Contact";
import { useEffect, useState } from "react";
import { item } from "./components/itemType";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

export type User = {
    name: string,
    email: string,
    phone: string,
    bio: string
}

export default function Router(){

    if (!localStorage.getItem("navbar")){
        localStorage.setItem("navbar", JSON.stringify(false))
    }

    // items
    if (!localStorage.getItem("items")){
        localStorage.setItem("items", JSON.stringify([]))
    }
    
    const [items, setItems] = useState<item[]>(JSON.parse(localStorage.getItem("items")!))

    const ids: number[] = items.map((item: item) => item.id)
    const idNow: number = ids.length >= 1 ? ids[ids.length - 1] + 1 : 1

    if (!localStorage.getItem("idNow")){
        localStorage.setItem("idNow", JSON.stringify(idNow))
    }

    // user data
    if (!localStorage.getItem("user")){
        localStorage.setItem("user", JSON.stringify({
            name: "User",
            email: "user@mail.com",
            phone: "081234567890",
            bio: "Lorem ipsum dolor sit amet."
        }))
    }
    
    const [userData, setUserData] = useState<User>(JSON.parse(localStorage.getItem("user")!))
    
    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items))
        localStorage.setItem("user", JSON.stringify(userData))
    }, [items, userData])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<NotFound />}></Route>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/dashboard" element={<Dashboard items={items} setItems={setItems} />}></Route>
                <Route path="/add-product" element={<AddProduct setItems={setItems} />}></Route>
                <Route path="/account" element={<Account userData={userData} setUserData={setUserData} />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
            {
                items.map((item: item, index: number) => {
                    return <Route path={`/detail/${item.id}`} element={<Detail items={items} detailItem={item} />} key={index}></Route>
                })
            }
            {
                items.map((item: item, index: number) => {
                    return <Route path={`/edit/${item.id}`} element={<Edit items={items} editItem={item} setItems={setItems} />} key={index}></Route>
                })
            }
            </Routes>
        </BrowserRouter>
    )
}