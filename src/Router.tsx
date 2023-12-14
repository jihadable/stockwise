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
    
    const [isLogin, setIsLogin] = useState<boolean | null>(null)
    const [token, setToken] = useState<string | null>((localStorage.getItem("token")) ? localStorage.getItem("token") : null)

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items))
    }, [items])
    
    useEffect(() => {
        const checkTokenValidation = async() => {
            if (token) {
                const apiEndpoint = import.meta.env.VITE_API_ENDPOINT

                const response = await fetch(`${apiEndpoint}/items`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })

                const data = await response.json()

                if (data.message){
                    setIsLogin(null)
                    setToken(null)

                    return
                }

                setIsLogin(true)

                localStorage.setItem("token", token)
            }
            else {
                setIsLogin(null)
                setToken(null)
                localStorage.removeItem("token")
            }
        }

        checkTokenValidation()
    }, [token])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<NotFound />}></Route>
                <Route path="/" element={<Home />}></Route>

                <Route path="/login" 
                element={
                <Login 
                isLogin={isLogin} 
                setIsLogin={setIsLogin}
                setToken={setToken} />
                }></Route>
                
                <Route path="/register" 
                element={
                <Register 
                isLogin={isLogin} 
                setIsLogin={setIsLogin}
                setToken={setToken} />
                }></Route>
                
            {
                isLogin &&
                <>
                <Route path="/dashboard" 
                element={
                <Dashboard 
                items={items} 
                setItems={setItems} 
                isLogin={isLogin} 
                setIsLogin={setIsLogin}
                token={token}
                setToken={setToken} />
                }></Route>

                <Route path="/add-product" 
                element={
                <AddProduct 
                setItems={setItems}
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                token={token}
                setToken={setToken} />
                }></Route>
                
                <Route path="/account" 
                element={
                <Account 
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                token={token}
                setToken={setToken} />
                }></Route>
                
                <Route path="/contact" 
                element={
                <Contact
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                token={token}
                setToken={setToken} />
                }></Route>
                </>
            }
            
            {
                items.map((item: item, index: number) => (
                    <Route path={`/detail/${item.id}`} 
                    element={
                    <Detail 
                    items={items} 
                    detailItem={item} />} 
                    key={index}></Route>
                ))
            }
            {
                items.map((item: item, index: number) => (
                    <Route path={`/edit/${item.id}`} 
                    element={
                    <Edit 
                    items={items} 
                    editItem={item} 
                    setItems={setItems} />} 
                    key={index}></Route>
                ))
            }
            </Routes>
        </BrowserRouter>
    )
}