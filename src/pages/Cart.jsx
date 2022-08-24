import { useState } from "react";
import ParcelMachine from "../components/cart/ParcelMachine";
import Payment from "../components/cart/Payment";
/* import omnivaParcelMachines from '../omniva.json'; */
import styles from '../css/Cart.module.css';
import { cartSumService } from '../store/cartSumService';



function Cart() {
    const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem('cart')) || []);

    const increaseQuantity = (index) => {
        cart[index].quantity = cart[index].quantity + 1;
        setCart(cart.slice());
        sessionStorage.setItem('cart', JSON.stringify(cart));
        cartSumService.sendCartSum(calculateCartSum());
        
    }

    const decreaseQuantity = (index) => {
        cart[index].quantity = cart[index].quantity - 1;
        if (cart[index].quantity <= 0) {
            deleteProduct(index);
        }
        setCart(cart.slice());
        sessionStorage.setItem('cart', JSON.stringify(cart));
        cartSumService.sendCartSum(calculateCartSum());
    }

    const deleteProduct = (index) => {
        cart.splice(index,1);
        setCart(cart.slice());
        sessionStorage.setItem('cart', JSON.stringify(cart));
        cartSumService.sendCartSum(calculateCartSum());
    }

    const calculateCartSum = () => {
     let cartSum = 0;
     cart.forEach(element => cartSum = cartSum + element.product.price * element.quantity);
     return cartSum;
    }

 


    return ( 
    <div>
        {cart.map((element,index) => 
        <div className={styles.product} key={element.id}>
            <img className={styles.image} src={element.product.image} alt="" />
            <div className={styles.name}>{element.product.name}</div>
            <div className={styles.price}>{element.product.price.toFixed(2)} $</div>
            <div className={styles.controls}>
                <img className={styles.button} onClick={() => decreaseQuantity(index)} src={require('../assets/minus-button.png')} alt='minus-sign' />
                <div>{element.quantity} tk</div>
                <img className={styles.button} onClick={() => increaseQuantity(index)} src={require('../assets/add.png')} alt="plus-sign"/>
            </div>
            <div className={styles.total}>{(element.quantity * element.product.price).toFixed(2)} $</div>
            <img className={styles.button} onClick={() => deleteProduct(index)} src={require('../assets/cancel.png')} alt='remove'/>
        </div>)}
        { cart.length > 0 && 
        <div className={styles.sum}>
           <ParcelMachine />
       <div>{calculateCartSum().toFixed(2)} €</div>
            <Payment totalSum={calculateCartSum()} />
    </div>}
    </div> 
    );
}

export default Cart;