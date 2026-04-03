import { Link } from 'react-router-dom';

import './Singlepage.css';

import { addToCart } from './actions/cartActions';
import { useAppDispatch } from './hooks';
import type { Product } from '../types';

interface SinglepageProps {
  selectedProduct: Product | null;
}

const Singlepage = ({ selectedProduct }: SinglepageProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (item: Product) => {
    dispatch(addToCart(item));
  };

  if (!selectedProduct) {
    return (
      <div className="singlepage-container">
        <p>No product selected.</p>
        <Link to="/">Return to products</Link>
      </div>
    );
  }

  return (
    <div className="singlepage-container">
      <h2 className="product-title">{selectedProduct.title}</h2>
      <img
        className="product-image"
        src={selectedProduct.image}
        alt={selectedProduct.title}
      />
      <button
        className="add-to-cart-button"
        onClick={() => {
          handleAddToCart(selectedProduct);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Singlepage;