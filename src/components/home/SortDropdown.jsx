import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function SortDropdown(props) {
    //sort muteerib --mutates
    const sortAZ = () => {
        // muteerib --- mutates
        props.filteredProducts.sort((a,b)=> a.name.localeCompare(b.name));
        props.updateProducts(props.filteredProducts.slice(0,20));
        props.updatePage(1);
      }
    
      const sortZA = () => {
        props.filteredProducts.sort((a,b)=> b.name.localeCompare(a.name));
        props.updateProducts(props.filteredProducts.slice(0,20));
        props.updatePage(1);
      }
    
      const sortPriceAsc = () => {
        props.filteredProducts.sort((a,b)=> a.price - b.price);
        props.updateProducts(props.filteredProducts.slice(0,20));
        props.updatePage(1);
      }

      const sortPriceDesc = () => {
        props.filteredProducts.sort((a,b)=> b.price - a.price);
        props.updateProducts(props.filteredProducts.slice(0,20));
        props.updatePage(1);
      }

    return ( 
    <div>
        <DropdownButton id="dropdown-basic-button" title="Sorteeri ">
            <Dropdown.Item onClick={() => sortAZ()}>A - Z</Dropdown.Item>
            <Dropdown.Item onClick={() => sortZA()}>Z - A</Dropdown.Item>
            <Dropdown.Item onClick={() => sortPriceAsc()}>
            Kasvav hind
            </Dropdown.Item>
            <Dropdown.Item onClick={() => sortPriceDesc()}>
            Kahanev hind
            </Dropdown.Item>
        </DropdownButton>
    </div>
 );
}

export default SortDropdown;