/* React */
import { Fragment, useState } from 'react';

/* Packages */
import TextareaAutosize from 'react-textarea-autosize';
import { nanoid } from 'nanoid';

/* Components */
import ButtonDisabled from './ButtonDisabled'

/* Packages */
import axios from 'axios'

const CreateTweet = () => {

    const characterLimit = 140;

    const [tweets, setTweets] = useState({
        userName: '',
        content: '',
    })

    const [maxtweet, setMaxTweet] = useState(false)


    const username = localStorage.getItem('username')

    const handleChange = e => {

        const newTweet = {
            id: nanoid(),
            userName: username,
            content: e.target.value,
            date: new Date().toISOString()
        }

        setTweets(newTweet)


        if (e.target.value.length > characterLimit) setMaxTweet(true)
        else setMaxTweet(false)

    }

    async function handleClick() {

        try {
            const serverTweets = 'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet'

            const response = await axios.post(serverTweets, tweets)

            const restoreTextArea = {
                userName: '',
                content: ''
            }

            setTweets(restoreTextArea)

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
                    value={tweets.content}
                    minRows={7}
                    onChange={handleChange} />
                {maxtweet ?
                    <div>
                        <p className="message">The tweet can't contain more than 140 chars</p>
                        <ButtonDisabled />
                    </div>
                    :
                    tweets.content.length > 0 ?
                        <button className="addtweet"
                            onClick={handleClick}>
                            Tweet
                        </button> :
                        <ButtonDisabled />}

            </Fragment>
        )
    }

    export default CreateTweet