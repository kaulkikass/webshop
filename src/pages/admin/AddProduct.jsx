import { useRef, useState, useEffect} from 'react';



function AddProduct() {
    const [idUnique,setIdUnique] = useState(true);
    const idRef = useRef();
    const nameRef = useRef();
    const priceRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();
    const imageRef = useRef();
    const activeRef = useRef();
    const productsDb = 'https://react-webshop-07-22-default-rtdb.europe-west1.firebasedatabase.app/products.json';
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);                                  ///!!!! categories
    const categoriesDb = 'https://react-webshop-07-22-default-rtdb.europe-west1.firebasedatabase.app/categories.json';

    useEffect(() => {
        fetch(productsDb)
        .then(response => response.json())
        .then(data => 
            setProducts(data));
    }, []);

    useEffect(() => {
        fetch(categoriesDb)
        .then(response => response.json())
        .then(data => 
            setCategories(data));
    }, []);

    
    const add = () => {
        const newProduct = {
            id: idRef.current.value,
            name: nameRef.current.value,
            price: priceRef.current.value,
            description: descriptionRef.current.value,
            category: categoryRef.current.value,
            image: imageRef.current.value,
            active: activeRef.current.value
        };
        products.push(newProduct);
            //LISAMINE PEAKS KÄIMA ÄPI PÄRINGU KAUDU  
            //PUT / POST teha saavad rakendused (localhost:3000), POSTMAN jne.. 
        fetch(productsDb,{ 
            method: 'PUT', //pannamakse midagi sinna API otspunktile
            body: JSON.stringify(products), //mida pannakse
            headers: { //mis kujul andmed pannakse
                'Content-Type': 'application/json'
            }
        })
    }



    const checkIdUniqueness = () => {
        // [].find(element => true) annab true elemendi väärtused
        // [].findIndex(element => true) annab true järjekorranumbri väärtuse
        const index = products.findIndex(element => element.id === Number(idRef.current.value));
        console.log(index);
        if (index === -1) {
            setIdUnique(true);
        } else {
            setIdUnique(false);
        } 
    }

    return ( 
    <div>
        { idUnique === false && <div>Sisestasid mitteunikaalse ID!</div>}
        <label>ID</label><br />
        <input onChange={checkIdUniqueness} ref={idRef} type="text" /><br />
        <label>Name</label><br />
        <input ref={nameRef} type="text" /> <br />
        <label>Price</label><br />
        <input ref={priceRef} type="number" /> <br />
        <label>Description</label><br />
        <input ref={descriptionRef} type="text" /> <br />
        <label>Category</label><br />
        {/* <input ref={categoryRef} type="text" /> */}
        <select>
            {categories.map(element => <option>{element.name}</option>)}
        </select> <br />
        <label>Image</label><br />
        <input ref={imageRef} type="text" /> <br />
        <label>Active</label><br />
        <input ref={activeRef} type="checkbox" /> <br />
        <button disabled={idUnique === false} onClick={() => add()}>Lisa toode</button>
    </div> 
    );
}

export default AddProduct;