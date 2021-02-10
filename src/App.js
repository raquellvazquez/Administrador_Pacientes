import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  /**
 * Citas en local storage
 * solo almacena string se tiene que parcear con json
 */
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  /**
   * Arreglo con citas a mostar en el listado
   */
  const [citas, guardarCitas] = useState(citasIniciales);
  /**
   * Función que toma la cita actual y toma la nueva
  */
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ]);
  };

  /**
   * Función que elimina una cita por su id
   * filtra el que es igual y lo guarda en un arreglo,
   * 1, 2, 3 => eliminaria el 1 y el 2
   * por eso se busca el diferente al id guardaria en el arreglo los diferentes
   */

  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  /**
   * Mensaje cuando no hay citas
   */
  const titulo = citas.length === 0 ? 'No hay Citas' : 'Administra tus Citas'

  /**
   * Cambios en Citas
   */
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas))
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas])


  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h1>{titulo}</h1>
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>

    </Fragment>
  );
}

export default App;
