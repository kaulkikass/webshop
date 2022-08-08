//salvestus:
//1- brauser: localstorage/sessionstorage - lehekülje andmed (mis keel), sisselogimise andmed(token), ostukorv
//2- faili - logide (salvestatakse kasutaja iga klikk ja andmesisestus)
//3- andmebaas - kasutajad, tooted, tellimused, kategooriad, administraatorid, poed)

import { useRef, useState,useEffect } from 'react';
import { Link } from 'react-router-dom';



function MaintainProducts() {
    //käitub nagu productsFromFile, ehk kogu aeg on originaalsed tooted sees
    const [databaseProducts, setDatabaseProducts] = useState([]); 
     // on kogu aeg muutuvas seisundis(filtreeritakse/sorteeritakse jne)
    const [products, setProducts] = useState([]);
    const productsDb = 'https://react-webshop-07-22-default-rtdb.europe-west1.firebasedatabase.app/products.json';
     //uef on lühend
     useEffect(() => {
        fetch(productsDb)
        .then(response => response.json())
        .then(data => {setProducts(data); setDatabaseProducts(data);});
    }, []);


    const searchedRef = useRef();

    const deleteProduct = (index) => {
        products.splice(index,1);
        setProducts(products.slice());
        //API Päring edaspidi kustutamiseks
        fetch(productsDb,{ 
            method: 'PUT', //pannamakse midagi sinna API otspunktile
            body: JSON.stringify(products), //mida pannakse
            headers: { //mis kujul andmed pannakse
                'Content-Type': 'application/json'
            }
        })
    }


    // 'elas metsas mutionu'.indexOf('metsast') --> 4
    const searchProducts = () => {
        const result = databaseProducts.filter(element => 
            element.name.toLowerCase().indexOf(searchedRef.current.value.toLowerCase()) >= 0);
        setProducts(result);
    }

    return ( 
    <div>
        <input onChange={searchProducts} ref={searchedRef} type="text" />
        <span>{products.length}</span>
        {products.map((element, index) =>
        <div key={element.id}>
            <div>{element.id}</div>
            <div>{element.name}</div>
            <div>{element.price} $</div>
            <div>{element.image}</div>
            <div>{element.category}</div>
            <div>{element.description}</div>
            <div>{element.active + 0}</div>
            <button onClick={()=>deleteProduct(index)}>Kustuta</button>
            {/* <Link to={"/admin/muuda/" + element.id}> */}
            <Link to={`/admin/muuda/${element.id}`}>
            <button>Muuda</button>
            </Link>
        </div>)}
    </div> 
    );
}

export default MaintainProducts;