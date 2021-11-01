

const Tweet = ({ tweet }) => {
    const { id, name, content, create_tweet } = tweet;
    return (
        <div className="tweet">
            <div className="dateandname">
                <small>{name}</small>
                <small>{create_tweet}</small>
            </div>
            <div className="content">
                <span>{content}</span>
            </div>
        </div>
    )
}

export default Tweet