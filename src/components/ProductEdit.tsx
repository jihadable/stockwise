import { useEffect, useState } from "react";
import "../style/ProductEdit.css"

type item = {
    id: number,
    name: string,
    category: string,
    price: number,
    quantity: number,
    desc: string
}

type ProductEditProps = {
    alertMessage: (string | boolean | JSX.Element)[],
    setAlertMessage: React.Dispatch<React.SetStateAction<(string | boolean | JSX.Element)[]>>,
    alertSvg: JSX.Element[],
    submitBtn: React.RefObject<HTMLDivElement>,
    items: item[],
    setItems: React.Dispatch<React.SetStateAction<item[]>>,
    productEdit: item,
    setShowProductEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ProductEdit(props: ProductEditProps): JSX.Element {

    const alertMessage = props.alertMessage
    const setAlertMessage = props.setAlertMessage
    const alertSvg = props.alertSvg
    const submitBtn = props.submitBtn

    const items = props.items
    const setItems = props.setItems
    const product = props.productEdit
    const setShowProductEdit = props.setShowProductEdit

    const [
        id,
        [name, setName],
        [category, setCategory],
        [price, setPrice],
        [quantity, setQuantity],
        [desc, setDesc]
    ] = [
        product?.id,
        useState(product?.name),
        useState(product?.category),
        useState(product?.price),
        useState(product?.quantity),
        useState(product?.desc)
    ]

    function handleSave(): void {

        if (name === "" || category === "" || isNaN(price) || isNaN(quantity) || desc === ""){
            setAlertMessage([alertSvg[1], "Please fill the empty field", true, "warning"])
            return
        }

        const modifiedArray: item[] = items.map((obj: item) => {
            if (obj.id === id) {
                return {
                    ...obj,
                    name: name,
                    category: category,
                    price: price,
                    quantity: quantity,
                    desc: desc
                };
            }

            return obj;
        });

        setItems(modifiedArray)

        setAlertMessage([alertSvg[0], "Product edited", true, "success"])

        setTimeout(() => {
            setShowProductEdit(false)
        }, 100);
    }

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = 'Anda memiliki perubahan yang belum disimpan. Apakah Anda yakin ingin meninggalkan halaman ini?';
        };
      
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [])

    const handleLeaveSite = () => {
        return 'Anda akan meninggalkan situs ini. Apakah Anda yakin?';
    };

    useEffect(() => {
        window.onbeforeunload = handleLeaveSite;
    
        return () => {
            window.onbeforeunload = null;
        };
    }, []);

    useEffect(() => {
        document.addEventListener("click", function(e: Event){
            if (!submitBtn.current?.contains(e.target as Node)){
                setAlertMessage([alertSvg[0], alertMessage[1], false, "success"])
            }
        })
    }, [alertMessage])

    return (
        <div className="product-edit">
            <div className="edit-header">Edit product</div>
            <div className="edit-content">
                <div className="name-category">
                    <div className="item">
                        <div className="label">
                            <div className="circle"></div>
                            <span>Name</span>
                        </div>
                        <input type="text" id="name" name="name" autoComplete="off" className="value" value={name} onChange={(e) => {setName(e.target.value)}} />
                    </div>
                    <div className="item">
                        <div className="label">
                            <div className="circle"></div>
                            <span>Category</span>
                        </div>
                        <input type="text" id="category" name="category" className="value" value={category} onChange={(e) => {setCategory(e.target.value)}} />
                    </div>
                </div>
                <div className="price-quantity">
                    <div className="item">
                        <div className="label">
                            <div className="circle"></div>
                            <span>Price</span>
                        </div>
                        <input type="number" id="price" name="price" min={0} className="value" value={isNaN(price) ? "" : price} onChange={(e) => {setPrice(parseInt(e.target.value))}} />
                    </div>
                    <div className="item">
                        <div className="label">
                            <div className="circle"></div>
                            <span>Quantity</span>
                        </div>
                        <input type="number" id="quantity" name="quantity" className="value" value={isNaN(quantity) ? "" : quantity} onChange={(e) => {setQuantity(parseInt(e.target.value))}} />
                    </div>
                </div>
                <div className="item">
                    <div className="label">
                        <div className="circle"></div>
                        <span>Description</span>
                    </div>
                    <textarea id="desc" name="desc" className="value" value={desc} rows={7} onChange={(e) => {setDesc(e.target.value)}}></textarea>
                </div>
                <div className="btns">
                    <div className="cancel" onClick={() => {setShowProductEdit(false)}}>Cancel</div>
                    <div className="save" onClick={() => {handleSave()}} ref={submitBtn}>Save changes</div>
                </div>
            </div>
        </div>
    )
}