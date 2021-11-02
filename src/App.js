/* React */
import { Fragment, useState, useEffect } from 'react';

/* Components */
import CreateTweet from './components/CreateTweet'
import TweetList from './components/TweetList'
import Spinner from './components/Spinner'
import ButtonDisabled from './components/ButtonDisabled'

/* CSS */
import './index.css';

/* Packages */
import moment from 'moment'
import { nanoid } from 'nanoid';
import axios from 'axios'

/* Helpers*/
import { sortByCreateTweet } from './helpers'

function App() {

  const serverTweets = 'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet'

  const [tweets, setTweets] = useState([])
  const [spinner, setSpinner] = useState(false)

  useEffect(() => {

    async function getTweetsFromApi() {

      const api = await axios(serverTweets)
      const data = api.data.tweets

      data.forEach(element => {
        setTweets(oldTweets => [...oldTweets, element])
      });

      setSpinner(true)

      setTimeout(() => {
        setSpinner(false)
      }, 3000)
    }
    getTweetsFromApi()
  }, [])


  async function addTweets(tweet) {
    try {
      const newTweet = {
        id: nanoid(),
        userName: tweet.userName,
        content: tweet.content,
        date: moment().format('')
      }

      const newTweetToAdd = [...tweets, newTweet]

      sortByCreateTweet(newTweetToAdd)

      setTweets(newTweetToAdd)

      const response = await axios.post(serverTweets, newTweet)

      if (response.status === 404) throw new Error('The url provided is not working')

    } catch (e) {
      alert(e)
    }
  }


  return (
    <Fragment>
      <div className="container">
        <CreateTweet addTweets={addTweets} />
      </div>
      <div className="tweetlist">
        {spinner ?
          <Fragment>
            <Spinner />
            <ButtonDisabled />
          </Fragment> :
          <TweetList tweets={tweets} />
        }
      </div>
    </Fragment>
  );
}

export default App;
