import { useRef, useState} from 'react';
import productsFromFail from '../../products.json';
import categoriesFromFile from '../../categories.json';


function AddProduct() {
    const [idUnique,setIdUnique] = useState(true);
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

    const checkIdUniqueness = () => {
        // [].find(element => true) annab true elemendi väärtused
        // [].findIndex(element => true) annab true järjekorranumbri väärtuse
        const index = productsFromFail.findIndex(element => element.id === Number(idRef.current.value));
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
            {categoriesFromFile.map(element => <option>{element.name}</option>)}
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