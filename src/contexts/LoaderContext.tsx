import { ReactNode, createContext, useState } from "react"

type LoaderContextType = {
    loadingElementWidth: number | undefined,
    setLoadingElementWidth: React.Dispatch<React.SetStateAction<number | undefined>>,
    loadingElementHeight: number | undefined,
    setLoadingElementHeight: React.Dispatch<React.SetStateAction<number | undefined>>,
}

export const LoaderContext = createContext<LoaderContextType>({
    loadingElementWidth: 0,
    setLoadingElementWidth: () => {},
    loadingElementHeight: 0,
    setLoadingElementHeight: () => {}

})

export default function LoaderProvider({ children }: { children: ReactNode }){
    const [loadingElementWidth, setLoadingElementWidth] = useState<number | undefined>(0)
    const [loadingElementHeight, setLoadingElementHeight] = useState<number | undefined>(0)

    return (
        <LoaderContext.Provider value={{ loadingElementWidth, setLoadingElementWidth, loadingElementHeight, setLoadingElementHeight }}>
            {children}
        </LoaderContext.Provider>
    )
}