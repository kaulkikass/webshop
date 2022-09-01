import React from "react";
import { useState } from "react";

const CartSumContext = React.createContext({
  cartSum: 0,
  setCartSum: (number) => {}
});
export const CartSumContextProvider = (props) => {
  const [cartSum, setCartSum] = useState(determineCartSum());

  function determineCartSum() {
    let cart = sessionStorage.getItem("cart");
    cart = JSON.parse(cart) || [];
    let cartSum = 0;
    cart.forEach(element => cartSum = cartSum + element.product.price * element.quantity );
    return cartSum;
  }
return (
    <CartSumContext.Provider value={{
      cartSum: cartSum,
      setCartSum: setCartSum
    }}>
      {props.children}
    </CartSumContext.Provider>
  )
}

export default CartSumContext;