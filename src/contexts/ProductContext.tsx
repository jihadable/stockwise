import axios from "axios"
import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { AuthContext, UserType } from "./AuthContext"

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
                const productsAPIEndpoint = import.meta.env.VITE_PRODUCTS_API_ENDPOINT
                const token = localStorage.getItem("token")
    
                const { data } = await axios.get(productsAPIEndpoint, {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })
    
                setProducts(data.products)
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