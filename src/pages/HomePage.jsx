import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

import {Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import Pagination from 'react-bootstrap/Pagination';
import SortDropdown from '../components/home/SortDropdown';


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
    const [activePage, setActivePage] = useState(2);
    const [filteredProducts, setFilteredProducts] = useState([]);
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
            setProducts(data.slice(0,20) || []);
            setFilteredProducts(data || []);
            setDatabaseProducts(data || []);
            setLoading(false);
        });
    }, []);


    
    let pages = [];
    for (let number = 1; number < filteredProducts.length /20+1; number++) {
    pages.push(number);
    }

    
    const filterByCategory = (catergoryClicked) => {
        if (catergoryClicked === 'all') {
            setProducts(databaseProducts.slice(0,20));
            setFilteredProducts(databaseProducts)
        } else {
            const result = databaseProducts.filter(element => element.category === catergoryClicked)
            setProducts(result.slice(0,20));
            setFilteredProducts(result);
        }
        setSelectedCategory(catergoryClicked);
        setActivePage(1);
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
    
/*     const images = [
        {src: "https://picsum.photos/id/237/500/200", alt: "First slide", header: "First slide label", text: "Nulla vitae elit libero, a pharetra augue mollis interdum."},
        {src: "https://picsum.photos/id/337/500/200", alt: "Second slide", header: "Second slide label", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
        {src: "https://picsum.photos/id/437/500/200", alt: "Third slide", header: "Third slide label", text: "Praesent commodo cursus magna, vel scelercelerisque nisl consectetur."}  
      ] */

      const [images, setImages] = useState([]);
      useEffect(() => {
        fetch('https://react-webshop-07-22-default-rtdb.europe-west1.firebasedatabase.app/images.json')
          .then(res => res.json())
          .then(data => setImages(data || []))
      }, []);


      const changePage = (number) => {
        setActivePage(number);
        setProducts(filteredProducts.slice(number*20-20,number*20));
      }

    return ( 
    <div>
    <Carousel>
      { images.map(element =>  <Carousel.Item key={element.src}>
        <img
          src={element.src}
          alt={element.alt}
        />
        <Carousel.Caption>
          <h3>{element.header}</h3>
          <p>{element.text}</p>
        </Carousel.Caption>
      </Carousel.Item>)}
    </Carousel>

    <ToastContainer />
    {isLoading === true && <Spinner />}
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
        <SortDropdown 
          filteredProducts = {filteredProducts}
          updateProducts = {setProducts}
          updatePage = {setActivePage}
        /> 
        <div>{filteredProducts.length} toodet leitud</div>
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
        <Pagination>{pages.map(number =>
          <Pagination.Item onClick={() => changePage(number)} key={number} active={number === activePage}>
            {number}
          </Pagination.Item>)}</Pagination>
    </div>
    );
}

export default HomePage;

