import { ReactNode, createContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export type UserType = {
    username: string, 
    email: string,
    bio: string | null
}

export type ItemType = {
    id: number,
    name: string,
    slug: string | "",
    category: string,
    price: number,
    quantity: number,
    image: string | null,
    description: string,
    created_at: string,
    updated_at: string
}

type AuthContextType = {
    isAuth: boolean | null,
    setIsAuth: React.Dispatch<React.SetStateAction<boolean | null>>,
    token: string | null
    setToken: React.Dispatch<React.SetStateAction<string | null>>,
    user: UserType | null,
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>,
    items: ItemType[] | null,
    setItems: React.Dispatch<React.SetStateAction<ItemType[] | null>>,
    refreshData: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
    isAuth: null,
    setIsAuth: () => {},
    token: null,
    setToken: () => {},
    user: null,
    setUser: () => {},
    items: null,
    setItems: () => {},
    refreshData: async() => {}
})

export default function AuthFrovider({ children }: { children: ReactNode }){
    const [isAuth, setIsAuth] = useState<boolean | null>(null)
    const [token, setToken] = useState<string | null>(null)

    const [user, setUser] = useState<UserType | null>(null)
    const [items, setItems] = useState<ItemType[] | null>(null)

    const refreshData = async() => {
        const storedToken = localStorage.getItem("token")

        if (storedToken) {

            const apiEndpoint = import.meta.env.VITE_API_ENDPOINT

            const response = await fetch(`${apiEndpoint}/items`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${storedToken}`
                }
            })

            const data = await response.json()

            if (data.message){
                setIsAuth(false)
                setToken(null)
                localStorage.removeItem("token")
                
                return
            }
            
            setIsAuth(true)
            setToken(storedToken)
            localStorage.setItem("token", storedToken)

            setUser(data.user)
            setItems(data.items)
        }
        else {
            setIsAuth(false)
            setToken(null)
            localStorage.removeItem("token")
        }
    }

    useEffect(() => {
        refreshData()
    }, [isAuth, token])

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, token, setToken, user, setUser, items, setItems, refreshData }}>
            {children}
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
        </AuthContext.Provider>
    )
}