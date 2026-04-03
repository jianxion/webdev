import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './List.css';

import { useProductContext } from './ProductContext';
import type { DummyJsonProduct, DummyJsonProductsResponse, Product } from '../types';

const PRODUCTS_API_URL = 'https://dummyjson.com/products';

function mapDummyJsonProduct(product: DummyJsonProduct): Product {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.thumbnail,
    rating: {
      rate: product.rating,
      count: product.stock,
    },
  };
}

const List = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setSelectedProduct } = useProductContext();

  useEffect(() => {
    let isSubscribed = true;

    async function loadProducts() {
      try {
        const response = await fetch(PRODUCTS_API_URL);

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }

        const data: DummyJsonProductsResponse = await response.json();
        const normalizedProducts = data.products.map(mapDummyJsonProduct);

        if (!isSubscribed) {
          return;
        }

        setItems(normalizedProducts);
        setErrorMessage(null);
      } catch (error) {
        if (!isSubscribed) {
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : 'Unable to load products right now.',
        );
      } finally {
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    }

    void loadProducts();

    return () => {
      isSubscribed = false;
    };
  }, []);

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div>
      <h1>Our New Products</h1>

      <ul>
        {items.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => {
                setSelectedProduct(item);
              }}
            >
              <Link to="/singlepage">
                <img src={item.image} alt={item.title} />
                <h2>{item.title}</h2>
                <p>
                  <strong>{item.price} $</strong>
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;