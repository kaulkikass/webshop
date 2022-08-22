import { useEffect, useRef, useState } from "react";

function ParcelMachine() {
    const [parcelMachines, setParcelMachines] = useState([]);
    const [selectedPM, setSelectedPM] = useState(sessionStorage.getItem('parcelMachine') || '');
    const pmRef = useRef();

    useEffect(() => {
        fetch('https://www.omniva.ee/locations.json') //aadress kuhu teen api päringu
            .then(res => res.json()) //saan terviktagastuse, kus on staatuskood jne
            .then (data => {
                const result = (data || []).filter(element => element.A0_NAME ==='EE');
                setParcelMachines(result);
            }) //saan body tagastuse (peab olema [] või {})
        }, []);

    const selectPM = () => {
        setSelectedPM(pmRef.current.value);
        sessionStorage.setItem('parcelMachine', pmRef.current.value);
    }

    const unSelectPM = () => {
        setSelectedPM('');
        sessionStorage.removeItem('parcelMachine');
    }


    return ( 
    <div>
        { selectedPM === "" &&
            <select onChange={selectPM} ref={pmRef}>
                {parcelMachines.map(element => <option key={element.NAME}>{element.NAME}</option>)}
            </select>}
            { selectedPM !== "" && <div>{selectedPM} <button onClick={unSelectPM}>X</button> </div>}
    </div>
     );
}

export default ParcelMachine;