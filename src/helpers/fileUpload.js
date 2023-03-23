

export const fileUpload = async( file ) => {

    if( !file ) throw new Error('No tenemos ningun archivo a subir');

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dnohawtbk/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try{

        const respuesta = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        if( !respuesta.ok ) throw new Error('No se pudo subir imagen');

        const cloudRespuesta = await respuesta.json();

        return cloudRespuesta.secure_url;

    } catch( error ){
        console.log(error);
        throw new Error( error.message );
    }
}
