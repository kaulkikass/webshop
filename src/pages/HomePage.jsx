import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import Pagination from 'react-bootstrap/Pagination';
import SortDropdown from '../components/home/SortDropdown';
import Product from '../components/home/Product';
import CarouselGallery from '../components/home/CarouselGallery';
import CategoryFilter from '../components/home/CategoryFilter';



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
            data = data.filter(element => element.active === true);
            const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
            data = data.map(element => {
              const index = cart.findIndex(cartProduct => cartProduct.product.id === element.id)
              let count = 0;
              if (index >= 0) {
                count = cart[index].quantity;
              }
              return {...element,count} // returni järel olevaga asendab iga elemendi ära
              // ...element <- tähisab, et jäta vana tervikuna alles
            })
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

      const changePage = (number) => {
        setActivePage(number);
        setProducts(filteredProducts.slice(number*20-20,number*20));
      }

    return ( 
    <div>
    
    <CarouselGallery />
    <ToastContainer />
    {isLoading === true && <Spinner />}
        <CategoryFilter 
          databaseProducts={databaseProducts}
          setProducts={setProducts}
          setFilteredProducts={setFilteredProducts}
          setActivePage={setActivePage}
        />

        <SortDropdown 
          filteredProducts = {filteredProducts}
          updateProducts = {setProducts}
          updatePage = {setActivePage}
        /> 
        <div>{filteredProducts.length} toodet leitud</div>
        {products.map(element => 
          <Product element={element}
                  products={products}
                  setProducts={setProducts}
          />
        )};
        <Pagination>{pages.map(number =>
          <Pagination.Item onClick={() => changePage(number)} key={number} active={number === activePage}>
            {number}
          </Pagination.Item>)}</Pagination>
    </div>
    );
}

export default HomePage;

