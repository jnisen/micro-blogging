/* React */
import { Fragment, useState } from 'react';

/* Packages */
import TextareaAutosize from 'react-textarea-autosize';

/* Components */
import ButtonDisabled from './ButtonDisabled'

const CreateTweet = ({ addTweets }) => {

    const characterLimit = 140;

    const [tweet, setTweets] = useState({
        name: '',
        content: ''
    })

    const [maxtweet, setMaxTweet] = useState(false)

    const handleChange = e => {

        const newTweet = {
            name: 'Pepe',
            content: e.target.value,
        }

        setTweets(newTweet)

        if (e.target.value.length > characterLimit) setMaxTweet(true)
        else setMaxTweet(false)
        
    }

    const handleClick = () => {

        addTweets(tweet)

        const restoreTextArea = {
            name: '',
            content: ''
        }
        
        setTweets(restoreTextArea)
    }

    return (
        <Fragment>
            <TextareaAutosize
                className="texttweet"
                cacheMeasurements
                placeholder="What you have in mind..."
                required
                value={tweet.content}
                minRows={7}
                onChange={handleChange} />
            {maxtweet ?
                <div>
                    <p className="message">The tweet can't contain more than 140 chars</p>
                    <ButtonDisabled/>
                </div>
                :
                tweet.content.length > 0 ?
                    <button className="addtweet"
                        onClick={handleClick}>
                        Tweet
                    </button> :
                   <ButtonDisabled/>}

        </Fragment>
    )
}

export default CreateTweet