import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { cartSumService } from '../../store/cartSumService';
import {Link} from 'react-router-dom';

function Product(props) {

  const removeFromCart = (productClicked) => {
    const productIndex = props.products.indexOf(productClicked);
    if (props.products[productIndex].count > 0) {
      props.products[productIndex].count--;
      props.setProducts(props.products.slice());
    }
let cart = sessionStorage.getItem("cart");
    cart = JSON.parse(cart) || [];
    const index = cart.findIndex(element => element.product.id === productClicked.id);
    if (index >= 0) {
      cart[index].quantity--;
      if (cart[index].quantity === 0) {
        cart.splice(index,1);
      }

      sendCartSumToNavbar(cart, 'Edukalt ostukorvist eemaldatud!');
    } 
  }
const addToCart = (productClicked) => {
    const productIndex = props.products.indexOf(productClicked);
    props.products[productIndex].count++;
    props.setProducts(props.products.slice());

    let cart = sessionStorage.getItem("cart");
    cart = JSON.parse(cart) || [];
    const index = cart.findIndex(element => element.product.id === productClicked.id);
    if (index >= 0) {
      cart[index].quantity++;
    } else {
      cart.push({product: productClicked, quantity: 1});
    }
sendCartSumToNavbar(cart, "Edukalt ostukorvi lisatud");
  }
const sendCartSumToNavbar = (cart, message) => {
    let cartSum = 0;
    cart.forEach(element => cartSum = cartSum + element.product.price * element.quantity )
    cartSumService.sendCartSum(cartSum);

    cart = JSON.stringify(cart);
    sessionStorage.setItem("cart",cart);

    toast.success(message, {
      position: "bottom-right",
      autoClose: 3000,
      theme: "dark"
      });
  }
    return ( 
    <div >
        <Link to = {"/toode/" + props.element.id}>
        <img src={props.element.image} alt="" />
        <div>{props.element.name}</div>
        <div>{props.element.price}</div>
        </Link>
        <Button disabled={props.element.count === 0} variant="danger" onClick={() => removeFromCart(props.element)}>Eemalda ostukorvist</Button>
        <div>{props.element.count} tk</div>
        <Button variant='success' onClick={() => addToCart(props.element)}>Lisa ostukorvi</Button>
    </div> 
    );
}

export default Product;

