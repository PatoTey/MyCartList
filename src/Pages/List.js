import React, { useEffect, useRef, useState } from "react";
import {nanoid} from "nanoid"

export default function List(){
    const [list, setList] = useState([])
    const nameRef = useRef(null)
    const firstRender = useRef(true)
    const [formData, setFormData] = useState({
        item: "",
        quantity : 0,
        price: 0
    })

    useEffect(()=>{
        const aux = localStorage.getItem("mylist")
        if(aux){
            const mylist = JSON.parse(aux)
            setList(mylist)
        }else{
            localStorage.setItem("mylist", JSON.stringify([]))
        }
    },[])

    useEffect(()=>{
        if(firstRender.current){
            firstRender.current= false
        }else {
            localStorage.setItem("mylist", JSON.stringify(list))
        }
        
    },[list])

    function handlesubmit(e) {
        e.preventDefault()
        setList((prev)=> {
           return [
                ...prev,
                formData
            ]
        })

        setFormData({
            item: "",
            quantity : 0,
            price: 0
        })
        nameRef.current.value = ""
        
    }

    function handleChange(e){
        const value = e.target.value
        setFormData((prev)=>{
            return {
                ...prev,
                [e.target.name]: value,
                id: nanoid()
            }
        })
    }

    function handleDelete(id){
        const nuevaLista = list.filter(item => item.id !==id)
        setList(nuevaLista)
    }

    const cartlist = list.map(item => {
        return (
            <div className="listItem" key={item.id}>
                <div className="listItem-data">
                    <p className="item-child">( {item.quantity} )</p>
                    <p className="item-child">{item.item}</p>
                    <p className="item-child">$ {item.price} / u</p>
                </div>
                <button className="item-btn" onClick={()=>handleDelete(item.id)} >X</button>
            </div>
        )
    })

    function getTotal(){
        const dineros = list.map(item => item.price)
        const cantidades = list.map(item => item.quantity)
        let sum = 0
        for(let i=0; i<dineros.length;i++){
            sum = sum + parseInt(dineros[i] * cantidades[i])
        }
        return sum
    }

    return (
        <main className="content">
            <form onSubmit={handlesubmit} className="form">
                <label className="form-label" htmlFor="input-item" aria-label="Enter a desired item">Item</label>
                <input className="form-input" ref={nameRef} name="item" id="input-item" type="text" value={formData.name} placeholder="Ex: 2kg Cheese" onChange={handleChange} required/>

                <label className="form-label"  htmlFor="input-quantity" aria-label="Enter a desired quantity" required>Quantity</label>
                <input className="form-input" name="quantity" id="input-quantity" type="number" value={formData.quantity} min={0} onChange={handleChange}/>

                <label className="form-label"  htmlFor="input-price" aria-label="Enter item price" required>Price</label>
                <input className="form-input" name="price" id="input-price" type="number" value={formData.price} min={0} onChange={handleChange}/>
                <button className="form-btn" type="submit" >Add item</button>
            </form>
            <div className="total">
                 Total: $ {getTotal()}
            </div>
            <div className="itemList">
                {cartlist !== "" ? cartlist : <h3>Nothing in the list!</h3>}
            </div>
        </main>
    )
}