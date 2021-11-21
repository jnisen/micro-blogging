/* React */
import { useState, useContext, useEffect } from 'react'

/* CSS */
import '../index.css';

/* Router */
import { useHistory, useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import { getAuth, updatePassword } from "firebase/auth";
import { createRef } from 'react'

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FirebaseContext } from '../utils/Firebase'
import { getFirestore, query, where, collection, updateDoc, doc, getDocs } from 'firebase/firestore'

const Profile = () => {
    const { id } = useParams();

    const [username, setUsername] = useState('')
    const [profile, setProfile] = useState('')
    const [error, setError] = useState(false)
    const [file, setFile] = useState()
    const [newpassword, setNewPassword] = useState('')
    const [isUser, setIsUser] = useState(true)
    const [isFollow, setIsFollow] = useState(false)
    const [follows, setFollows] = useState([])
    const [followers, setFollowers] = useState([])
    const [userfollow, setUserFollow] = useState()


    const history = useHistory()
    const firebase = useContext(FirebaseContext)
    const db = getFirestore(firebase);

    const { currentUser, loginCustom, userId } = useContext(AuthContext)

    const fileInputRef = createRef()
    const storage = getStorage();

    useEffect(() => {


        async function getPhotoProfile() {

            let q;
            if (currentUser.id === id) {
                q = query(collection(db, "users"), where("uid", "==", currentUser.id));
                setIsUser(true)

            } else {
                q = query(collection(db, "users"), where("uid", "==", id));
                setIsUser(false)
            }

            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {

                if (doc.data().profilePhoto !== '') {
                    setFile(doc.data().profilePhoto)

                }
                setProfile(doc.data().username)
                setFollows(doc.data().hasFollows)
                setFollowers(doc.data().hasFollowers)
                setUserFollow(doc.data().id)

                if (doc.data().hasFollowers.includes(currentUser.id)) {
                    setIsFollow(true)
                }
            })
        }

        getPhotoProfile()



    }, [follows])



    const Upload = async () => {

        try {

            const q = query(collection(db, "users"), where("email", "==", currentUser.email));

            const querySnapshot = await getDocs(q);


            const storageRef = ref(storage, 'images/' + fileInputRef.current.files[0].name);

            const uploadTask = await uploadBytesResumable(storageRef, fileInputRef.current.files[0])

            getDownloadURL(uploadTask.ref).then(async (downloadURL) => {

                setFile(downloadURL);

                querySnapshot.forEach(async (docs) => {

                    const ref = doc(db, "users", docs.id);

                    await updateDoc(ref, {
                        profilePhoto: downloadURL
                    });

                })

            });

        } catch (e) {
            alert(e)
        }
    }

    const handleFollow = async () => {

        const q = query(collection(db, "users"), where("id", "==", userId));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (docs) => {
            const list = [...docs.data().hasFollows, id]
            const refYourProfile = doc(db, "users", userId);
            await updateDoc(refYourProfile, {
                hasFollows: list,
            })

        })

        //follow and change my number
        const refYourProfile = doc(db, "users", userfollow);
        await updateDoc(refYourProfile, {
            hasFollowers: [...followers, currentUser.id],
        })

        setIsFollow(true)
    }

    const handleUnFollow = async () => {

        const index = followers.filter(v => v !== currentUser.id)
        const refYourProfile = doc(db, "users", userfollow);
        await updateDoc(refYourProfile, {
            hasFollowers: index,
        })

        const q = query(collection(db, "users"), where("id", "==", userId));
        const querySnapshot = await getDocs(q);
        const list = []
        querySnapshot.forEach(async (docs) => {
            if (docs.data().hasFollows.includes(id)) {
                const filter = docs.data().hasFollows.filter(v => v !== id)
                const refYourProfile = doc(db, "users", userId);
                await updateDoc(refYourProfile, {
                    hasFollows: filter,
                })
            }
        })


        setIsFollow(false)
    }

    const handleChange = e => {
        setError(false)
        setUsername(e.target.value)
    }

    const saveUsername = async () => {
        if (username.trim().length === 0) {
            setUsername('')
            setError(true)

        } else {

            //const username is my new username
            let q = query(collection(db, "users"), where("email", "==", currentUser.email));
            let querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (docs) => {
                const ref = doc(db, "users", docs.id);
                await updateDoc(ref, {
                    username: username
                });
            })

            //cambiar cada tweet
            q = query(collection(db, "tweets"), where("userId", "==", currentUser.id));
            querySnapshot = await getDocs(q);
            querySnapshot.forEach(async (docs) => {
                const ref = doc(db, "tweets", docs.id);
                await updateDoc(ref, {
                    userName: username,
                    photoProfile: file || ''
                });
            })

            if (loginCustom) {
                if (newpassword) {
                    const auth = getAuth();
                    const user = auth.currentUser;
                    updatePassword(user, newpassword).then(() => {
                        alert('profile changed')
                        history.push('/')
                    }).catch((e) => {
                        const errorMessage = e.message.substring(10, 50)
                        alert(errorMessage)
                    });
                }
            } else {
                alert('profile changed')
                history.push('/')

            }

            setUsername('')
            setError(false)

        }
    }

    return (
        <div className="profile">
            <h2 className="profile-h2">Profile: {profile}</h2>

            {error ? <p className="p-message">You have to add a new userName</p> : null}
            <div className="my-profile">
                <div className="a">
                    {file ? <img src={file} alt={file} className="img-tweet-perfil" /> : <img
                        src="https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6"
                        alt=""
                        className="img-tweet-perfil" />}

                    {isUser && <input type="file" className="ab" ref={fileInputRef} />}
                    {isUser && <button className="ab" onClick={Upload}>Upload</button>}
                </div>
                <div className="profile-profile">
                    {isUser ?
                        <>
                            <label className="profile-username">Change User Name</label>
                            <input
                                type="text"
                                name="username"
                                className="profile-name"
                                placeholder="Enter you username..."
                                maxLength={15}
                                onChange={handleChange}
                                value={username}
                                required
                            /> </> :
                        <>
                            <label className="profile-username">User Name</label>
                            <p className="profile-username" >{profile}</p>
                        </>}
                    {isUser ? loginCustom &&
                        <>
                            <label className="profile-password">Change Password</label>
                            <input
                                type="password"
                                name="password"
                                className="profile-name"
                                placeholder="Enter new password..."
                                maxLength={15}
                                onChange={(e) => setNewPassword(e.target.value)}
                                value={newpassword}
                                required
                            />
                        </> : null}

                    <div className="profile-button">
                        {isUser &&
                            <button
                                className="button-save"
                                onClick={saveUsername}>
                                Save Profile
                            </button>}

                        {!isUser && !isFollow && <button className="button-save" onClick={handleFollow}> Follow </button>}

                        {!isUser && isFollow && <button className="button-save" onClick={handleUnFollow}> UnFollow </button>}
                    </div>
                </div>
            </div>
            <div className="followers">
                <small className="followers">Followers: {followers.length}</small>
                <small className="followers">Follows: {follows.length}</small>
            </div>
        </div>
    )
}

export default Profile