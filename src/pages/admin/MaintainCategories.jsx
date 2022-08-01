import { useRef } from "react";
import categoriesFromFile from '../../categories.json';

function MaintainCategories() {
    const idRef = useRef();
    const nameRef = useRef();

    const add = () => {
        const newCategory = {
            id: idRef.current.value,
            name: nameRef.current.value
        }
        categoriesFromFile.push(newCategory);
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
    </div> 
    );
}

export default MaintainCategories;