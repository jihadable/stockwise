import { Link } from "react-router-dom"
import Header from "../components/Header"
import Navbar from "../components/Navbar"
import { item } from "../components/itemType"
import "../style/Edit.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Edit(props: any){

    const navigate = useNavigate()

    const items: item[] = props.items
    const editItem: item = props.editItem

    const setItems = props.setItems

    const [
        id,
        [name, setName],
        [category, setCategory],
        [price, setPrice],
        [quantity, setQuantity],
        [desc, setDesc]
    ] = [
        editItem?.id,
        useState(editItem?.name),
        useState(editItem?.category),
        useState(editItem?.price),
        useState(editItem?.quantity),
        useState(editItem?.desc)
    ]

    function handleSave(): void {

        if (name === "" || category === "" || isNaN(price) || isNaN(quantity) || desc === ""){
            alert("Please fill the empty field")
            
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

        navigate("/")

        alert("Item edited")
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

    return (
        <div className="edit">
            <Navbar page="Dashboard" />
            <div className="content">
                <Header />
                <div className="edit-container">
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
                            <Link to={"/"} className="cancel">Cancel</Link>
                            <div className="save" onClick={() => {handleSave()}}>Save changes</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}