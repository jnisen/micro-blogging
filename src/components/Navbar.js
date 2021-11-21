/* React */
import { Link } from 'react-router-dom';
/* css */
import '../index.css'

import { useContext, Fragment, useState } from 'react';


import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import AuthContext from '../context/AuthContext';
import { getFirestore, collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { FirebaseContext } from '../utils/Firebase'
const Navbar = () => {

    const { currentUser, logout, likesAll, handleLikesHistorial, setTweetsAPI, uid } = useContext(AuthContext)

    const [search, setSearch] = useState('')
    const firebase = useContext(FirebaseContext)
    const db = getFirestore(firebase);

    async function handleSearch(e) {
        const list = []
        let q;
        let querySnapshot;

        if (search.length > 0) {

            switch (e.target.value) {
                case "user":
                    q = query(collection(db, "tweets"), where('userName', '==', search), orderBy('date', "desc"));
                    querySnapshot = await getDocs(q);
                    querySnapshot.forEach((docs) => {
                        list.push({ id: docs.id, ...docs.data() })
                    })
                    setTweetsAPI(list)
                    break;
                case "tweets":
                    q = query(collection(db, "tweets"), where('content', '==', search), orderBy('date', "desc"));
                    querySnapshot = await getDocs(q);
                    querySnapshot.forEach((docs) => {
                        list.push({ id: docs.id, ...docs.data() })
                    })
                    setTweetsAPI(list)
                    break;
                case "all":
                    q = query(collection(db, "tweets"), orderBy('date', "desc"));
                    querySnapshot = await getDocs(q);
                    querySnapshot.forEach((docs) => {
                        list.push({ id: docs.id, ...docs.data() })
                    })
                    setTweetsAPI(list)
                    break;
                default:
            }
        }

    }


    return (
        <nav className="navbar">
            <ul className="navbar-ul">
                <div className="left-side">
                    <li className="nav-item">
                        {currentUser && <Link className="navbar-link" to='/' >Home</Link>}
                    </li>
                    <li className="nav-item">
                        {currentUser && <Link className="navbar-link" to={`/profile/${uid}`}>Profile</Link>}
                    </li>
                    <li className="nav-item">
                        {currentUser &&
                            <Fragment>
                                <select className="form-select" onClick={handleSearch}>
                                    <option value='all' defaultValue>All</option>
                                    <option value="user">User</option>
                                    <option value="tweets">Tweets</option>
                                </select>
                                <input type="text" name="text" id="text" className="search" onChange={(e) => setSearch(e.target.value)} value={search} />
                            </Fragment>}
                    </li>
                    <li className="nav-item">
                        {currentUser &&
                            !likesAll ?
                            <button className="btnLikes" onClick={handleLikesHistorial}>
                                <small className="likes">Likes</small>
                                <AiFillHeart className="heart" />
                            </button> :
                            currentUser && <button className="btnLikes" onClick={handleLikesHistorial}>
                                <small>All Tweets</small>
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