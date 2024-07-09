import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export type UserType = {
    username: string, 
    email: string,
    image: string | null,
    bio: string | null
}

type AuthContextType = {
    isLogin: boolean | null,
    setIsLogin: React.Dispatch<React.SetStateAction<boolean | null>>,
    user: UserType | null,
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>
}

export const AuthContext = createContext<AuthContextType>({
    isLogin: null,
    setIsLogin: () => {},
    user: null,
    setUser: () => {}
})

export default function AuthFrovider({ children }: { children: ReactNode }){
    const [isLogin, setIsLogin] = useState<boolean | null>(null)
    const [user, setUser] = useState<UserType | null>(null)

    useEffect(() => {
        const auth = async() => {
            const token = localStorage.getItem("token")
    
            if (!token){
                localStorage.removeItem("token")
    
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
    
                setIsLogin(false)
                setUser(null)
            }
        }

        auth()
    }, [])

    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin, user, setUser }}>
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