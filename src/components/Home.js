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

    const { isLoading, setTweetsAPI, setLoading, tweetsAPI } = useContext(AuthContext)

    useEffect(() => {

        const interval = setTimeout(async () => {

            const updateState = (snapShot) => {
                const tweetsFromDb = []
                snapShot.forEach(doc => tweetsFromDb.push({ id: doc.id, ...doc.data() }))
                setTweetsAPI(tweetsFromDb)
                setLoading(false)
            }

            const q = query(collection(db, "tweets"), orderBy('date', "desc"));
            const unsub = onSnapshot(q, (querySnapshot) => updateState(querySnapshot))
            return () => unsub()
        }, 1000)

        return () => clearInterval(interval);
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
