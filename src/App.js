/* React */
import { Route } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react'

/* Components */
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'

/* CSS */
import './index.css';

/* Provider */
import AuthContext from './context/AuthContext';

import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { FirebaseContext } from './utils/Firebase'

import { getFirestore, collection, query, where, getDocs, orderBy } from 'firebase/firestore'

function App() {

  const auth = getAuth();

  const [tweetsAPI, setTweetsAPI] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)
  const [isUserActive, setIsUserActive] = useState(false)
  const [loginCustom, setLoginCustom] = useState(true)
  const [likesAll, setLikesAll] = useState(false)
  const [filter, setFilter] = useState(false)
  const [tweetsFilter, setTweetsFilter] = useState([])
  const [unlike, setUnlike] = useState(false)
  const [uid, setUid] = useState('')
  const [userId, setUserId] = useState('')
  
  const firebase = useContext(FirebaseContext)
  const db = getFirestore(firebase);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName) setLoginCustom(false)
        else setLoginCustom(true)
        setCurrentUser({ username: user.displayName, email: user.email, id: user.uid })
        setIsUserActive(true)
      }
      else setIsUserActive(true)
    });

  }, [])

  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setCurrentUser(null)
      setLikesAll(true)
      setUid("")
      setUserId('')
    }).catch((e) =>
      alert(e.message)
    )
  }

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const handleLikesHistorial = async () => {
    let q;
    setLikesAll(!likesAll)   
    if (!likesAll) {
        q = query(collection(db, "tweets"), where("hasVoted", "array-contains", currentUser.id), orderBy("date", "desc"))       
    } else {
        q = query(collection(db, "tweets"), orderBy("date", "desc"))
    };
    const querySnapshot = await getDocs(q);
    const list = []
    querySnapshot.forEach(async (docs) => {
        list.push({ id: docs.id, ...docs.data() })
    })
    
    
    setTweetsAPI(list)
  }


  const value = {
    tweetsAPI,
    isLoading,
    setLoading,
    setTweetsAPI,
    currentUser,
    loginCustom,
    setLoginCustom,
    likesAll,
    setLikesAll,
    filter,
    setFilter,
    tweetsFilter,
    setTweetsFilter,
    unlike,
    setUnlike,
    uid,
    setUid,
    userId, 
    setUserId,
    signup,
    login: (currentUser) => setCurrentUser(currentUser),
    loginWithGoogle: (currentUser) => setCurrentUser(currentUser),
    logout,
    handleLikesHistorial
  }

  return (
    <AuthContext.Provider value={value}>
      {isUserActive &&
       
        <div className="app">
          <Navbar />
          <div className="container">
            <PrivateRoute path="/" exact component={Home} />
            <PrivateRoute path= "/profile/:id" component={Profile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </div>
        </div>}
    </AuthContext.Provider>
  );
}

export default App;
