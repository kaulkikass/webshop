import { useState } from "react";

function CategoryFilter(props) {
  const categories = [...new Set(props.databaseProducts.map(element => element.category))];
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filterByCategory = (categoryClicked) => {
    if (categoryClicked === 'all') {
      props.setProducts(props.databaseProducts.slice(0,20));
      props.setFilteredProducts(props.databaseProducts);
    } else {
      const result = props.databaseProducts.filter(element => element.category === categoryClicked);
      props.setProducts(result.slice(0,20));
      props.setFilteredProducts(result);
    }
    props.setActivePage(1);
    setSelectedCategory(categoryClicked);
  }

  return ( 
    <div>
      <div 
        className={selectedCategory === 'all' ? 'active-category' : undefined} 
        onClick={() => filterByCategory('all')}>
          Kõik kategooriad
      </div>
      { categories.map(element => 
      <div 
        className={selectedCategory === element ? 'active-category' : undefined} 
        key={element} 
        onClick={() => filterByCategory(element)}>
          {element}
      </div>) }
    </div>
   );
}

export default CategoryFilter;