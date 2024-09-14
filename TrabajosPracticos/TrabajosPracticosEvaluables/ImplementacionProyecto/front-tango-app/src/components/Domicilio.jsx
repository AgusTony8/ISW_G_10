import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { domiciliosService } from '../services/domicilios.service.js';

import InputTexto from './InputTexto.jsx';
import ListaDesplegable from './ListaDesplegable.jsx';
import ListaSugerencias from './ListaSugerencias.jsx';

const Domicilio = () => {
    const [provincias, setProvincias] = useState([]);
    const [inputLocalidad, setInputLocalidad] = useState("");
    const [inputCalle, setInputCalle] = useState("");
    const [localidadesOriginales, setLocalidadesOriginales] = useState([]);
    const [localidadesFiltradas, setLocalidadesFiltradas] = useState([]);
    const [callesOriginales, setCallesOriginales] = useState([]);
    const [callesFiltradas, setCallesFiltradas] = useState([]);
    const [errorLocalidad, setErrorLocalidad] = useState(''); // Estado para el mensaje de error
    const [errorCalle, setErrorCalle] = useState(''); // Estado para el mensaje de error


    async function BuscarLocalidades(idProvincia) {
        const response = await domiciliosService.LocalidadesPorProvincia(idProvincia);
        setLocalidadesOriginales(response.localidades)
        setLocalidadesFiltradas(response.localidades)
    }

    async function BuscarCalles(idProvincia, idLocalCensal) {
        const response = await domiciliosService.CallePorProvinciaYLocalidad(idProvincia, idLocalCensal)
        setCallesOriginales(response.calles)
        setCallesFiltradas(response.calles)
    }
    // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
    useEffect(() => {
        async function BuscarProvincias() {
        const response = await domiciliosService.ObtenerProvincias();
        setProvincias(response.provincias);
        }
        BuscarProvincias()
    }, []);


    const provinciasSelect = provincias.map( provincia => ({
        val: provincia.id,
        text: provincia.nombre
    }))

    const handleProvinciaChange = (event) => {
        const idProvincia = event.target.value;
        BuscarLocalidades(idProvincia)
      };

    const handleInputChangeLocalidad = (event) => {
        let value = event.target.value;
        setInputLocalidad(value);
        if (localidadesFiltradas && Array.isArray(localidadesFiltradas)) {
            // Si hay un valor en el input, filtrar las localidades
            const filtrado = localidadesOriginales.filter(localidad =>
                localidad.nombre.toLowerCase().startsWith(value.toLowerCase())
            )
            setLocalidadesFiltradas(filtrado);
            if (filtrado.length === 0) {
                 setErrorLocalidad('No se encontró la localidad.');
            } else {
                setErrorLocalidad(''); // Limpiar el mensaje de error si hay resultados
            }
        }
        else if (value.length === 0){
                // Si el input está vacío, restablecer todas las localidades
                setLocalidadesFiltradas(localidadesOriginales);
                setErrorLocalidad(''); // Limpiar el mensaje de error
            }
     }

     const handleInputChangeCalle = (event) => {
        let value = event.target.value;
        setInputCalle(value);
        if (callesFiltradas && Array.isArray(callesFiltradas)) {
            // Si hay un valor en el input, filtrar las localidades
            const filtrado = callesOriginales.filter(calle =>
                calle.nombre.toLowerCase().startsWith(value.toLowerCase())
            )
            setCallesFiltradas(filtrado);
            if (filtrado.length === 0) {
                setErrorCalle('No se encontró la calle.');
           } else {
               setErrorCalle(''); // Limpiar el mensaje de error si hay resultados
           }
        }
        else if (value.length === 0){
                // Si el input está vacío, restablecer todas las localidades
                setCallesFiltradas(callesOriginales);
                setErrorCalle(''); // Limpiar el mensaje de error
            }
     }

  // Manejar la selección de una sugerencia
  const handleSuggestionClickLocalidad = (localidad) => {
    setInputLocalidad(localidad.nombre); // Actualizar el input con el nombre seleccionado
    BuscarCalles(localidad.provincia.id, localidad.localidad_censal.id)
    setLocalidadesFiltradas([]); // Ocultar la lista de sugerencias
    setErrorLocalidad(''); // Limpiar el mensaje de error al seleccionar una localidad
    };
    // Determinar las clases para el input y el mensaje de error
  const inputClassLocalidad = errorLocalidad ? 'form-control is-invalid' : 'form-control';
  const feedbackClassLocalidad = errorLocalidad ? 'invalid-feedback' : '';
   // Manejar la selección de una sugerencia
   const handleSuggestionClickCalle = (calle) => {
    setInputCalle(calle.nombre); // Actualizar el input con el nombre seleccionado
    setCallesFiltradas([]); // Ocultar la lista de sugerencias
    setErrorCalle(''); // Limpiar el mensaje de error
    };
    const inputClassCalle = errorCalle ? 'form-control is-invalid' : 'form-control';
    const feedbackClassCalle = errorCalle ? 'invalid-feedback' : '';

    return (
        <>
            <ListaDesplegable opc={provinciasSelect} titulo="Seleccione una provincia" onChange={handleProvinciaChange}></ListaDesplegable>
            <div>
                <InputTexto titulo="Localidad" value={inputLocalidad} label="Localidad" onChange={handleInputChangeLocalidad} valido={inputClassLocalidad}></InputTexto>
                {errorLocalidad && <div className={feedbackClassLocalidad}>{errorLocalidad}</div>} {/* Mostrar el mensaje de error */}
                <ListaSugerencias
                items={localidadesFiltradas} // Pasar las localidades filtradas
                getKey={(localidad) => localidad.id} // Función para obtener el key (id)
                getDisplayValue={(localidad) => localidad.nombre} // Función para obtener el nombre a mostrar
                onItemClick={handleSuggestionClickLocalidad} // Función para manejar el clic en la sugerencia
                />
            </div>
            <h5>Direccion</h5>
            <div className="input-group mb-3">
                <input type="text" className={inputClassCalle} placeholder="Calle" value={inputCalle} onChange={handleInputChangeCalle} aria-label="Calle"></input>
                {errorCalle && <div className={feedbackClassCalle}>{errorCalle}</div>} {/* Mostrar el mensaje de error */}
                <ListaSugerencias
                items={callesFiltradas} // Pasar las localidades filtradas
                getKey={(calle) => calle.id} // Función para obtener el key (id)
                getDisplayValue={(calle) => calle.nombre} // Función para obtener el nombre a mostrar
                onItemClick={handleSuggestionClickCalle} // Función para manejar el clic en la sugerencia
                />
                <input type="text" className="form-control" placeholder="Número" aria-label="Número"></input>
            </div>
            <div className="form-floating">
                <textarea 
                    className="form-control" 
                    placeholder="Leave a comment here" 
                    id="floatingTextarea2" 
                    style={{ height: '100px' }}
                ></textarea>
                <label htmlFor="floatingTextarea2">Referencia</label>
            </div>
            <h5>Fecha</h5>
            <input type="date" className="form-control" placeholder="Fecha de retiro" aria-label="Fecha Retiro"></input>

        </>
    )
}

export default Domicilio