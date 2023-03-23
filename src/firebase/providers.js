import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from  'firebase/auth';
import { FirebaseAuth } from './config';
 
const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {

    try {
        
        const resultado = await signInWithPopup( FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult( resultado );
        const { displayName, email, photoURL, uid } = resultado.user;


        return {
            ok: true,
            // User info
            displayName, email, photoURL, uid
        }

        

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok : false,
            errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async({ email, password, displayName }) => {

    try {

        const respuesta = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        // console.log( respuesta );
        const { uid, photoURL } = respuesta.user;
        // TODO: actualizar el displayName en Firebase
        
        // Actualizar en firebase
        await updateProfile( FirebaseAuth.currentUser, {
            displayName
        } );

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        return {
            ok: false,
            errorMessage : error.message
        }        
    }
}

export const loginWithEmailPassword = async({ email, password }) => {

    try {        
        
        const respuesta = await signInWithEmailAndPassword(FirebaseAuth ,email, password);
        const { uid, photoURL, displayName } = respuesta.user;

        return{
            ok: true,
            uid, photoURL, displayName
        }

    } catch (error) {
        return {
            ok: false,
            errorMessage : error.message
        }
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}