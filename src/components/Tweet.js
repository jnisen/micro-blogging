
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useState, useContext, useEffect, Fragment } from 'react'
import { getFirestore, updateDoc, doc, query, collection, getDocs, where, orderBy } from 'firebase/firestore'

/* Context */
import AuthContext from '../context/AuthContext';
import { FirebaseContext } from '../utils/Firebase'

/* React */
import { Link } from 'react-router-dom';


const Tweet = ({ tweet }) => {
    const { id, userName, content, date, photoProfile, likes, hasVoted, userId } = tweet;
    const firebase = useContext(FirebaseContext)
    const [voted, setHasVoted] = useState()
    const db = getFirestore(firebase)
    const { currentUser, setLikesAll, tweetsAPI, setUnlike, likesAll, unlike } = useContext(AuthContext)

    useEffect(() => {
        //render everytweet 
        const idAndHasVoted = {
            id: id,
            hasVoted: hasVoted
        }
        setHasVoted(idAndHasVoted)

    }, [tweet])


    const handleLike = async (id) => {
        const sumLike = likes + 1
        const tweet = tweetsAPI.find(tweet => tweet.id === id)
        if (!tweet.hasVoted.includes(currentUser.id)) {
            const votes = [...tweet.hasVoted, currentUser.id]
            const ref = doc(db, "tweets", id);
            await updateDoc(ref, {
                likes: sumLike,
                hasVoted: votes
            });
        }
        setUnlike(false)
    }

    const handleUnlike = async (id) => {
        const minusLike = likes - 1
        const tweet = tweetsAPI.find(tweet => tweet.id === id)
        if (tweet.hasVoted.includes(currentUser.id)) {
            const votes = tweet.hasVoted.splice(0, tweet.hasVoted.findIndex(v => v.id === currentUser.id))
            const ref = doc(db, "tweets", id);
            await updateDoc(ref, {
                likes: minusLike,
                hasVoted: votes
            });

        }


        setUnlike(true)

    }

    // function handleProfile (userId){
    //     console.log(userId)
    // }

    return (
        <div className="tweet">
            <Link className="navbar-link" to={`/profile/${userId}`}> 
            {photoProfile && <img
                src={photoProfile}
                alt=""
                className="img-tweet" />}</Link>

            <div className="a1">
                <div className="dateandname">
                    <small>{userName}</small>
                    <small>{date}</small>
                </div>
                <div className="content">
                    <span>{content}</span>
                </div>
                <div className="icons">
                    <div className="hearted">
                        {voted && !voted.hasVoted.includes(currentUser.id) ?
                            <Fragment>
                                <AiOutlineHeart className="heart" onClick={() => handleLike(id)} />
                                <small className="a2">{likes}</small>
                            </Fragment> :
                            <Fragment>
                                <AiFillHeart className="heart" onClick={() => handleUnlike(id)} />
                                <small className="a2">{likes}</small>
                            </Fragment>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tweet