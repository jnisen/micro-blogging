import { initializeApp } from "firebase/app";
import {createContext} from 'react'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

export const FirebaseContext = createContext(null) 

export default function Firebase({ children }) {
    const app = initializeApp(firebaseConfig);
    return (
        <FirebaseContext.Provider value={app}>
            { children }
        </FirebaseContext.Provider>
    )
}

