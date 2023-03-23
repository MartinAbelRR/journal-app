import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { startLoadingNotes } from "../store/journal/thunks";


export const useCheckAuth = () => {
    const {status} = useSelector(state => state.auth);
    const dispatch = useDispatch();
  
    useEffect(() => {
      // Una funcion que regresa observable, esto es mas que todo 
      // como rxjs. Un observable no es más que una función que esta
      // emitiendo valores, es decir, cuando el estado de la autenticacion
      // cambia, esta funcion se va a volver a disparar.
      onAuthStateChanged( FirebaseAuth, async( user ) => {
          if( !user ) return dispatch( logout() );
  
          const { uid, email, displayName, photoURL } = user;
          dispatch( login({uid, email, displayName, photoURL}));          
          dispatch( startLoadingNotes() );
      })
  
    }, []);
    
    return {
        status
    }
}
