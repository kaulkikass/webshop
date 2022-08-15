import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../components/Spinner';

function HomePage() {
    //käitub nagu productsFromFile, ehk kogu aeg on originaalsed tooted sees
    const [databaseProducts, setDatabaseProducts] = useState([]); 
     // on kogu aeg muutuvas seisundis(filtreeritakse/sorteeritakse jne)
    const [products, setProducts] = useState([]);
                    //---.map tagastab -- returns
    const categories =[...new Set(databaseProducts.map(element => element.category))];
    const [selectedCategory, setSelectedCategory] = useState('all');
    const productsDb = 'https://react-webshop-07-22-default-rtdb.europe-west1.firebasedatabase.app/products.json';
    const [isLoading, setLoading] = useState(false);
    //[].map ( => uus_väärtus)  
    //[].sort( => pluss/miinus ) võrdleb, kas tuleb miinus märgiga või plussiga tehe
    //[].filter( => true/false )  vaatab, kas vaste sobib voi ei
    
    //uef on lühend
    useEffect(() => { // see funktsioon laheb kaima lehele tulles
        setLoading(true);
        fetch(productsDb) //fetch on alati asünkroonne ( ütleb koodile, et mine edasi)
        .then(response => response.json()) // staatuskood - 200 /400-404
        .then(data => {
            data = data.filter(element => element.active === true)
            setProducts(data || []);
            setDatabaseProducts(data || []);
            setLoading(false);
        });
    }, []);

    //sort muteerib --mutates
    const sortAZ = () => {
        // muteerib --- mutates
        const result = [...products].sort((a,b)=> a.name.localeCompare(b.name));
        setProducts(result);
      }
    
      const sortZA = () => {
        const result = [...products].sort((a,b)=> b.name.localeCompare(a.name));
        setProducts(result);
      }
    
      const sortPriceAsc = () => {
        const result = [...products].sort((a,b)=> a.price - b.price);
        setProducts(result);
      }

      const sortPriceDesc = () => {
        const result = [...products].sort((a,b)=> b.price - a.price);
        setProducts(result);
      }

    const filterByCategory = (catergoryClicked) => {
        if (catergoryClicked === 'all') {
            setProducts(databaseProducts);
        } else {
            const result = databaseProducts.filter(element => element.category === catergoryClicked)
            setProducts(result);
        }
        setSelectedCategory(catergoryClicked);
    }

    // {product: {id, name, category} quantity: 1} objekt objekti sees
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
        toast.error('Edukalt ostukorvi kustutatud', {
            position: "bottom-right",
            autoClose: 3000,
            theme:"dark"
            });
    }
    
    return ( 
    <div>
    <ToastContainer />
    {products.length === 0 && <Spinner />}
        <div 
        className={selectedCategory === 'all' ? 'active-category' : undefined} 
        onClick={() => filterByCategory('all')}>
            Kõik kategooriad
        </div>
        { categories.map(element =>  
            <div
                className={selectedCategory === element ? 'active-category' : undefined}
             key={element} onClick={() => filterByCategory(element)}>
                {element}
            </div>) }        
        <DropdownButton id="dropdown-basic-button" title="Sorteeri ">
            <Dropdown.Item onClick={() => sortAZ()}>A - Z</Dropdown.Item>
            <Dropdown.Item onClick={() => sortZA()}>Z - A</Dropdown.Item>
            <Dropdown.Item onClick={() => sortPriceAsc()}>
            Kasvav hind
            </Dropdown.Item>
            <Dropdown.Item onClick={() => sortPriceDesc()}>
            Kahanev hind
            </Dropdown.Item>
        </DropdownButton>
        <div>{products.length} toodet leitud</div>
        {products.map(element => 
        <div key={element.id}>
            <Link to = {"/toode/" + element.id}>
            <img src={element.image} alt="" />
            <div>{element.name}</div>
            <div>{element.price}</div>
            </Link>
            <Button variant='success' onClick={() => addToCart(element)}>Lisa ostukorvi</Button>
        </div>
        )};
    </div>
    );
}

export default HomePage;

