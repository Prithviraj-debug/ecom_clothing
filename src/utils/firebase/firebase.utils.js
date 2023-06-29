import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDgr7w8EvIKPl8UlJuaD9UrtDhhR2EPb94",
    authDomain: "clothing-db-8f579.firebaseapp.com",
    projectId: "clothing-db-8f579",
    storageBucket: "clothing-db-8f579.appspot.com",
    messagingSenderId: "264946973727",
    appId: "1:264946973727:web:3b3e184ad830794225292a"
};
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt
            })
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
}