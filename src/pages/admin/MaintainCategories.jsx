import { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Spinner from "../../components/Spinner";


function MaintainCategories() {
    const navigate = useNavigate();
    const idRef = useRef();
    const nameRef = useRef(); 
    const [categories, setCategories] = useState([]);                                  ///!!!! categories
    const categoriesDb = 'https://react-webshop-07-22-default-rtdb.europe-west1.firebasedatabase.app/categories.json';
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(categoriesDb)
        .then(response => response.json())
        .then(data => 
            {setCategories(data || []);
            setLoading(false);
            });
    }, []);

    // || <---- kui vasakul poool on tühjus, siis võta parem pool
    // && <---- kui vasakul pool on tõene, siis kuva parem pool
    const add = (event) => { // saadan sündmuse
        if(event.code === "Enter" || event.type === "click") {
            const newCategory = {
                id: Number(idRef.current.value),
                name: nameRef.current.value
            }
            categories.push(newCategory);
            setCategories(categories.slice());
            fetch(categoriesDb,{ 
                method: 'PUT', //pannamakse midagi sinna API otspunktile
                body: JSON.stringify(categories), //mida pannakse
                headers: { //mis kujul andmed pannakse
                    'Content-Type': 'application/json'
                }
             })
             //.then(() => navigate('/admin/halda-tooteid'))
            idRef.current.value = "";
            nameRef.current.value = "";
        }
        
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
        { isLoading === true && <Spinner /> } <br />
        <label>Kategooria ID</label> <br />
        <input ref={idRef} type="text" /><br />
        <label>Kategooria nimi</label>  <br />
        <input onKeyUp={add} ref={nameRef} type="text" /> <br />
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