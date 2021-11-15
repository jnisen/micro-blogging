import { useContext, Fragment} from 'react'
import CreateTweet from './CreateTweet'
import TweetList from './TweetList'
import Spinner from './Spinner'

/* Context */
import TwitterContext from '../context/twitterContext';

export default function Home() {

    const { isLoading } = useContext(TwitterContext)

    return (
        <Fragment>
            <CreateTweet />
            {isLoading ?
                <Spinner /> :
                <TweetList />}
        </Fragment>
    )
}
