import "../style/ProductDetail.css"

type ProductDetailProps = {
    productDetail: any,
    setShowProductDetail: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ProductDetail(props: ProductDetailProps){

    const product = props.productDetail
    const setShowProductDetail = props.setShowProductDetail

    return (
        <div className="product-detail">
            <div className="back" onClick={() => {setShowProductDetail(false)}}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l14 0"></path>
                    <path d="M5 12l6 6"></path>
                    <path d="M5 12l6 -6"></path>
                </svg>
                <span>Back to dashboard</span>
            </div>
            <div className="detail-header">Product detail</div>
            <div className="detail-content">
                <div className="name-category">
                    <div className="item">
                        <div className="label">
                            <div className="circle"></div>
                            <span>Name</span>
                        </div>
                        <div className="value">{product.name}</div>
                    </div>
                    <div className="item">
                        <div className="label">
                            <div className="circle"></div>
                            <span>Category</span>
                        </div>
                        <div className="value">{product.category}</div>
                    </div>
                </div>
                <div className="price-quantity">
                    <div className="item">
                        <div className="label">
                            <div className="circle"></div>
                            <span>Price</span>
                        </div>
                        <div className="value">${product.price}</div>
                    </div>
                    <div className="item">
                        <div className="label">
                            <div className="circle"></div>
                            <span>Quantity</span>
                        </div>
                        <div className="value">{product.quantity}</div>
                    </div>
                </div>
                <div className="item desc">
                    <div className="label">
                        <div className="circle"></div>
                        <span>Description</span>
                    </div>
                    <div className="value">{product.desc}</div>
                </div>
            </div>
        </div>
    )
}