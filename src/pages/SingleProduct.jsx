/* import { useParams } from 'react-router-dom';
import productsFromFail from "../data/products.json";

function SingleProduct() {
    const { id } = useParams();

    const products = productsFromFail;

    const product = products.find(element => Number(element.id) === Number(id) );

    const addToCart = (productClicked) => {
        let cart = sessionStorage.getItem('cart');
        cart = JSON.parse(cart) || [];
        const index = cart.findIndex(element => element.product.id === productClicked.id);
        if (index >= 0) {
            //suurendan kogust
            //massiivi muutmine --->
            // ---> ['ant', 'bison', 'camel'][1] = 'bird'
            // -----> ['ant', 'bird', 'camel']
            cart[index].quantity = cart[index].quantity + 1;
        } else {
            //pushi sisse kirjutan, mida lisan lõppu, kui toodet ei ole veel ostukorvis
            // [].push({product: {id:, name:, category:}, quantity:1})
           cart.push({product: productClicked, quantity: 1}); 
        }
        cart = JSON.stringify(cart);
        sessionStorage.setItem('cart', cart);
    }

    return ( 
    <div>
        { product !== undefined && 
        <div>
            <img src={product.image} alt="" />
            <div>{product.name}</div>
            <div>{product.price}</div>
        </div>}
        { product === undefined && <div>Viga toote otsingul</div>}
        <button onClick={() => addToCart(product)}>Lisa ostukorvi</button>
    </div>
    );
}

export default SingleProduct; */

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SingleProduct() {
    const {productId} = useParams();
    const [product, setProduct] = useState({}) //TYHI OBJEKT
    const productsDb = 'https://react-webshop-07-22-default-rtdb.europe-west1.firebasedatabase.app/products.json'

    useEffect(() => {
        fetch(productsDb)
            .then(res => res.json())
            .then(data => {
                const found = data.find(element => Number(element.id) === Number(productId));
                setProduct(found);
            })
    }, [productId]);


    return (
        <div>
            { product !== undefined && 
            <div>
                <img src={product.image} alt=''/>
                <div>{product.name}</div>
                <div>{product.price} $</div>
                <div>{product.category}</div>
                <div>{product.description}</div>
            </div>}
            { product === undefined && <div>Toodet ei leitud!</div>}
        </div>    
    );
}

export default SingleProduct;