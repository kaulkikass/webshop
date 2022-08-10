import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import Shops from './pages/Shops';
import Cart from './pages/Cart';
import SingleProduct from './pages/SingleProduct';
import AdminHome from './pages/admin/AdminHome';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import MaintainProducts from './pages/admin/MaintainProducts';
import MaintainShops from './pages/admin/MaintainShops';
import MaintainCategories from './pages/admin/MaintainCategories';

import NavigationBar from './components/NavigationBar';


function App() {

 

  return (
    <div className="App">
        <NavigationBar />
        <Routes>
          <Route path='' exact element = { <HomePage /> } />
          <Route path='meist' exact element = { <AboutUs /> } />
          <Route path='poed' exact element = { <Shops /> } />
          <Route path='ostukorv' exact element = { <Cart /> } />
          <Route path='toode/:productId' exact element = { <SingleProduct /> } />
          <Route path='admin' exact element = { <AdminHome /> } />
          <Route path='admin/lisa-toode' exact element = { <AddProduct /> } />
          <Route path='admin/muuda/:id' exact element = { <EditProduct /> } />
          <Route path='admin/halda-tooteid' exact element = { <MaintainProducts /> } />
          <Route path='admin/halda-poode' exact element = { <MaintainShops /> } />
          <Route path='admin/halda-kategooriaid' exact element = { <MaintainCategories /> } />
        </Routes>
    </div>
  );
}

export default App;