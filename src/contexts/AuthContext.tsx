import axios from "axios";
import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export type UserType = {
    username: string, 
    email: string,
    image: string | null,
    bio: string | null
}

export type ProductType = {
    user: UserType,
    name: string,
    slug: string,
    category: string,
    price: number,
    quantity: number,
    image: string | null,
    description: string
}

type AuthContextType = {
    auth: () => Promise<void>,
    token: string | null,
    setToken: React.Dispatch<React.SetStateAction<string | null>>,
    isLogin: boolean | null,
    setIsLogin: React.Dispatch<React.SetStateAction<boolean | null>>,
    user: UserType | null,
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>
}

export const AuthContext = createContext<AuthContextType>({
    auth: async() => {},
    token: null,
    setToken: () => {},
    isLogin: null,
    setIsLogin: () => {},
    user: null,
    setUser: () => {}
})

export default function AuthFrovider({ children }: { children: ReactNode }){
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"))
    const [isLogin, setIsLogin] = useState<boolean | null>(null)
    const [user, setUser] = useState<UserType | null>(null)

    const auth = useCallback(async() => {
        if (!token){
            localStorage.removeItem("token")

            setToken(localStorage.getItem("token"))
            setIsLogin(false)
            setUser(null)

            return
        }

        try {
            const usersAPIEndpoint = import.meta.env.VITE_USERS_API_ENDPOINT

            const { data: response } = await axios.get(usersAPIEndpoint, {
                headers: {
                    "Authorization" : "Bearer " + token
                }
            })

            setIsLogin(true)
            setUser(response.user)
        } catch (error){
            localStorage.removeItem("token")

            setToken(localStorage.getItem("token"))
            setIsLogin(false)
            setUser(null)
            
            toast.error("Session habis, silahkan login ulang")
        }
    }, [token])

    useEffect(() => {
        auth()
    }, [auth])

    return (
        <AuthContext.Provider value={{ auth, token, setToken, isLogin, setIsLogin, user, setUser }}>
            {children}
            <ToastContainer
            position="top-center"
            autoClose={750}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="colored" />
        </AuthContext.Provider>
    )
}