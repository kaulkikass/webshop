import { useRef, useState, useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';



function EditProduct() {
    const [idUnique,setIdUnique] = useState(true);
    const { id } = useParams();  // /admin/muuda/:id
    const navigate = useNavigate();
    const idRef = useRef();
    const nameRef = useRef();
    const priceRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();
    const imageRef = useRef();
    const activeRef = useRef();
    const [products, setProducts] = useState([]);
    //Number() sest see id on stringina URList
    const index = products.findIndex(element => element.id === Number(id));
    const product = products[index];
    const productsDb = 'https://react-webshop-07-22-default-rtdb.europe-west1.firebasedatabase.app/products.json';
    
    const [categories, setCategories] = useState([]);                                  ///!!!! categories
    const categoriesDb = 'https://react-webshop-07-22-default-rtdb.europe-west1.firebasedatabase.app/categories.json';
    //uef on lühend
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

    const edit = () => {
        products[index] = {
            id: idRef.current.value,
            name: nameRef.current.value,
            price: priceRef.current.value,
            description: descriptionRef.current.value,
            category: categoryRef.current.value,
            image: imageRef.current.value,
            active: activeRef.current.value
        };

        fetch(productsDb,{ 
            method: 'PUT', //pannamakse midagi sinna API otspunktile
            body: JSON.stringify(products), //mida pannakse
            headers: { //mis kujul andmed pannakse
                'Content-Type': 'application/json'
            }
        }).then(() => navigate('/admin/halda-tooteid'))
    }

    const checkIdUniqueness = () => {
        // [].find(element => true) annab true elemendi väärtused
        // [].findIndex(element => true) annab true järjekorranumbri väärtuse
        if (Number(product.id) === Number(idRef.current.value)) {
            setIdUnique(true);
        } else {
        const index = products.findIndex(element => element.id === Number(idRef.current.value));
        console.log(index);
        if (index === -1) {
            setIdUnique(true);
        } else {
            setIdUnique(false);
        } 
        } 
    }
    //proovige eesti keelse järgi leida toode üles 
    //const product = 
    //kuvage inputide sees iga toote väärtust
    //nupp ja funktsioon muutmise osas - muutma minna

    return ( 
    <div>
    {product !== undefined && <div>
        { idUnique === false && <div>Sisestasid mitteunikaalse ID!</div>}
        <label>ID</label>
        <input onChange={checkIdUniqueness} ref={idRef} defaultValue={product.id} type="text" />
        <label>Name</label>
        <input ref={nameRef} defaultValue={product.name} type="text" />
        <label>Price</label>
        <input ref={priceRef} defaultValue={product.price} type="number" />
        <label>Description</label>
        <input ref={descriptionRef} defaultValue={product.description} type="text" />
        <label>Category</label>
        {/* <input ref={categoryRef} defaultValue={product.category} type="text" /> */}
        {/* <select ref={categoryRef} defaultValue={product.category}>{categories.map(element =>(<option>{element}</option>))}</select> */}
        <select ref={categoryRef} defaultValue={product.category}>{categories.map(element => <option key={element}>{element}</option>)}</select>
        <label>Image</label>
        <input ref={imageRef} defaultValue={product.image} type="text" />
        <label>Active</label>
        <input ref={activeRef} defaultValue={product.active} type="checkbox" />
        <button disabled={idUnique === false} onClick={edit}>Muuda</button>
    </div>}
    </div>
    );
}

export default EditProduct;