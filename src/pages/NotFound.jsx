import { Link } from "react-router-dom";

function NotFound() {
    return (
         <div>
            <h2>404</h2>
            <h3>Page not found</h3>
            <Link to="/">
                <button>Tagasi avalehele</button>
            </Link>
         </div> 
         );
}

export default NotFound;