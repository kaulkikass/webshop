import { useRef, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';



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
    const navigate = useNavigate();

    useEffect(() => {  
        fetch(productsDb)
        .then(res => res.json())
        .then(data => setProducts(data || [])); 
    
        fetch(categoriesDb)
        .then(res => res.json())
        .then(data => setCategories(data || [])); 
      }, []);

      const [message, setMessage] = useState("");

    
      const add = () => {
        //kui vasak pool väär, võta parem
        //koodi efektiivsuse mõttes, võiks panna vasakule poole koik suurema toenanosusega true olev voi koige lihtsamini leitav true
        if (idRef.current.value === "") {
            setMessage("Id väli täitmata");
            return;                           // return lõpetab funktsiooni
        }
        if (nameRef.current.value === "") {
            setMessage("Nimi on täitmata");
            return;                           // return lõpetab funktsiooni
        }
        if (priceRef.current.value === "") {
            setMessage("hind on täitmata");
            return;                           // return lõpetab funktsiooni
        }
        if (descriptionRef.current.value === "") {
            setMessage("Kirjeldus täitmata");
            return;                           // return lõpetab funktsiooni
        }
        if (imageRef.current.value === "") {
            setMessage("Pilt täitmata");
            return;                           // return lõpetab funktsiooni
        }

      <div>{message}</div>
        const newProduct = {
          id: Number(idRef.current.value),
          name: nameRef.current.value,
          price: Number(priceRef.current.value),
          description: descriptionRef.current.value,
          category: categoryRef.current.value,
          image: imageRef.current.value,
          active: activeRef.current.checked
        }
        products.push(newProduct);
            //LISAMINE PEAKS KÄIMA ÄPI PÄRINGU KAUDU  
            //PUT / POST teha saavad rakendused (localhost:3000), POSTMAN jne.. 
        fetch(productsDb,{ 
            method: 'PUT', //pannamakse midagi sinna API otspunktile
            body: JSON.stringify(products), //mida pannakse
            headers: { //mis kujul andmed pannakse
                'Content-Type': 'application/json'
            }
        }).then(() => navigate("/admin/halda-tooteid"))
    }



    const checkIdUniqueness = () => {
        // [].find(element => true) annab true elemendi väärtused
        // [].findIndex(element => true) annab true järjekorranumbri väärtuse
        const index = products.findIndex(element => Number(element.id) === Number(idRef.current.value));
        console.log(index);
        if (index === -1) {
            setIdUnique(true);
        } else {
            setIdUnique(false);
        } 
    }

    return ( 
    <div>
        {message} <br />
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
        <select ref={categoryRef}>
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