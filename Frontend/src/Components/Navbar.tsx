import '../CSS/Navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {

    return (
        <nav className='navbar navbar-expand-lg bg-dark' data-bs-theme="dark">
            <div className="container-fluid">
                <Link to='/' className="navbar-brand"><strong className='fs-2 ms-1'>Pinger</strong> </Link>
            </div>
        </nav>

    );
}

export default Navbar;