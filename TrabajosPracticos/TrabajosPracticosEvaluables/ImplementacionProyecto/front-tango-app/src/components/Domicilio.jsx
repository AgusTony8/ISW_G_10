import React, { useEffect, useState } from 'react';
import { domiciliosService } from '../services/domicilios.service.js';
import InputTexto from './InputTexto.jsx';
import ListaDesplegable from './ListaDesplegable.jsx';
import ListaSugerencias from './ListaSugerencias.jsx';

const Domicilio = ({ onFechaChange }) => {
  const [provincias, setProvincias] = useState([]);
  const [inputLocalidad, setInputLocalidad] = useState("");
  const [inputCalle, setInputCalle] = useState("");
  const [localidadesOriginales, setLocalidadesOriginales] = useState([]);
  const [localidadesFiltradas, setLocalidadesFiltradas] = useState([]);
  const [callesOriginales, setCallesOriginales] = useState([]);
  const [callesFiltradas, setCallesFiltradas] = useState([]);
  const [errorLocalidad, setErrorLocalidad] = useState('');
  const [errorCalle, setErrorCalle] = useState('');

  async function BuscarLocalidades(idProvincia) {
    const response = await domiciliosService.LocalidadesPorProvincia(idProvincia);
    setLocalidadesOriginales(response.localidades);
    setLocalidadesFiltradas(response.localidades);
  }

  async function BuscarCalles(idProvincia, idLocalCensal) {
    const response = await domiciliosService.CallePorProvinciaYLocalidad(idProvincia, idLocalCensal);
    setCallesOriginales(response.calles);
    setCallesFiltradas(response.calles);
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

  const handleSuggestionClickLocalidad = (localidad) => {
    setInputLocalidad(localidad.nombre);
    BuscarCalles(localidad.provincia.id, localidad.localidad_censal.id);
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
    onFechaChange(selectedDate);
  };

  const inputClassLocalidad = errorLocalidad ? 'form-control is-invalid' : 'form-control';
  const feedbackClassLocalidad = errorLocalidad ? 'invalid-feedback' : '';
  const inputClassCalle = errorCalle ? 'form-control is-invalid' : 'form-control';
  const feedbackClassCalle = errorCalle ? 'invalid-feedback' : '';

  return (
    <>
      <ListaDesplegable opc={provinciasSelect} titulo="Seleccione una provincia" onChange={handleProvinciaChange} />
      <div>
        <InputTexto titulo="Localidad" value={inputLocalidad} label="Localidad" onChange={handleInputChangeLocalidad} valido={inputClassLocalidad} />
        {errorLocalidad && <div className={feedbackClassLocalidad}>{errorLocalidad}</div>}
        <ListaSugerencias items={localidadesFiltradas} getKey={(localidad) => localidad.id} getDisplayValue={(localidad) => localidad.nombre} onItemClick={handleSuggestionClickLocalidad} />
      </div>
      <h5>Direccion</h5>
      <div className="input-group mb-3">
        <input type="text" className={inputClassCalle} placeholder="Calle" value={inputCalle} onChange={handleInputChangeCalle} aria-label="Calle" />
        {errorCalle && <div className={feedbackClassCalle}>{errorCalle}</div>}
        <ListaSugerencias items={callesFiltradas} getKey={(calle) => calle.id} getDisplayValue={(calle) => calle.nombre} onItemClick={handleSuggestionClickCalle} />
        <input type="text" className="form-control" placeholder="Número" aria-label="Número" />
      </div>
      <div className="form-floating">
        <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: '100px' }}></textarea>
        <label htmlFor="floatingTextarea2">Referencia</label>
      </div>
      <h5>Fecha</h5>
      <input type="date" className="form-control" placeholder="Fecha de retiro" aria-label="Fecha Retiro" onChange={handleFechaChange} />
    </>
  );
};

export default Domicilio;
