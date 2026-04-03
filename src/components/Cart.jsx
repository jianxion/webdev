import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

function Cart() {
    const items = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const handleRemoveFromCart = itemid => {
      dispatch({type: 'REMOVE_FROM_CART', payload: itemid});
  }
    const handleCheckout = () => {
        dispatch({type: 'CLEAR_CART'});
    }

    console.log(items)
    return (
        <div>
            you're in cart page
            <ul>
                {items.map((item) => {
                    return (
                        <li key={item.id}>
                            <img src={item.image} />
                            <p>{item.title}</p>
                            <p><strong>{item.price}</strong></p>
                            <button onClick={() => {handleRemoveFromCart(item.id)}}>Remove From Cart</button>
    
                        </li>
                    )
                })}
            </ul>
            <button onClick={handleCheckout}>Checkout</button>
            
        </div>
    )
}

export default Cart