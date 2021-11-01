/* React */
import { Fragment, useState, useEffect } from 'react';

/* Components */
import CreateTweet from './components/CreateTweet'
import TweetList from './components/TweetList'

/* CSS */
import './index.css';

/* Packages */
import moment from 'moment'
import { nanoid } from 'nanoid';

/* localForage */
import * as localForage from "localforage";

/* Helpers*/
import {sortByCreateTweet} from './helpers'

function App() {

  const [tweets, setTweets] = useState([
    { id: nanoid(), name: 'Jonathan', content: 'hello world', create_tweet: moment().format('') },
  ])

  useEffect(() => {
    async function getTweetsFromForage() {
      const savedTweets = await localForage.getItem('tweets')
      if (savedTweets) {
        sortByCreateTweet(savedTweets)
        setTweets(savedTweets)
      }
    }
    getTweetsFromForage()
  }, [tweets])


  function addTweets(tweet) {

    const newTweet = {
      id: nanoid(),
      name: tweet.name,
      content: tweet.content,
      create_tweet: moment().format('')
    }

    const newTweetToAdd = [...tweets, newTweet]
    
    sortByCreateTweet(newTweetToAdd)

    setTweets(newTweetToAdd)

    localForage.setItem('tweets', newTweetToAdd)
  }





  return (
    <Fragment>
      <div className="container">
        <CreateTweet addTweets={addTweets} />
      </div>
      <div className="tweetlist">
        <TweetList tweets={tweets} />
      </div>
    </Fragment>
  );
}

export default App;
