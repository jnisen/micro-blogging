/* css */
import '../index.css'

const Button = ({ tweetstate, handleClick }) => (

    <button className={`${tweetstate ? "disabletweet" : "addtweet"}`} disabled={tweetstate}
        onClick={handleClick}>
        Tweet
    </button>
)

export default Button