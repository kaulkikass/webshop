import { useEffect, useState } from 'react';
import Map from '../components/Map';

function Shops() {
  const [coordinaates, setCoordinates] = useState({lngLat: [59.886, 25.204], zoom: 7});
  const [shops, setShops] = useState([]);
  const dbUrl = "https://react-webshop-07-22-default-rtdb.europe-west1.firebasedatabase.app/shops.json";

  useEffect(() => {
    fetch(dbUrl)
    .then(response => response.json())
    .then(responseBody => {
      const shopsFromDb = [];
      for (const key in responseBody) {
        shopsFromDb.push(responseBody[key]);
      }
      setShops(shopsFromDb);
    })
  }, []);

  return (<div>
    <button onClick={() => setCoordinates({lngLat: [59.886, 25.204], zoom: 7})}>Kõik poed</button>
    {/* <button onClick={() => setCoordinates({lngLat: [59.4378, 24.7574], zoom: 11})}>Kõik Tallinna poed</button>
    <button onClick={() => setCoordinates({lngLat: [59.4231, 24.7991], zoom: 13})}>Ülemiste</button>
    <button onClick={() => setCoordinates({lngLat: [59.4277, 24.7193], zoom: 13})}>Kristiine</button>
    <button onClick={() => setCoordinates({lngLat: [60.198, 24.930], zoom: 13})}>Helsinki</button> */}
    {shops.map(element =>
    <div>
      <button onClick={() => setCoordinates({lngLat:[element.latitude, element.longitude], zoom: 13})}>{element.name}</button>
    </div>
    )}
   
    <Map shopMarkers={shops} mapCoordinaates={coordinaates}  />
  </div>)
}

export default Shops;