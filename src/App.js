import './App.css';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import React, { useState } from 'react';
import CartProvider from './Store/CartProvider';

function App() {
  const [cartIsshown, setCartIsshown] = useState(false);

  const showCartHandler = () => {
    setCartIsshown(true);
  };

  const hideCartHandler = () => {
    setCartIsshown(false);
  };
  return (
    <CartProvider>
      {cartIsshown && <Cart onCloseCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <div>
        <Meals />
      </div>
    </CartProvider>
  );
}

export default App;
