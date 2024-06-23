import axios from "axios"
import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react"
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
    getAllProducts: () => Promise<void>
    products: ProductType[] | null,
    setProducts: React.Dispatch<React.SetStateAction<ProductType[] | null>>
}

export const ProductContext = createContext<ProductContextType>({
    getAllProducts: async() => {},
    products: null,
    setProducts: () => {}
})

export default function ProductProvider({ children }: { children: ReactNode }){
    const [products, setProducts] = useState<ProductType[] | null>(null)
    const { token } = useContext(AuthContext)

    const getAllProducts = useCallback(async() => {
        try {
            const productsAPIEndpoint = import.meta.env.VITE_PRODUCTS_API_ENDPOINT

            const { data } = await axios.get(productsAPIEndpoint, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })

            setProducts(data.products)
        } catch(error){
            console.log(error)
        }
    }, [token])

    useEffect(() => {
        getAllProducts()
    }, [getAllProducts])

    return (
        <ProductContext.Provider value={{ getAllProducts, products, setProducts }}>
            {children}
        </ProductContext.Provider>
    )
}