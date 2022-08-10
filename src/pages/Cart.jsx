import { useRef, useState, useEffect } from "react";
/* import omnivaParcelMachines from '../omniva.json'; */
import styles from '../css/Cart.module.css';



function Cart() {
    const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem('cart')) || []);
    const [parcelMachines, setParcelMachines] = useState([]);
  //const parcelMachines = omnivaParcelMachines.filter(element => element.A0_NAME === "EE");

    useEffect(() => {
        fetch('https://www.omniva.ee/locations.json') //aadress kuhu teen api päringu
            .then(res => res.json()) //saan terviktagastuse, kus on staatuskood jne
            .then (data => {
                const result = data.filter(element => element.A0_NAME ==='EE');
                setParcelMachines(result);
            }) //saan body tagastuse (peab olema [] või {})
        }, []);

    const increaseQuantity = (index) => {
        cart[index].quantity = cart[index].quantity + 1;
        setCart(cart.slice());
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }

    const decreaseQuantity = (index) => {
        cart[index].quantity = cart[index].quantity - 1;
        if (cart[index].quantity <= 0) {
            deleteProduct(index);
        }
        setCart(cart.slice());
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }

    const deleteProduct = (index) => {
        cart.splice(index,1);
        setCart(cart.slice());
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }

    const calculateCartSum = () => {
     let cartSum = 0;
     cart.forEach(element => cartSum = cartSum + element.product.price * element.quantity);
     return cartSum;
    }

    const [selectedPM, setSelectedPM] = useState(sessionStorage.getItem('parcelMachine') || '');
    const pmRef = useRef();

    const selectPM = () => {
        setSelectedPM(pmRef.current.value);
        sessionStorage.setItem('parcelMachine', pmRef.current.value);
    }

    const unSelectPM = () => {
        setSelectedPM('');
        sessionStorage.removeItem('parcelMachine');
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
        <div className={styles.sum}>
        { selectedPM === "" && cart.length > 0 && <select onChange={selectPM} ref={pmRef}>{parcelMachines.map(element => <option key={element.NAME}>{element.NAME}</option>)}</select>}
        { selectedPM !== "" && cart.length > 0 && <div>{selectedPM} <button onClick={unSelectPM}>X</button> </div>}
        { cart.length > 0 && <div>{calculateCartSum().toFixed(2)} $</div>}
        </div>
    </div> 
    );
}

export default Cart;