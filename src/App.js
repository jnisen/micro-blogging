/* React */
import { Route } from 'react-router-dom';
import { useState, useEffect } from 'react'

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
import TwitterContext from './context/AuthContext';

import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signOut } from "firebase/auth";


function App() {

  const auth = getAuth();

  const [tweetsAPI, setTweetsAPI] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)
  const [isUserActive, setIsUserActive] = useState(false)

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log(user)
      if (user) {
        setCurrentUser({ name: user.displayName, email: user.email, id:user.uid })
        setIsUserActive(true)
      }
      else setIsUserActive(true)
    });

  }, [])

  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setCurrentUser(null)
    }).catch((e) =>
      alert(e.message)
    )
  }

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }


  const value = {
    tweetsAPI,
    isLoading,
    setLoading,
    setTweetsAPI,
    currentUser,
    signup,
    login: (currentUser) => setCurrentUser(currentUser),
    loginWithGoogle: (currentUser) => setCurrentUser(currentUser),
    logout
  }

  return (
    <TwitterContext.Provider value={value}>
      {isUserActive &&
        <div className="app">
          <Navbar />
          <div className="container">
            <PrivateRoute path="/" exact component={Home} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </div>
        </div>}
    </TwitterContext.Provider>
  );
}

export default App;
