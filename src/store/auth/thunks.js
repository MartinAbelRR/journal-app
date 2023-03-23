import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./"

export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {   

        dispatch( checkingCredentials() );
    }
}

export const startGoogleSignIn = () => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const resultado = await singInWithGoogle();
        if( !resultado.ok ) return dispatch( logout( resultado.errorMessage ) );

        dispatch( login( resultado ) );
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });

        if( !ok) return dispatch( logout({ errorMessage }) );

        dispatch( login({ uid, displayName, email, photoURL}));
    }
}

export const starLoginWithEmailPassword = ({email, password}) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const resultado = await loginWithEmailPassword({ email, password});

        if( !resultado.ok ) return dispatch( logout( resultado ));

        dispatch( login( resultado ));

    }
}

export const startLogout = () => {
    return async( dispatch ) => {
       
        await logoutFirebase();

        dispatch( clearNotesLogout() );

        dispatch( logout() );
    }
}
