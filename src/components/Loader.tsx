import { useContext } from "react"
import { LoaderContext } from "../contexts/LoaderContext"

export default function Loader(){
    const { loadingElementWidth, loadingElementHeight } = useContext(LoaderContext)

    return (
        <div className="loader" style={{ width: `${loadingElementWidth}px`, height: `${loadingElementHeight}px` }}>
            <div className="custom-loader"></div>
        </div>
    )
}