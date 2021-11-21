import { useRef, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import AuthContext from '../context/AuthContext';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseContext } from '../utils/Firebase'
import { getFirestore, addDoc, collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore'
import { AiOutlineConsoleSql } from 'react-icons/ai';

export default function Login() {
    const firebase = useContext(FirebaseContext)
    const db = getFirestore(firebase);

    const emailRef = useRef()
    const passwordRef = useRef()
    const history = useHistory()
    const { signup, loginWithGoogle, setLoading, setLoginCustom, setUid, setUserId } = useContext(AuthContext)
    const auth = getAuth();

    async function loginCustom(e) {

        e.preventDefault()

        const email = emailRef.current.value
        const password = passwordRef.current.value

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const userData = userCredential.user;
                history.push('/')                
                setLoginCustom(true)
                setUid(userData.uid)
                signup({ email: userData.user.email, id: userData.user.uid })
            })
            .catch((e) => {
                if (e.code === 'auth/user-not-found') {
                    alert('user not found, go to sign up')
                    history.push('/signup')
                }
                if (e.code === 'auth/wrong-password') alert('wrong password')
            });

            const q = query(collection(db, "users"), where("email", "==", email));
            const querySnapshot = await getDocs(q);
            setUserId(querySnapshot.docs[0].id)
    }

    async function loginGoogle() {

        try {

            const provider = new GoogleAuthProvider();

            const userData = await signInWithPopup(auth, provider)

            loginWithGoogle({ username: userData.user.displayName, email: userData.user.email, id: userData.user.uid })

            const newUser = {
                email: userData.user.email,
                username: userData.user.displayName,
                uid: userData.user.uid,
                hasFollowers: [],
                hasFollows: []
            }

            // read if that user is already in the db
            const q = query(collection(db, "users"), where("email", "==", userData.user.email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.docs.length !== 1) {
                const response = await addDoc(collection(db, "users"), newUser)
                const ref = doc(db, "users", response.id)
                await updateDoc(ref, {
                    id: response.id
                });
                setUserId(response.id)
            } else {
                setUserId(querySnapshot.docs[0].id)
            }

            setLoading(true)
            setLoginCustom(false)
            setUid(userData.user.uid)
            history.push('/')


        } catch (e) {
            alert(e.message)
        }
    }

    return (
        <div className="login">
            <p className="heading">Login</p>
            <form id="form-login" className="main__login" onSubmit={loginCustom}>
                <div className="box">
                    <label htmlFor="email">Email: </label>
                    <div>
                        <input type="email" name="email" id="email" ref={emailRef} required />
                    </div>
                </div>
                <div className="box">
                    <label htmlFor="password">Password: </label>
                    <div>
                        <input type="password" name="password" id="password" required ref={passwordRef} />
                    </div>
                </div>
                <input type="submit" value="Login" className="loginBtn" />
                <p className="aaa">Or</p>
                <button onClick={loginGoogle} value="Login" className="loginBtn">
                    <FcGoogle /> <small className="google">Login with Google</small>
                </button>
                <p className='text'>Don't have an account? <Link to="/signup">Sign up</Link> </p>
            </form>
        </div>
    )
}
