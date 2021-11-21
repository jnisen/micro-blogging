import React from 'react'
import AuthContext from '../context/AuthContext';
import { FirebaseContext } from '../utils/Firebase'
import { useRef, Fragment, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { getFirestore, addDoc, collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore'

export default function Signup() {
    const firebase = useContext(FirebaseContext)
    const db = getFirestore(firebase);
    const emailRef = useRef()
    const passwordRef = useRef()
    const usernameRef = useRef()
    const history = useHistory()

    const { signup, setUid, setUserId } = useContext(AuthContext)

    async function createUser(e) {
        e.preventDefault()
        try {

            

            const email = emailRef.current.value
            const password = passwordRef.current.value
            const username = usernameRef.current.value

            const resultado = await signup(email, password)

            const newUser = {
                username: username,
                email: email,
                uid: resultado.user.uid,
                hasFollowers: [],
                hasFollows: []
    
            }

            const q = query(collection(db, "users"), where("email", "==", email));

            const querySnapshot = await getDocs(q);

            if (querySnapshot.docs.length !== 1) {
                const response = await addDoc(collection(db, "users"), newUser)
                const ref = doc(db, "users", response.id)
                await updateDoc(ref, {
                    id: response.id
                });
                setUserId(response.id)
            }

            setUid(resultado.user.uid)
            history.push('/')

        } catch (e) {
            const errorCode = e.code
            if (errorCode === 'auth/email-already-in-use') alert('Email already in use')
            else {
                const errorMessage = e.message.substring(10, 50)
                alert(errorMessage)
            };
        }
    }

    return (
        <div className="login">
            <p className="heading">Sign up</p>
            <form id="form-login" className="main__login" onSubmit={createUser}>
                <div className="box">
                    <label htmlFor="username">Username: </label>
                    <div>
                        <input type="username" name="username" id="username" ref={usernameRef} />
                    </div>
                </div>
                <div className="box">
                    <label htmlFor="email">Email: </label>
                    <div>
                        <input type="email" name="email" id="email" ref={emailRef} />
                    </div>
                </div>
                <div className="box">
                    <label htmlFor="password">Password: </label>
                    <div>
                        <input type="password" name="password" id="password" ref={passwordRef} />
                    </div>
                </div>
                <input type="submit" value="Sign Up" className="loginBtn" />
            </form>
        </div>
    )
}