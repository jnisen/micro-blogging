/* React */
import { Fragment, useState } from 'react';

/* Packages */
import TextareaAutosize from 'react-textarea-autosize';
import { nanoid } from 'nanoid';

/* Components */
import Button from './Button'

/* Packages */
import axios from 'axios'

const CreateTweet = () => {

    const characterLimit = 140;

    const [tweets, setTweets] = useState('')

    const [maxtweet, setMaxTweet] = useState(false)
    const [minTweet, setMinTweet] = useState(true)

    const username = localStorage.getItem('username')

    const handleChange = e => {

        if (e.target.value.length > characterLimit) setMaxTweet(true)
        else if (e.target.value.length === 0) 
        {
            setMinTweet(true)
            setTweets('')
        }
        else 
        {
            setTweets(e.target.value)
            setMaxTweet(false)
            setMinTweet(false)
        }
    }

    async function handleClick() {

        try {
    
            const newTweet = {
                id: nanoid(),
                userName: username,
                content: tweets,
                date: new Date().toISOString()
            }   

            const serverTweets = 'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet'

            const response = await axios.post(serverTweets, newTweet)

            setTweets('')

            if (response.status === 404) throw new Error('The url provided is not working')

        } catch (e) {
            alert(e)
        }
    }

        return (
            <Fragment>
                <TextareaAutosize
                    className="texttweet"
                    cacheMeasurements
                    placeholder="What you have in mind..."
                    required
                    value={tweets}
                    minRows={7}
                    onChange={handleChange} />
                {maxtweet ?
                    <div>
                        <p className="message">The tweet can't contain more than 140 chars</p>
                        <Button tweetstate={maxtweet} />
                    </div>
                    :
                    tweets.length > 0 ?
                        <Button tweetstate={maxtweet} handleClick={handleClick} /> :
                        <Button tweetstate={minTweet} />}

            </Fragment>
        )
    }

    export default CreateTweet