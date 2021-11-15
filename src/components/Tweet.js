
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useState, useContext, useEffect, Fragment} from 'react'
import { getFirestore, updateDoc, doc, query, collection, getDocs } from 'firebase/firestore'

/* Context */
import AuthContext from '../context/AuthContext';
import { FirebaseContext } from '../utils/Firebase'
const Tweet = ({ tweet }) => {
    const { id, userName, content, date, photoProfile, likes, hasVoted } = tweet;

    const [liked, setLiked] = useState(false);
    const [voted, setHasVoted] = useState()
    const db = getFirestore()
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {

        const idAndHasVoted = {
            id: id,
            hasVoted: hasVoted
        }

        setHasVoted(idAndHasVoted)

    }, [tweet])


    const handleLike = async (id) => {

        const sumLike = likes + 1

        const q = query(collection(db, "tweets"));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (docs) => {

            if (docs.id === id) {

                if (!docs.data().hasVoted.includes(currentUser.id)) {

                    const newVoters = [...docs.data().hasVoted, currentUser.id]

                    const ref = doc(db, "tweets", docs.id);

                    await updateDoc(ref, {
                        likes: sumLike,
                        hasVoted: newVoters
                    });

                }


            }

        })
        setLiked(!liked)

    }

    const handleUnlike = async (id) => {

        const minusLike = likes - 1

        const q = query(collection(db, "tweets"));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (docs) => {

            if (docs.id == id) {

                if (docs.data().hasVoted.includes(currentUser.id)) {

                    const ref = doc(db, "tweets", docs.id);


                    const removeHasVoted = docs.data().hasVoted.slice(0, docs.data().hasVoted.findIndex(voted => voted === currentUser.id))

                    await updateDoc(ref, {
                        likes: minusLike,
                        hasVoted: removeHasVoted

                    });



                }
            }

        })
        setLiked(!liked)

    }

    return (
        <div className="tweet">
            <img
                src={photoProfile}
                alt=""
                className="img-tweet" />
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