import { useRef } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import productsFromFile from '../../products.json';

function EditProduct() {
    const { id } = useParams();  // /admin/muuda/:id
    const products = productsFromFile;
    const index = productsFromFile.findIndex(element => element.id === Number(id));
    const product = productsFromFile[index];
    const categories =[...new Set(productsFromFile.map(element => element.category))];
    //Number() sest see id on stringina URList
    //const product = products.find(element => element.id === Number(id));
    const navigate = useNavigate();
    const idRef = useRef();
    const nameRef = useRef();
    const priceRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();
    const imageRef = useRef();
    const activeRef = useRef();
    console.log(categories);
    const edit = () => {
        productsFromFile[index] = {
            id: idRef.current.value,
            name: nameRef.current.value,
            price: priceRef.current.value,
            description: descriptionRef.current.value,
            category: categoryRef.current.value,
            image: imageRef.current.value,
            active: activeRef.current.value
        };
        navigate('/admin/halda-tooteid');
    }

    //proovige eesti keelse järgi leida toode üles 
    //const product = 
    //kuvage inputide sees iga toote väärtust
    //nupp ja funktsioon muutmise osas - muutma minna

    return ( 
    <div>
        <label>ID</label>
        <input ref={idRef} defaultValue={product.id} type="text" />
        <label>Name</label>
        <input ref={nameRef} defaultValue={product.name} type="text" />
        <label>Price</label>
        <input ref={priceRef} defaultValue={product.price} type="number" />
        <label>Description</label>
        <input ref={descriptionRef} defaultValue={product.description} type="text" />
        <label>Category</label>
        {/* <input ref={categoryRef} defaultValue={product.category} type="text" /> */}
        <select ref={categoryRef} defaultValue={product.category}>{categories.map(element =>(<option>{element}</option>))}</select>
        <label>Image</label>
        <input ref={imageRef} defaultValue={product.image} type="text" />
        <label>Active</label>
        <input ref={activeRef} defaultValue={product.active} type="checkbox" />
        <button onClick={edit}>Muuda</button>
    </div> 
    );
}

export default EditProduct;