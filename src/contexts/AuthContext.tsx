import { ReactNode, createContext, useEffect, useState } from "react";

export type UserType = {
    username: string, 
    email: string,
    image: string | null
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
    isLogin: boolean | null,
    setIsLogin: React.Dispatch<React.SetStateAction<boolean | null>>,
    token: string | null
    setToken: React.Dispatch<React.SetStateAction<string | null>>,
    user: UserType | null,
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>,
    items: ItemType[] | null,
    setItems: React.Dispatch<React.SetStateAction<ItemType[] | null>>,
    verifyToken: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
    isLogin: null,
    setIsLogin: () => {},
    token: null,
    setToken: () => {},
    user: null,
    setUser: () => {},
    items: null,
    setItems: () => {},
    verifyToken: async() => {}
})

export default function AuthFrovider({ children }: { children: ReactNode }){
    const [isLogin, setIsLogin] = useState<boolean | null>(null)
    const [token, setToken] = useState<string | null>(null)

    const [user, setUser] = useState<UserType | null>(null)
    const [items, setItems] = useState<ItemType[] | null>(null)

    const verifyToken = async() => {
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
                setIsLogin(null)
                setToken(null)
                localStorage.removeItem("token")
                
                return
            }
            
            setIsLogin(true)
            setToken(storedToken)
            localStorage.setItem("token", storedToken)

            setUser(data.user)
            setItems(data.items)
        }
        else {
            setIsLogin(null)
            setToken(null)
            localStorage.removeItem("token")
        }
    }

    useEffect(() => {
        verifyToken()
    }, [isLogin, token])

    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin, token, setToken, user, setUser, items, setItems, verifyToken }}>
            {children}
        </AuthContext.Provider>
    )
}