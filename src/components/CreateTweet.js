/* React */
import { useState, Fragment, useContext } from 'react';

/* Packages */
import { nanoid } from 'nanoid';

/* Components */
import Button from './Button'



import { FirebaseContext } from '../utils/Firebase'

import { getFirestore, addDoc, collection, query, where, getDocs } from 'firebase/firestore'
import AuthContext from '../context/AuthContext';
const CreateTweet = () => {

    const firebase = useContext(FirebaseContext)
    const db = getFirestore(firebase);
    const { currentUser } = useContext(AuthContext)
    const [tweet, setTweet] = useState('')

    const [maxtweet, setMaxTweet] = useState(false)
    const [minTweet, setMinTweet] = useState(true)

    const username = localStorage.getItem('username')

    const handleChange = e => {

        if (e.target.value.length > 140) setMaxTweet(true)
        else if (e.target.value.length === 0) {
            setMinTweet(true)
            setTweet('')
        }
        else {
            setTweet(e.target.value)
            setMaxTweet(false)
            setMinTweet(false)
        }
    }

    async function handleClick() {

        try {

            const q = query(collection(db, "users"), where("email", "==", currentUser.email));

            const querySnapshot = await getDocs(q);

            querySnapshot.forEach(async (doc) => {

                const newTweet = {
                    userId: doc.id,
                    userName: username,
                    photoProfile: doc.data().profilePhoto || '',
                    content: tweet,
                    date: new Date().toISOString(),
                    likes: 0,
                    hasVoted: []
                }

                setTweet('')

                await addDoc(collection(db, "tweets"), newTweet)

                alert('Doc added into firebase')

            })

        } catch (e) {
            alert("Error adding document:", e)
        }
    }

    return (
        <div className="createTweet">
            <textarea
                className="texttweet"
                placeholder="What you have in mind..."
                required
                value={tweet}
                onChange={handleChange} />
            <div className="clickButton">
                {maxtweet ?
                    <Fragment>
                        <Button tweetstate={maxtweet} />
                        <p className="message">The tweet can't contain more than 140 chars</p>
                    </Fragment> :
                    tweet.length > 0 ?
                        <Button tweetstate={maxtweet} handleClick={handleClick} /> :
                        <Button tweetstate={minTweet} />}
            </div>
        </div>
    )
}

export default CreateTweet