import { useContext, Fragment, useEffect } from 'react'
import CreateTweet from './CreateTweet'
import TweetList from './TweetList'
import Spinner from './Spinner'

/* Context */
import AuthContext from '../context/AuthContext';

import { getFirestore, collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { FirebaseContext } from '../utils/Firebase'

export default function Home() {

    const firebase = useContext(FirebaseContext)
    const db = getFirestore(firebase);

    const { isLoading, setTweetsAPI, setLoading, tweetsAPI} = useContext(AuthContext)

    useEffect(() => {


        //setInterval
        const q = query(collection(db, "tweets"), orderBy("date", "desc"))

        onSnapshot(q, (querySnapshot) => {
            const tweetsFromDb = [];
            querySnapshot.forEach((doc) => {
                tweetsFromDb.push({ id: doc.id, ...doc.data() });
            });
            setTweetsAPI(tweetsFromDb)
            setLoading(false)
        });

    }, [])

    return (
        <Fragment>
            <CreateTweet />
            {isLoading && <Spinner />}
            {!isLoading && tweetsAPI.length > 0 && <TweetList />}
            {!isLoading && tweetsAPI.length === 0 && <p className="message">No tweets Available</p>}
        </Fragment>
    )
}
