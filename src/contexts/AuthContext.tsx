import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";

export type UserType = {
    username: string, 
    email: string,
    image: string | null,
    bio: string | null,
    is_email_verified: boolean
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
            const jwt = localStorage.getItem("jwt")
    
            if (!jwt){
                localStorage.removeItem("jwt")
    
                setIsLogin(false)
                setUser(null)
    
                return
            }
    
            try {
                const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
    
                const { data } = await axios.get(`${APIEndpoint}/api/users`, {
                    headers: {
                        "Authorization" : "Bearer " + jwt
                    }
                })
    
                setIsLogin(true)
                setUser(data.data.user)
            } catch (error){
                localStorage.removeItem("jwt")
    
                setIsLogin(false)
                setUser(null)
            }
        }

        auth()
    }, [])

    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}