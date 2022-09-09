import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
/* import { cartSumService } from '../store/cartSumService'; */
import { useState } from 'react';
import { useContext } from 'react';
import AuthContext from '../store/AuthContext';
import CartSumContext from '../store/CartSumContext';

function NavigationBar() {
  const { t, i18n } = useTranslation();
  const authCtx = useContext(AuthContext);
  const cartSumCtx = useContext(CartSumContext);

 /*  const calculateCartSum = () => {
    let cart = sessionStorage.getItem("cart");
    cart = JSON.parse(cart) || [];
    let cartSum = 0;
    cart.forEach(element => cartSum = cartSum + element.product.price * element.quantity );
    return cartSum;
  }
 */
/*   const [cartSum, setCartSum] = useState(calculateCartSum()); */

  const changeWebsiteLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  }

/*   cartSumService.getCartSum().subscribe(newCartSum => setCartSum(newCartSum)); */

  const logout = () => {
    // globaalne muutuja false-ks
    authCtx.logout();
  }

  return ( 
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand as={Link} to="/">Webshop</Navbar.Brand>
        <Nav className="me-auto">
          {authCtx.loggedIn === true && <Nav.Link as={Link} to="/admin">{t('navbar.admin-button')}</Nav.Link>}
          <Nav.Link as={Link} to="/meist">{t('navbar.about-button')}</Nav.Link>
          <Nav.Link as={Link} to="/poed">{t('navbar.shops-button')}</Nav.Link>
          <Nav.Link as={Link} to="/ostukorv">{t('navbar.cart-button')}</Nav.Link>
          { authCtx.loggedIn === false && <Nav.Link as={Link} to="/logi-sisse">Logi sisse</Nav.Link>}
          { authCtx.loggedIn === true && <Nav.Link onClick={logout}>Logi välja</Nav.Link>}

        </Nav>
      </Container>
      <div>{cartSumCtx.cartSum.toFixed(2)} €</div>
      <img className='lang' onClick={() => changeWebsiteLanguage('en')} src={require('../assets/english.png')} alt="" />
      <img className='lang' onClick={() => changeWebsiteLanguage('ee')} src={require('../assets/estonian.png')} alt="" />
      <img className='lang' onClick={() => changeWebsiteLanguage('ru')} src={require('../assets/russian.png')} alt="" />
    </Navbar>
   );
}

export default NavigationBar;