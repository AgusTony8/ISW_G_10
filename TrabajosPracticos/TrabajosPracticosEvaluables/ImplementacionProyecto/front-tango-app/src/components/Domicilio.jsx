import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { domiciliosService } from '../services/domicilios.service.js';

import InputTexto from './InputTexto.jsx';
import ListaDesplegable from './ListaDesplegable.jsx';

const Domicilio = () => {
    const [datosProvincias, setProvincias] = useState({ provincias: [] });
    const [inputValue, setInputValue] = useState("");
    const [datoslocalidades, setLocalidades] = useState([]);
    
    async function BuscarLocalidades(idProvincia) {
        const response = await domiciliosService.LocalidadesPorProvincia(idProvincia);
        setLocalidades(response)
    }

    // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
    useEffect(() => {
        async function BuscarProvincias() {
        const response = await domiciliosService.ObtenerProvincias();
        setProvincias(response);
        }
        BuscarProvincias()
    }, []);


    const provincias = datosProvincias.provincias.map( provincia => ({
        val: provincia.id,
        text: provincia.nombre
    }))

    const handleProvinciaChange = (event) => {
        const idProvincia = event.target.value;
        BuscarLocalidades(idProvincia)
      };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        // Filtrar localidades por nombre
        if (value.length > 0 && datoslocalidades && Array.isArray(datoslocalidades.localidades)) {
        console.log(datoslocalidades)
        const filtrado = datoslocalidades.localidades.filter(localidad =>
            localidad.nombre.toLowerCase().includes(value.toLowerCase())
        );
        setLocalidades(filtrado);
        };
    }

    // Manejar la selección de una sugerencia
  const handleSuggestionClick = (localidad) => {
    setInputValue(localidad.nombre); // Actualizar el input con el nombre seleccionado
    setLocalidades([]); // Ocultar la lista de sugerencias
    };

    return (
        <>
            <ListaDesplegable opc={provincias} titulo="Seleccione una provincia" onChange={handleProvinciaChange}></ListaDesplegable>
            <div>
                <InputTexto titulo="Localidad" value={inputValue} label="Localidad" onChange={handleInputChange}></InputTexto>
                {/* Lista de sugerencias */}
                {datoslocalidades.length > 0 && (
                    <ul className="suggestions-list">
                    {datoslocalidades.map(localidad => (
                        <li
                        key={localidad.id}
                        onClick={() => handleSuggestionClick(localidad)}
                        >
                        {localidad.nombre}
                        </li>
                    ))}
                    </ul>
                )}
            </div>
            <h5>Direccion</h5>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Calle" aria-label="Calle"></input>
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