                                                                        /* eslint-disable no-unused-vars */
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';


const googleProvider = new GoogleAuthProvider ();

export const signInWithGoogle = async() => {

    try {

        const result = await signInWithPopup(FirebaseAuth, googleProvider )
        // const credentials = GoogleAuthProvider.credentialFromResult ( result );
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            // User info
            displayName, email, photoURL, uid
        }
        
    } catch (error) {

        // eslint-disable-next-line no-unused-vars
        const errorCode = error.code;
        const errorMesagge = error.mesagge;

        return {
            ok: false,
            errorMesagge,
        }
        
    }
}


export const registerUserWithEmailPassword = async({ email, password, displayName }) => {

    try {

        const resp = await createUserWithEmailAndPassword ( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;

        //TODO: actualizar el displayName en Firebase
        await updateProfile( FirebaseAuth.currentUser,{ displayName } )

        return {
            ok: true,
            uid, photoURL, email, displayName
        }           


    } catch (error) {
        console.log(error);
        return { ok: false, errorMesagge: error.mesagge}
        
    }
}

export const loginWithEmailPassword = async({ email, password }) => {
    
    try {

        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid, photoURL, displayName
        }
        
    } catch (error) {
        return { ok: false, errorMesagge: error.mesagge}
        
    }
}

    export const logoutFirebase = async() => {

        return await FirebaseAuth.signOut();
    }


