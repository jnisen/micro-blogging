/* React */
import { useState, useContext, useEffect } from 'react'

/* CSS */
import '../index.css';

/* Router */
import { useHistory } from 'react-router-dom'
import AuthContext from '../context/AuthContext';

import { createRef } from 'react'

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FirebaseContext } from '../utils/Firebase'
import { getFirestore, query, where, collection, updateDoc, doc, getDocs } from 'firebase/firestore'

const Profile = () => {

    const [username, setUsername] = useState('')
    const [error, setError] = useState(false)

    const history = useHistory()
    const firebase = useContext(FirebaseContext)
    const db = getFirestore(firebase);

    const { currentUser } = useContext(AuthContext)

    const fileInputRef = createRef()
    const storage = getStorage();

    const [file, setFile] = useState()



    useEffect(() => {

        async function getPhotoProfile() {
            const q = query(collection(db, "users"), where("email", "==", currentUser.email));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach(doc =>
                (doc.data().profilePhoto !== '' ? setFile(doc.data().profilePhoto) : null)
            )
        }

        getPhotoProfile()

    }, [])


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







    const handleChange = e => {
        setError(false)
        setUsername(e.target.value)
    }

    const saveUsername = () => {
        if (username.trim().length === 0) {
            setUsername('')
            setError(true)
        } else {
            localStorage.setItem('username', username)
            alert('userName Changed')
            setUsername('')
            setError(false)
            history.push('/')
        }
    }

    return (
        <div className="profile">
            <h2 className="profile-h2">Profile</h2>

            {error ? <p className="p-message">You have to add a new userName</p> : null}
            <div className="my-profile">
                <div className="a">
                    {file ? <img src={file} alt={file} className="img-tweet-perfil" /> : <img
                        src="https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6"
                        alt=""
                        className="img-tweet-perfil" />}

                    <input type="file" className="ab" ref={fileInputRef} />
                    <button className="ab" onClick={Upload}>Upload</button>
                </div>
                <div className="profile-profile">
                    <label className="profile-username">User Name</label>
                    <input
                        type="text"
                        name="username"
                        className="profile-name"
                        placeholder="Enter you username..."
                        maxLength={15}
                        onChange={handleChange}
                        value={username}
                        required
                    />
                    <div className="profile-button">
                        <button
                            className="button-save"
                            onClick={saveUsername}>
                            Save
                        </button>
                    </div>

                </div>
            </div>
            <div className="followers">
                <small className="followers">Followers: 0</small>
                <small className="followers">Follows: 0</small>
            </div>
        </div>
    )
}

export default Profile