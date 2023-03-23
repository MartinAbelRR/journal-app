import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
    return async( dispatch, getState ) => {
    // El thunks hay un segundo argumento que es el getState, que es una funcion
    // El getState esta todo el estado, todo lo que esta en mi store  

        // Todo: tarea dispatch
        dispatch( savingNewNote() );

        const { uid } = getState().auth;
        // uid

        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime()
        };

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) );
        // Me pide como parametros la referencia al documento donde lo quiero insertar y 
        // luego me pide el objeto que voy a grabar
        await setDoc( newDoc,  newNote );

        newNote.id = newDoc.id;

        //! Dispatch
        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );
    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {
        
        const { uid } = getState().auth;
        if( !uid ) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );
    }
}

export const startSaveNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active : note } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        const docReferencia = doc( FirebaseDB,`${ uid }/journal/notes/${ note.id }`);
        // El merge: Unión, que si hay campos que estoy mando en el noteToFireStore,
        // que no existian en active : note, entonces los campos de estos de mantienen.
        await setDoc( docReferencia, noteToFireStore, { merge: true} );

        dispatch( updateNote( note ) );
    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {
        dispatch( setSaving() );

        // await fileUpload( files[0] );
        const fileUploadPromises = [];
        
        for (const file of files) {
            // Arreglo de promesas
            fileUploadPromises.push(  fileUpload( file ) );
        }

        const photosUrls = await Promise.all( fileUploadPromises );
        
        dispatch( setPhotosToActiveNote(photosUrls) );
    }
}

export const startDeletingNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const docReferencia = doc( FirebaseDB, `${uid}/journal/notes/${ note.id }`);
        await deleteDoc( docReferencia );

        dispatch( deleteNoteById(note.id) );
        
    }
}

