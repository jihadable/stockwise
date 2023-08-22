import { ReactElement, useEffect, useState } from "react";
import "../style/ProductEdit.css"

export default function ProductEdit(props: any): ReactElement {

    type item = {
        id: number,
        name: string,
        category: string,
        price: number,
        quantity: number,
        desc: string
    }

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
        product.id,
        useState(product.name),
        useState(product.category),
        useState(product.price),
        useState(product.quantity),
        useState(product.desc)
    ]

    function handleSave(): void {

        if (name === "" || category === "" || price === "" || quantity === "" || desc === ""){
            setAlertMessage(["", "Please enter the empty field form", true, "warning"])
            return
        }

        const modifiedArray = items.map((obj: item) => {
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
        }, 400);
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
                        <input type="text" className="value" value={name} onChange={(e) => {setName(e.target.value)}} />
                    </div>
                    <div className="item">
                        <div className="label">
                            <div className="circle"></div>
                            <span>Category</span>
                        </div>
                        <input type="text" className="value" value={category} onChange={(e) => {setCategory(e.target.value)}} />
                    </div>
                </div>
                <div className="price-quantity">
                    <div className="item">
                        <div className="label">
                            <div className="circle"></div>
                            <span>Price</span>
                        </div>
                        <input type="number" min={0} className="value" value={price} onChange={(e) => {setPrice(e.target.value)}} />
                    </div>
                    <div className="item">
                        <div className="label">
                            <div className="circle"></div>
                            <span>Quantity</span>
                        </div>
                        <input type="number" className="value" value={quantity} onChange={(e) => {setQuantity(e.target.value)}} />
                    </div>
                </div>
                <div className="item">
                    <div className="label">
                        <div className="circle"></div>
                        <span>Description</span>
                    </div>
                    <textarea className="value" rows={7} onChange={(e) => {setDesc(e.target.value)}}>{desc}</textarea>
                </div>
                <div className="btns">
                    <div className="cancel" onClick={() => {setShowProductEdit(false)}}>Cancel</div>
                    <div className="save" onClick={() => {handleSave()}} ref={submitBtn}>Save changes</div>
                </div>
            </div>
        </div>
    )
}