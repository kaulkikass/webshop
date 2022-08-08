import { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


function MaintainCategories() {
    const navigate = useNavigate();
    const idRef = useRef();
    const nameRef = useRef(); 
    const [categories, setCategories] = useState([]);                                  ///!!!! categories
    const categoriesDb = 'https://react-webshop-07-22-default-rtdb.europe-west1.firebasedatabase.app/categories.json';
   
    useEffect(() => {
        fetch(categoriesDb)
        .then(response => response.json())
        .then(data => 
            setCategories(data));
    }, []);

    const add = () => {
        const newCategory = {
            id: Number(idRef.current.value),
            name: nameRef.current.value
        }
        categories.push(newCategory);
        /* setCategories(categories.slice()); */
        fetch(categoriesDb,{ 
            method: 'PUT', //pannamakse midagi sinna API otspunktile
            body: JSON.stringify(categories), //mida pannakse
            headers: { //mis kujul andmed pannakse
                'Content-Type': 'application/json'
            }
        }).then(() => navigate('/admin/halda-tooteid'))
        
    }

    const deleteProduct = (index) => {
        categories.splice(index,1);
        setCategories(categories.slice());
        //API Päring edaspidi kustutamiseks
        fetch(categoriesDb,{ 
            method: 'PUT', //pannamakse midagi sinna API otspunktile
            body: JSON.stringify(categories), //mida pannakse
            headers: { //mis kujul andmed pannakse
                'Content-Type': 'application/json'
            }
        })
    }


    //koju: kustutamine
    //const delete() =>{}
    //.map(div....button>Kustuta<>)


    return ( 
    <div>
        <label>Kategooria ID</label>
        <input ref={idRef} type="text" />
        <label>Kategooria nimi</label>
        <input ref={nameRef} type="text" />
        <button onClick={add}>Lisa</button>
        {categories.map(element => 
        <div>
        <div>{element.name}</div>
        <button onClick={() => deleteProduct(element)}>Kustuta</button>
        </div>
        
        )}
        
    </div> 
    );
}

export default MaintainCategories;