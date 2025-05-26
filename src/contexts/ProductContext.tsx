import axios from "axios"
import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { AuthContext, UserType } from "./AuthContext"

export type ProductType = {
    id: string,
    user: UserType,
    name: string,
    category: string,
    price: number,
    quantity: number,
    image: string | null,
    description: string,
    created_at: string,
    updated_at: string
}

type ProductContextType = {
    products: ProductType[] | null,
    setProducts: React.Dispatch<React.SetStateAction<ProductType[] | null>>
}

export const ProductContext = createContext<ProductContextType>({
    products: null,
    setProducts: () => {}
})

export default function ProductProvider({ children }: { children: ReactNode }){
    const [products, setProducts] = useState<ProductType[] | null>(null)
    const { isLogin } = useContext(AuthContext)

    useEffect(() => {
        const getAllProducts = async() => {
            if (!isLogin){
                return
            } 
    
            try {
                const APIEndpoint = import.meta.env.VITE_API_ENDPOINT
                const token = localStorage.getItem("token")
    
                const { data } = await axios.get(`${APIEndpoint}/api/products`, {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })
    
                setProducts(data.data.products)
            } catch(error){
                console.log(error)
            }
        }
        
        getAllProducts()
    }, [isLogin])

    return (
        <ProductContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductContext.Provider>
    )
}