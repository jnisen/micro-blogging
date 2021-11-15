/* React */
import { useState, Fragment, useContext} from 'react';

/* Packages */
import { nanoid } from 'nanoid';

/* Components */
import Button from './Button'

/* Packages */
import axios from 'axios'

const CreateTweet = () => {

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

            const newTweet = {
                id: nanoid(),
                userName: username,
                content: tweet,
                date: new Date().toISOString()
            }

            const serverTweets = 'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet'

            const response = await axios.post(serverTweets, newTweet)

            setTweet('')

            if (response.status === 404) throw new Error('The url provided is not working')

        } catch (e) {
            alert(e)
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
                        <Button tweetstate={maxtweet}/>
                        <p className="message">The tweet can't contain more than 140 chars</p>
                    </Fragment> :
                    tweet.length > 0   ?
                        <Button tweetstate={maxtweet} handleClick={handleClick} /> :
                        <Button tweetstate={minTweet} />}
            </div>
        </div>
    )
}

export default CreateTweet