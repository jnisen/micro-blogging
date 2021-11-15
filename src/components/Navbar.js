/* React */
import { Link } from 'react-router-dom';
/* css */
import '../index.css'

import { useContext, Fragment } from 'react';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import AuthContext from '../context/AuthContext';

const Navbar = () => {

    const { currentUser, logout } = useContext(AuthContext)

    console.log(currentUser)

    return (
        <nav className="navbar">
            <ul className="navbar-ul">
                <div className="left-side">
                    <li className="nav-item">
                        {currentUser && <Link className="navbar-link" to='/' >Home</Link>}
                    </li>
                    <li className="nav-item">
                        {currentUser && <Link className="navbar-link" to='/profile'>Profile</Link>}
                    </li>
                    <li className="nav-item">
                        {currentUser &&
                            <Fragment>
                                <select className="form-select">
                                    <option value="user" defaultValue>User</option>
                                    <option value="tweets">Tweets</option>
                                </select>
                                <input type="search" name="" id="" className="search" />
                            </Fragment>}
                    </li>
                    <li className="nav-item">
                        {currentUser &&

                            <button className="btnLikes">
                                <small className="likes">Likes</small>
                                <AiFillHeart className="heart" />
                            </button>}
                    </li>
                </div>
                <div className="right-side">
                    <li className="nav-item">
                        {!currentUser && <Link className="navbar-link" to='/login'>Login</Link>}
                    </li>
                    <li className="nav-item">
                        {!currentUser && <Link className="navbar-link" to='/signup' >Sign Up</Link>}
                    </li>
                    <li className="nav-item">
                        {currentUser && <Link className="navbar-link" to='/login' onClick={logout}>Log Out</Link>}
                    </li>
                </div>
            </ul>
        </nav>
    )
}

export default Navbar