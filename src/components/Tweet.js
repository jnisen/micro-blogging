

const Tweet = ({ tweet }) => {
    const { id, userName, content, date } = tweet;
    return (
        <div className="tweet">
            <div className="dateandname">
                <small>{userName}</small>
                <small>{date}</small>
            </div>
            <div className="content">
                <span>{content}</span>
            </div>
        </div>
    )
}

export default Tweet