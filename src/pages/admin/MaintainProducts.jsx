//salvestus:
//1- brauser: localstorage/sessionstorage - lehekülje andmed (mis keel), sisselogimise andmed(token), ostukorv
//2- faili - logide (salvestatakse kasutaja iga klikk ja andmesisestus)
//3- andmebaas - kasutajad, tooted, tellimused, kategooriad, administraatorid, poed)

import { useRef, useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../../components/Spinner';



function MaintainProducts() {
    
    //käitub nagu productsFromFile, ehk kogu aeg on originaalsed tooted sees
    const [databaseProducts, setDatabaseProducts] = useState([]); 
     // on kogu aeg muutuvas seisundis(filtreeritakse/sorteeritakse jne)
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const productsDb = 'https://react-webshop-07-22-default-rtdb.europe-west1.firebasedatabase.app/products.json';
     //uef on lühend
     useEffect(() => {
        setLoading(true);
        fetch(productsDb)
        .then(response => response.json())
        .then(data => {setProducts(data || []); setDatabaseProducts(data || []);setLoading(false);});
    }, []);


    const searchedRef = useRef();

    const deleteProduct = (productClicked) => {
        const index = databaseProducts.findIndex(element => element.id === productClicked.id);
        databaseProducts.splice(index,1);
        setProducts(databaseProducts.slice());
        searchProducts();
        //API Päring edaspidi kustutamiseks
        fetch(productsDb,{ 
            method: 'PUT', //pannamakse midagi sinna API otspunktile
            body: JSON.stringify(databaseProducts), //mida pannakse
            headers: { //mis kujul andmed pannakse
                'Content-Type': 'application/json'
            }
        })
        toast.success('Edukalt ostukorvi lisatud', {
            position: "bottom-right",
            autoClose: 3000,
            theme:"dark"
            });
    }


    // 'elas metsas mutionu'.indexOf('metsast') --> 4
    const searchProducts = () => {
        const result = databaseProducts.filter(element => 
            element.name.toLowerCase().indexOf(searchedRef.current.value.toLowerCase()) >= 0);
        setProducts(result);
    }
    //järjekorranumbri ehk indexi alusel käib nii muutmine kui ka kustutamine
    // [].splice(index,1);
    //[][0] = "Ant";
    const changeProductActivity = (productClicked) => {
        const index = databaseProducts.findIndex(element => element.id === productClicked.id);
        databaseProducts[index].active = !databaseProducts[index].active; // "!" keerab true või false teistpidi
        setProducts(databaseProducts.slice());
        searchProducts();
        //API Päring edaspidi kustutamiseks
        fetch(productsDb,{ 
            method: 'PUT', //pannamakse midagi sinna API otspunktile
            body: JSON.stringify(databaseProducts), //mida pannakse
            headers: { //mis kujul andmed pannakse
                'Content-Type': 'application/json'
            }
        })
    }

    return ( 
    <div>
    <ToastContainer />
    { isLoading === true && <Spinner /> } <br />
        <input onChange={searchProducts} ref={searchedRef} type="text" />
        <span>{products.length}</span>
        {products.map((element) =>
        <div key={element.id} className={ element.active === true  ? "active-product" : "inactive-product" }>
            <div onClick={() => changeProductActivity(element)}>
                <div>{element.id}</div>
                <div>{element.name}</div>
                <div>{element.price} $</div>
                <div>{element.image}</div>
                <div>{element.category}</div>
                <div>{element.description}</div>
                <div>{element.active + 0}</div>
            </div>
            <button onClick={()=>deleteProduct(element)}>Kustuta</button>
            {/* <Link to={"/admin/muuda/" + element.id}> */}
            <Link to={`/admin/muuda/${element.id}`}>
            <button>Muuda</button>
            </Link>
        </div>)}
    </div> 
    );
}

export default MaintainProducts;