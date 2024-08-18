import { useState, useEffect } from 'react'
import './App.css'
import Main from './components/Main'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useFetcher,
} from "react-router-dom"
import Navbar from './components/Navbar'
import Cart from './components/Cart'
import Singlepage from './components/Singlepage'
import {ProductContext} from './components/ProductContext'

function App() {
  const [selectedProduct, setSelectedProduct] = useState()
  const [islogin, setIslogin] = useState(false)

  return (
    
    <BrowserRouter>
      <ProductContext.Provider value = {{selectedProduct, setSelectedProduct}}>

        <div>
          <Navbar islogin={islogin} setIslogin={setIslogin}/>
          <Routes>
            <Route path='/' element={<Main islogin={islogin} setIslogin={setIslogin}/>}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/singlepage' element={<Singlepage selectedProduct={selectedProduct}/>}></Route>
          </Routes>
        </div>
      </ProductContext.Provider>
    </BrowserRouter>
    
  )
}

export default App
