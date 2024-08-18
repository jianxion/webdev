import React, { useContext, useEffect, useState } from 'react'
import './List.css'
import { Link } from 'react-router-dom'
import { ProductContext } from './ProductContext'

const List = () => {
    const [items, setItems] = useState([])
    const {setSelectedProduct} = useContext(ProductContext)

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json => {setItems(json)})
    }, [])

  return (
    <div>
        <h1>Our New Products</h1>

        <ul>
            {
                items.map((item) => {
                    return (
                        <li key={item.id} onClick={() => setSelectedProduct(item)}>
                            <Link to='/singlepage'>
                                <img src={item.image} />
                                <h2>{item.title}</h2>
                                <p><strong>{item.price}</strong></p>
                            </Link>
                        </li>
                    )
                })
            }
          
        </ul>

    </div>

  )
}

export default List