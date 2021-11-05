/* React */
import { Route, Switch } from 'react-router-dom';

/* Components */
import CreateTweet from './components/CreateTweet'
import TweetList from './components/TweetList'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import Spinner from './components/Spinner'

/* CSS */
import './index.css';

/* Provider */
import TwitterProvider from './context/twitterContext';

/* React */
import { useEffect, useState, Fragment } from "react";
import Button from './components/Button';

/* Page */
import NotFound from './NotFound'

/* hosting firbase name : https://microblogging-app-mb555.web.app/ */

function App() {

  const stateButton = true;

  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
    }, 1500);
    setSpinner(true);
  }, []);

  return (
    <TwitterProvider>
      <div className="wrapper">
        <Navbar />
        <Switch>
          <Route path="/" exact >
            <div className="container">
              <CreateTweet />
            </div>
            <div className="tweetlist">
              {spinner ?
                <Fragment>
                  <Spinner />
                  <Button tweetstate={stateButton} />
                </Fragment>
                :
                <TweetList />}
            </div>
          </Route>
          <Route path="/profile" component ={Profile}/>
          <Route path={"*"} component={NotFound} />
        </Switch>
      </div>
    </TwitterProvider>
  );
}

export default App;
