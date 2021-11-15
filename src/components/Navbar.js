/* React */
import { Link } from 'react-router-dom';
/* css */
import '../index.css'

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-ul">
                <div className="left-side">
                    <li className="nav-item">
                        <Link className="navbar-link" to='/' >Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="navbar-link" to='/profile'>Profile</Link>
                    </li>
                    <li className="nav-item">
                        <select className="form-select">
                            <option value="user" defaultValue>User</option>
                            <option value="tweets">Tweets</option>
                        </select>
                        <input type="search" name="" id="" className="search" />
                    </li>
                    <li className="nav-item">
                        <button className="btnLikes">
                            <small className="likes">Likes</small>
                            <AiFillHeart className="heart" />
                        </button>
                    </li>
                </div>
                <div className="right-side">
                    <li className="nav-item">
                        <Link className="navbar-link" to='/login'>Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="navbar-link" to='/signup' >Sign Up</Link>
                    </li>
                </div>
            </ul>
        </nav>
    )
}

export default Navbar