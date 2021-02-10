import React, { Fragment, useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    /*
    * State para citas
    * cita -> guarda toda la información de la cita
    * actualizar cita actualiza el state
    */

    const [cita, actualizarCita ] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    /**
     * State para manejar errores del formulario
     */

    const [error, actualizarError] = useState(false);
    /**
     * Función para leer los cambios en el input
     */

     const actualizarState = (event) => {
         actualizarCita({...cita,
            [event.target.name]: event.target.value,
         })
     }

     /**
      * Extraer valores de cita en el state
      * Usarlos como value para resetear formulario
      */

      const {mascota, propietario, fecha, hora, sintomas} = cita;

    /**
     * Funcion par submit para guardar cita
     * 
     */

    const submitCita = (e) => {
        e.preventDefault();
        // validación
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
            actualizarError(true);
            // detener la función en caso de encontrar error
            return;
        }
        // eliminar mensaje previo de error 
        actualizarError(false);
        // asignar id o key
        cita.id=uuidv4();
        // crear cita 
        crearCita(cita);
        // reiniciar form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: '' 
        });

    }

    return (
        <Fragment>
            <h2>Crear Cita</h2>
            
            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}
            
            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre del dueño"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                >

                </textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment>
    );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;