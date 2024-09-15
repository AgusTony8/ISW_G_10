import React, { useEffect, useState } from 'react';
import { domiciliosService } from '../services/domicilios.service.js';
import InputTexto from './InputTexto.jsx';
import ListaDesplegable from './ListaDesplegable.jsx';
import ListaSugerencias from './ListaSugerencias.jsx';

const Domicilio = ({onFechaChange,  onDomicilioChange,
    isDomicilioEnvio = false}) => {
    const [provincias, setProvincias] = useState([]);
    const [provincia, setProvincia] = useState(null);
    const [inputLocalidad, setInputLocalidad] = useState("");
    const [inputCalle, setInputCalle] = useState("");
    const [inputNumero, setInputNumero] = useState("");
    const [localidadesOriginales, setLocalidadesOriginales] = useState([]);
    const [localidadesFiltradas, setLocalidadesFiltradas] = useState([]);
    const [callesOriginales, setCallesOriginales] = useState([]);
    const [callesFiltradas, setCallesFiltradas] = useState([]);
    const [errorLocalidad, setErrorLocalidad] = useState(''); // Estado para el mensaje de error
    const [errorCalle, setErrorCalle] = useState('');
    const [errorNumero, setErrorNumero] = useState('');
    const [isSnChecked, setIsSnChecked] = useState(false); // Estado para el checkbox S/N
    const [idProvincia, setIdProvincia] = useState(null);
    const [idLocalidad, setIdLocalidad] = useState(null);
    const [referencia, setReferencia] = useState(""); // Estado para referencia

  async function BuscarLocalidades(idProvincia) {
    const response = await domiciliosService.LocalidadesPorProvincia(idProvincia);
    setLocalidadesOriginales(response.localidades);
    setLocalidadesFiltradas(response.localidades);
    setInputLocalidad('')
    setInputCalle('')
  }

  async function BuscarCalles(idProvincia, idLocalCensal) {
    const response = await domiciliosService.CallePorProvinciaYLocalidad(idProvincia, idLocalCensal);
    setCallesOriginales(response);
    setCallesFiltradas(response);
    setInputCalle('')
  }

  useEffect(() => {
    async function BuscarProvincias() {
      const response = await domiciliosService.ObtenerProvincias();
      setProvincias(response.provincias);
    }
    BuscarProvincias();
  }, []);

  const provinciasSelect = provincias.map(provincia => ({
    val: provincia.id,
    text: provincia.nombre
  }));

  const handleProvinciaChange = (event) => {
    const idProvincia = event.target.value;
    const provincia = event.target.options[event.target.selectedIndex].text
    setIdProvincia(idProvincia)
    setProvincia(provincia)
    BuscarLocalidades(idProvincia);
  };

  const handleInputChangeLocalidad = (event) => {
    let value = event.target.value;
    setInputLocalidad(value);
    if (localidadesFiltradas && Array.isArray(localidadesFiltradas)) {
      const filtrado = localidadesOriginales.filter(localidad =>
        localidad.nombre.toLowerCase().startsWith(value.toLowerCase())
      );
      setLocalidadesFiltradas(filtrado);
      if (filtrado.length === 0) {
        setErrorLocalidad('No se encontró la localidad.');
      } else {
        setErrorLocalidad('');
      }
    } else if (value.length === 0) {
      setLocalidadesFiltradas(localidadesOriginales);
      setErrorLocalidad('');
    }
  };

  const handleInputChangeCalle = (event) => {
    let value = event.target.value;
    setInputCalle(value);
    if (callesFiltradas && Array.isArray(callesFiltradas)) {
      const filtrado = callesOriginales.filter(calle =>
        calle.nombre.toLowerCase().startsWith(value.toLowerCase())
      );
      setCallesFiltradas(filtrado);
      if (filtrado.length === 0) {
        setErrorCalle('No se encontró la calle.');
      } else {
        setErrorCalle('');
      }
    } else if (value.length === 0) {
      setCallesFiltradas(callesOriginales);
      setErrorCalle('');
    }
  };


    function handleInputChangeNumero(event) {
        const value = event.target.value;
        
        // Permitir solo números enteros positivos
        if (/^\d*$/.test(value)) {
            setInputNumero(value); // Esta es la función que maneja el estado del input
            setErrorNumero('')
        }
        else if(value.length !== 0) setErrorNumero('Se deben ingresar solo números')
    }

    const inputClassNumero = errorNumero ? 'form-control is-invalid' : 'form-control';
    const feedbackClassNumero = errorNumero ? 'invalid-feedback' : '';
    

    const handleCheckboxChange = (event) => {
        setIsSnChecked(event.target.checked);
        if (event.target.checked) {
            setInputNumero(''); // Limpiar el valor del input número cuando el checkbox está marcado
        }
    };

     // Manejar el cambio de la referencia
     const handleReferenciaChange = (event) => {
        console.log(event.target.value)
        setReferencia(event.target.value);
    };

  // Manejar la selección de una sugerencia
  const handleSuggestionClickLocalidad = (localidad) => {
    setInputLocalidad(localidad.nombre);
    BuscarCalles(localidad.provincia.id, localidad.localidad_censal.id);
    setIdLocalidad(localidad.id)
    setLocalidadesFiltradas([]);
    setErrorLocalidad('');
  };

  const handleSuggestionClickCalle = (calle) => {
    setInputCalle(calle.nombre);
    setCallesFiltradas([]);
    setErrorCalle('');
  };

  const handleFechaChange = (event) => {
    const selectedDate = event.target.value;
    onFechaChange(selectedDate, isDomicilioEnvio);
  };

  useEffect(() => {
    if (onDomicilioChange) {
        onDomicilioChange({
            provincia: provincia,
            idProvincia: idProvincia,
            localidad: inputLocalidad,
            idLocalidad: idLocalidad,
            calle: inputCalle,
            numero: inputNumero,
            referencia: referencia
        });
    }
}, [idProvincia, idLocalidad, provincia, inputLocalidad, inputCalle, inputNumero, isSnChecked, referencia]);


  const inputClassLocalidad = errorLocalidad ? 'form-control is-invalid' : 'form-control';
  const feedbackClassLocalidad = errorLocalidad ? 'invalid-feedback' : '';

  const inputClassCalle = errorCalle ? 'form-control is-invalid' : 'form-control';
  const feedbackClassCalle = errorCalle ? 'invalid-feedback' : '';

    return (
        <>
            <ListaDesplegable opc={provinciasSelect} titulo="Seleccione una provincia" onChange={handleProvinciaChange}></ListaDesplegable>
            <div>
                <h5>Localidad</h5>
                <InputTexto placeholder="Localidad" value={inputLocalidad} label="Localidad" onChange={handleInputChangeLocalidad} valido={inputClassLocalidad}
                error={errorLocalidad} feedbackClass={feedbackClassLocalidad} disabled={false}></InputTexto>
                <ListaSugerencias
                items={localidadesFiltradas} // Pasar las localidades filtradas
                getKey={(localidad) => localidad.id} // Función para obtener el key (id)
                getDisplayValue={(localidad) => localidad.nombre} // Función para obtener el nombre a mostrar
                onItemClick={handleSuggestionClickLocalidad} // Función para manejar el clic en la sugerencia
                />
            </div>
            <h5>Direccion</h5>
            <div className="input-group row mb-3">
                <div className='col-md-9'>
                <InputTexto placeholder="Calle" value={inputCalle} label="Calle" onChange={handleInputChangeCalle} valido={inputClassCalle}
                error={errorCalle} feedbackClass={feedbackClassCalle} disabled={false}></InputTexto>
                </div>
                <ListaSugerencias
                items={callesFiltradas} // Pasar las localidades filtradas
                getKey={(calle) => calle.id} // Función para obtener el key (id)
                getDisplayValue={(calle) => calle.nombre} // Función para obtener el nombre a mostrar
                onItemClick={handleSuggestionClickCalle} // Función para manejar el clic en la sugerencia
                />
                <div className='col-md-3'>
                <InputTexto placeholder="Número" value={inputNumero} label="Número" onChange={handleInputChangeNumero} valido={inputClassNumero}
                error={errorNumero} feedbackClass={feedbackClassNumero} disabled={isSnChecked}></InputTexto>
                <div className="form-check mt-2">
                    <input 
                        type="checkbox" 
                        className="form-check-input" 
                        id="snCheckbox" 
                        checked={isSnChecked} 
                        onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="snCheckbox">S/N</label>
                </div>
                </div>
            </div>
            <div className="form-floating">
                <textarea 
                    className="form-control" 
                    placeholder="Leave a comment here" 
                    id={`floatingTextarea-${isDomicilioEnvio ? 'envio' : 'retiro'}`} // ID dinámico
                    value={referencia}
                    style={{ height: '100px' }}
                    onChange={handleReferenciaChange}
                ></textarea>
                <label htmlFor={`floatingTextarea-${isDomicilioEnvio ? 'envio' : 'retiro'}`}>Referencia</label>
            </div>
            <h5>Fecha</h5>
            <input type="date" className="form-control" placeholder="Fecha de retiro" aria-label="Fecha Retiro" onChange={handleFechaChange}></input>
        </>
)
}

export default Domicilio;
