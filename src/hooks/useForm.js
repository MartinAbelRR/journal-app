import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidation, setFormValidation ] = useState({});

    // SE VA A DISPARAR CADA VEZ QUE EL FORMSTATE CAMBIE
    // VOY A MANDAR A LLAMAR EL CREATEVALIDARTOS, ES DECIR, 
    // CADA VEZ QUE HAY UN CAMBIO EN EL STATE DEL FORMULARIO,
    // CAMBIO EL INPUT EL NOMBRE, EL EMAIL, SE VUELVE A EJECUTAR
    // LA FUNCION
    useEffect(() => {
      createValidators();    
    }, [ formState ]);

    // CUANDO EL INICIALFORM CAMBIA, ENTONCES QUIERO QUE SE DISPARE
    // ESE EFECTO.
    useEffect(() => {
        setFormState( initialForm );
    }, [ initialForm ]);
    
    
    // NECESITO MEMORIZAR EL VALOR QUE RETORNA ESTA FUNCION
    const isFormValid = useMemo( () => {

        for (const formValue of Object.keys( formValidation )) {
            if ( formValidation[formValue] !== null ) return false; 
        }

        return true;
    }, [ formValidation ]);


    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {

        const formCheckedValues = {};

        for (const formField of Object.keys( formValidations )) {
            const [ fn, errorMessage = 'Este campo es requerido' ] = formValidations[formField];

            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
        }

        setFormValidation( formCheckedValues );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}