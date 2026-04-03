import { clearCart, removeFromCart } from './actions/cartActions';
import { useAppDispatch, useAppSelector } from './hooks';

function Cart() {
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (itemId: number) => {
    dispatch(removeFromCart(itemId));
  };

  const handleCheckout = () => {
    dispatch(clearCart());
  };

  return (
    <div>
      you're in cart page
      <ul>
        {items.map((item) => {
          return (
            <li key={item.id}>
              <img src={item.image} alt={item.title} />
              <p>{item.title}</p>
              <p>
                <strong>{item.price}</strong>
              </p>
              <button
                onClick={() => {
                  handleRemoveFromCart(item.id);
                }}
              >
                Remove From Cart
              </button>
            </li>
          );
        })}
      </ul>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default Cart;