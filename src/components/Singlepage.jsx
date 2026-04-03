import React from 'react'
import './Singlepage.css'
import { useSelector, useDispatch } from 'react-redux'

const Singlepage = ({selectedProduct}) => {
    const dispatch = useDispatch();

    const handleAddToCart = item => {
        dispatch({type: 'ADD_TO_CART', payload: item});
    }

    return (
        <div className="singlepage-container">
            <h2 className="product-title">{selectedProduct.title}</h2>
            <img className="product-image" src={selectedProduct.image} alt={selectedProduct.title} />
            <button className="add-to-cart-button" onClick={() => handleAddToCart(selectedProduct)}>Add to Cart</button>
        </div>
    )
}

export default Singlepage