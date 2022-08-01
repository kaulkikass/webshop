import { useRef} from 'react';
import productsFromFail from '../../products.json';
import categoriesFromFile from '../../categories.json';


function AddProduct() {
    const idRef = useRef();
    const nameRef = useRef();
    const priceRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();
    const imageRef = useRef();
    const activeRef = useRef();

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
        productsFromFail.push(newProduct);
    }

    return ( 
    <div>
        <label>ID</label>
        <input ref={idRef} type="text" />
        <label>Name</label>
        <input ref={nameRef} type="text" />
        <label>Price</label>
        <input ref={priceRef} type="number" />
        <label>Description</label>
        <input ref={descriptionRef} type="text" />
        <label>Category</label>
        {/* <input ref={categoryRef} type="text" /> */}
        <select>
            {categoriesFromFile.map(element => <option>{element.name}</option>)}
        </select>
        <label>Image</label>
        <input ref={imageRef} type="text" />
        <label>Active</label>
        <input ref={activeRef} type="checkbox" />
        <button onClick={() => add()}>Lisa toode</button>
    </div> 
    );
}

export default AddProduct;