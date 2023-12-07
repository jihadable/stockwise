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

export default function Router(){

    if (!localStorage.getItem("navbar")){
        localStorage.setItem("navbar", JSON.stringify(false))
    }

    // items
    if (!localStorage.getItem("items")){
        localStorage.setItem("items", JSON.stringify([]))
    }
    
    const [items, setItems] = useState(JSON.parse(localStorage.getItem("items")!))

    let idNow: any = items.map((item: item) => item.id)
    idNow = idNow.length >= 1 ? idNow[idNow.length - 1] + 1 : 1

    if (!localStorage.getItem("idNow")){
        localStorage.setItem("idNow", JSON.stringify(idNow))
    }

    // currency
    if (!localStorage.getItem("currency")){
        localStorage.setItem("currency", JSON.stringify({
            code: "IDR",
            name: "Rupiah"
        }))
    }
    const currencyItems = [
        {
            code: "IDR",
            name: "Rupiah"
        },
        {
            code: "USD",
            name: "Dollar"
        },
        {
            code: "EUR",
            name: "Euro"
        },
        {
            code: "GBP",
            name: "Pound"
        },
        {
            code: "JPY",
            name: "Yen"
        },
        {
            code: "KRW",
            name: "Won"
        },
        {
            code: "RUB",
            name: "Ruble"
        },
        {
            code: "INR",
            name: "Rupee"
        }
    ]
    const [selectedCurrency, setSelectedCurrency] = useState(JSON.parse(localStorage.getItem("currency")!))

    // user data
    if (!localStorage.getItem("user")){
        localStorage.setItem("user", JSON.stringify({
            name: "User",
            email: "user@mail.com",
            phone: "081234567890",
            bio: "Lorem ipsum dolor sit amet."
        }))
    }
    
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")!))
    
    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items))
        localStorage.setItem("currency", JSON.stringify(selectedCurrency))
        localStorage.setItem("user", JSON.stringify(userData))
    }, [items, currencyItems, userData])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard items={items} setItems={setItems} currencyItems={currencyItems} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/add-product" element={<AddProduct setItems={setItems} />}></Route>
                <Route path="/account" element={<Account userData={userData} setUserData={setUserData} />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
            {
                items.map((item: item, index: number) => {
                    return <Route path={`/detail/${item.id}`} element={<Detail items={items} detailItem={item} selectedCurrency={selectedCurrency} />} key={index}></Route>
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