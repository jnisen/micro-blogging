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
import ButtonDisabled from './components/ButtonDisabled';

/* Page */
import NotFound from './NotFound'

function App() {

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
                  <ButtonDisabled />
                </Fragment>
                :
                <TweetList />}
            </div>
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
            <Route path={"*"} component={NotFound} />
        </Switch>
      </div>
    </TwitterProvider>
  );
}

export default App;
