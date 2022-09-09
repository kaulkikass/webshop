import { useContext } from "react";
import { useState } from "react";
import ParcelMachine from "../components/cart/ParcelMachine";
import Payment from "../components/cart/Payment";
import styles from '../css/Cart.module.css';
import CartSumContext from "../store/CartSumContext";
// import { cartSumService } from '../store/cartSumService';

function Cart() {
  const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem("cart")) || []);
  const cartSumCtx = useContext(CartSumContext);

  const decreaseQuantity = (index) => {
    cart[index].quantity = cart[index].quantity - 1;
    if (cart[index].quantity <= 0) {
      removeFromCart(index);
    }
    setCart(cart.slice());
    sessionStorage.setItem("cart", JSON.stringify(cart));
    // cartSumService.sendCartSum(calculateCartSum());
    cartSumCtx.setCartSum(calculateCartSum());
  }

  const increaseQuantity = (index) => {
    cart[index].quantity = cart[index].quantity + 1; // võtab varasema koguse ja liidab ühe juurde
    setCart(cart.slice());
    sessionStorage.setItem("cart", JSON.stringify(cart));
    // cartSumService.sendCartSum(calculateCartSum());
    cartSumCtx.setCartSum(calculateCartSum());
  }

  const removeFromCart = (index) => {
    cart.splice(index,1);
    setCart(cart.slice());
    sessionStorage.setItem("cart", JSON.stringify(cart));
    // cartSumService.sendCartSum(calculateCartSum());
    cartSumCtx.setCartSum(calculateCartSum());
  }

  const calculateCartSum = () => {
    let cartSum = 0;
    cart.forEach(element => cartSum = cartSum + element.product.price * element.quantity )
    return cartSum;
  }

  return ( 
  <div>
    {/* TEHKE KA TÜHJENDA OSTUKORV, MIDA NÄIDATAKSE VAID SIIS KUI OSTUKORVIS ON MIDAGI */}
    <button>Kodus: tühjenda</button>

    {cart.map((element, index) => 
      <div className={styles.product} key={element.product.id}>
        <img className={styles.image} src={element.product.image} alt="" />
        <div className={styles.name}>{element.product.name}</div>
        <div className={styles.price}>{Number(element.product.price).toFixed(2)} €</div>
        <div className={styles.controls}>
          <img 
            className={styles.button} 
            onClick={() => decreaseQuantity(index)} 
            src={require("../assets/minus-button.png")} alt="" />
          <div>{element.quantity} tk</div>
          <img 
            className={styles.button} 
            onClick={() => increaseQuantity(index)}
            src={require("../assets/add.png")} alt="" />
        </div>
        <div className={styles.total}>{(element.product.price * element.quantity).toFixed(2)} €</div>
        <img 
          className={styles.button} 
          onClick={() => removeFromCart(index)} 
          src={require("../assets/cancel.png")} alt="" />
      </div>)}

    { cart.length > 0 && 
    <div className={styles.sum}>
       <ParcelMachine />
       <Payment totalSum={calculateCartSum()} />
       <div>{calculateCartSum().toFixed(2)} €</div>
       
    </div>}

     {/* KODUS: näita mingit pilti kui ostukorv on tühi */}
  </div> );
}

export default Cart;


// Kõik failid alla 200 rea
// Ideaalis proovime hoida alla 150
// Hoida kõik failid alla 100 rea




// 70ak/h / 4   17.5
// 22.08 1. Pagination / pildi lisamine failina / props+component
// 24.08 2. Props+component jätk + ostukorvi kogusumma navbaris
// 29.08 3. sisselogimine/registreerumine
// 31.08 4. Nortali proovitöö
// 14.09 17.30-19.00  5. Projekti esitlemine  0.5  --> näitate lehte + koodi

// Webshopis
// Wordpress  headless
// Iseseisvad API otspunkti ülesanded
// Mongo DB
// Wordpress
// Keelevahetusel ka URL keele vahetus
// Sorteerimise salvestus kategooria vahetamisel
// Pakiautomaadil vahetus - 2 refi?, 2 onChange?
// Lazy-loading
// Mitu ostukorvis on avalehel
// Kodus näidata erinevaid sõnumeid korraga vormis lisamisel