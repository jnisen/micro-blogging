/* React */
import {useContext} from 'react'

/* Componenets */
import Tweet from './Tweet'

/* Context */
import { TwitterContext } from '../context/twitterContext';

const TweetList = () => {

    const {tweetsAPI} = useContext(TwitterContext)

    return (
        <div>
            {tweetsAPI.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)}
        </div>
    )
}

export default TweetList