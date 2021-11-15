import { useRef, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import AuthContext from '../context/AuthContext';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseContext } from '../utils/Firebase'
import { getFirestore, addDoc, collection, query, where, getDocs } from 'firebase/firestore'

export default function Login() {
    const firebase = useContext(FirebaseContext)
    const db = getFirestore(firebase);

    const emailRef = useRef()
    const passwordRef = useRef()
    const history = useHistory()
    const { signup, loginWithGoogle, setLoading } = useContext(AuthContext)
    const auth = getAuth();

    async function loginCustom(e) {

        e.preventDefault()
        
        try {

            const email = emailRef.current.value
            const password = passwordRef.current.value
            const userData = await signInWithEmailAndPassword(auth, email, password)
            signup({ email: userData.user.email, id: userData.user.uid })
            history.push('/')

        } catch (e) {
            if (e.code === 'auth/user-not-found') {
                alert('User not found')
                history.push('/register')
            }
            if (e.code === 'auth/wrong-password') alert('Wrong password')

        }
    }

    async function loginGoogle() {

        try {

            const provider = new GoogleAuthProvider();

            const userData = await signInWithPopup(auth, provider)

            loginWithGoogle({ name: userData.user.displayName, email: userData.user.email, id: userData.user.uid })

            const newUser = {
                uid: userData.user.uid,
                email: userData.user.email,
                name: userData.user.displayName
            }

            // read if that user is already in the db
            const q = query(collection(db, "users"), where("email", "==", userData.user.email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.docs.length !== 1) {
                await addDoc(collection(db, "users"), newUser)
            }

            history.push('/')
            setLoading(true)

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
                        <input type="password" name="password" id="password" required ref={passwordRef}/>
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
