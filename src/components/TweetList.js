/* React */
import {useContext} from 'react'

/* Componenets */
import Tweet from './Tweet'

/* Context */
import AuthContext from '../context/AuthContext';

const TweetList = () => {
    const {tweetsAPI} = useContext(AuthContext)

    return (
        <div className="tweetlist">
            {tweetsAPI && tweetsAPI.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)}
 
        </div>
    )
}

export default TweetList