import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AdminHome() {
  return ( 
  <div>
      <Link to="/admin/lisa-toode">
        <Button>Lisa toode</Button>
      </Link>
      <Link to="/admin/halda-tooteid">
        <Button>Halda tooteid</Button>
      </Link>
      <Link to="/admin/halda-poode">
        <Button>Halda poode</Button>
      </Link>
      <Link to="/admin/halda-kategooriaid">
        <Button>Halda kategooriaid</Button>
      </Link>
      <Link to="/admin/lisa-kasutajaid">
        <Button>Lisa kasutajaid</Button>
      </Link>
  </div> );
}

export default AdminHome;