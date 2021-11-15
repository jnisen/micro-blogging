/* React */
import { Route } from 'react-router-dom';

/* Components */

import Navbar from './components/Navbar'
import Profile from './components/Profile'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'

/* CSS */
import './index.css';

/* Provider */
import TwitterContext from './context/twitterContext';

/* Packages */
import axios from 'axios'

import {useEffect, useState} from 'react'


function App() {

  const serverTweets = 'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet'

  const [tweetsAPI, setTweetsAPI] = useState([])
  const [isLoading, setLoading] = useState(true)


  useEffect(() => {

      const interval = setTimeout(async () => {

          const api = await axios(serverTweets)
          const data = api.data.tweets

          setTweetsAPI(data)
          setLoading(false)
      }, 1000)


      return () => clearInterval(interval);
  }, [tweetsAPI])



  const value = { tweetsAPI, isLoading }




  return (
    <TwitterContext.Provider value={value}>
      <div className="app">
        <Navbar />
        <div className="container">
          <Route path="/" exact component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </div>
      </div>
    </TwitterContext.Provider>
  );
}

export default App;
