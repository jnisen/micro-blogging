/* React */
import { Link } from 'react-router-dom';
/* css */
import '../index.css'

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-ul">
                <li className="navbar-li">
                    <Link className="navbar-link" to='/'>Home</Link>
                </li>
                <li className="navbar-li">
                    <Link className="navbar-link" to='/profile'>Profile</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar