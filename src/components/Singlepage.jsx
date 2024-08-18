import React from 'react'
import './Singlepage.css'
import { useSelector, useDispatch } from 'react-redux'


const Singlepage = ({selectedProduct}) => {
    const dispatch = useDispatch();

    const handleAddToCart = item => {
        dispatch({type: 'ADD_TO_CART', payload: item});
    }
  return (
    <div>
        <h2>{selectedProduct.title}</h2>
        <img style={{width: '50%', height: '50%'}} src={selectedProduct.image} />
        <br />
        <button onClick={() => handleAddToCart(selectedProduct)}>Add to Cart</button>
    </div>
  )
}

export default Singlepage