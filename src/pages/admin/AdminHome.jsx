import { Link } from 'react-router-dom';
import {Button } from 'react-bootstrap';

function AdminHome() {
    return ( 
    <div>
        <Link to='/admin/lisa-toode'>
            <Button>Lisa toode</Button>
        </Link>
        <Link to='/admin/halda-tooteid'>
            <Button>Halda tooteid</Button>
        </Link>
        <Link to='/admin/halda-poode'>
            <Button>Halda poode</Button>
        </Link>
        <Link to='/admin/halda-kategooriaid'>
            <Button>Halda kategooriaid</Button>
        </Link>
    </div> 
    );
}

export default AdminHome;