import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

import Cart from './components/Cart';
import Main from './components/Main';
import Navbar from './components/Navbar';
import { ProductProvider } from './components/ProductContext';
import Singlepage from './components/Singlepage';
import type { Product } from './types';

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <BrowserRouter>
      <ProductProvider value={{ selectedProduct, setSelectedProduct }}>
        <div>
          <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />
          <Routes>
            <Route path="/" element={<Main isLogin={isLogin} setIsLogin={setIsLogin} />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/singlepage"
              element={<Singlepage selectedProduct={selectedProduct} />}
            />
          </Routes>
        </div>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;