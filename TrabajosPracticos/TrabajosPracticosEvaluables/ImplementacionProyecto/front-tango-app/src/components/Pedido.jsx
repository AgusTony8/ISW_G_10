import React, { useState } from 'react';
import Domicilio from './Domicilio';
import ListaDesplegable from './ListaDesplegable.jsx';
import '../styles/formStyles.css'

let tiposDeCarga = [
  { val: 1, text: "Documentacion" },
  { val: 2, text: "Paquete" },
  { val: 3, text: "Granos" },
  { val: 4, text: "Hacienda" }
];

const Pedido = () => {
  const [fechaRetiro, setFechaRetiro] = useState('');
  const [fechaEnvio, setFechaEnvio] = useState('');
  const [errorFecha, setErrorFecha] = useState('');
  const [tipoDeCargaSeleccionado, setTipoDeCargaSeleccionado] = useState('');
  const [domicilioRetiro, setDomicilioRetiro] = useState({});
  const [domicilioEnvio, setDomicilioEnvio] = useState({});
  const [images, setImages] = useState([]);


  const handleChangeTipoCarga = (event) => {
    // Llama a la función pasada por props para notificar el cambio
        setTipoDeCargaSeleccionado(event.target.value)
  };

  const handleDomicilioChange = (domicilio, isEnvio = false) => {
    if (isEnvio) {
        setDomicilioEnvio(domicilio);
    } else {
        setDomicilioRetiro(domicilio);
    }
};

  const handleFechaChange = (fecha, isEnvio = false) => {
    if (isEnvio) {
      setFechaEnvio(fecha);
    } else {
      setFechaRetiro(fecha);
    }
  };


  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (images.length + files.length > 3) {
      alert('Solo puedes subir un máximo de 3 imágenes en total.');
      return;
    }

    const newImages = files.filter((file) => {
      if (!validImageTypes.includes(file.type)) {
        alert('Solo se permiten archivos de imagen (JPEG, PNG, GIF).');
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert('Cada imagen debe ser menor a 10MB.');
        return false;
      }
      return true;
    });

    setImages((prevImages) => [...prevImages, ...newImages].slice(0, 3)); // Limita a 3 imágenes
  };

  const handleImageRemove = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Compare the two dates
    if (new Date(fechaRetiro) > new Date(fechaEnvio)) {
      setErrorFecha('La fecha de retiro debe ser anterior a la fecha de envío.');
    } else {
      setErrorFecha('');
      // Crea el objeto JSON con el valor del tipo de carga seleccionado
      const data = {
        "tipoDeCarga": tipoDeCargaSeleccionado,
        "domicilioRetiro": domicilioRetiro,
        "domicilioEntrega": domicilioEnvio,
        "fechaRetiro": fechaRetiro,
        "fechaEntrega": fechaEnvio
      };
      // Submit the form or perform further actions
      console.log('Form submitted with valid dates', data);
    }
  };


  return (
    <div className="container text-center my-4">
      <h2 id="titulo">Publicar Pedido de Envío</h2>
      <form onSubmit={handleSubmit}>
        <div className="text-start mt-4">
          <ListaDesplegable opc={tiposDeCarga} titulo="Seleccione un tipo de carga" onChange={handleChangeTipoCarga}></ListaDesplegable>
          
          <hr></hr>
          <div className="container my-4" id="cont-datos">
            <h3>Datos del Retiro</h3>
            <Domicilio onFechaChange={(fecha) => handleFechaChange(fecha)} onDomicilioChange={(domicilio) => handleDomicilioChange(domicilio)}/>
          </div>
          <hr></hr>
          <div className="container my-4" id="cont-datos">
            <h3>Datos del Envio</h3>
            <Domicilio onFechaChange={(fecha) => handleFechaChange(fecha, true)} onDomicilioChange={(domicilio) => handleDomicilioChange(domicilio, true)}/>
          </div>

          {errorFecha && <div className="alert alert-danger">{errorFecha}</div>}
        
          <hr></hr>
          <h5 id='label-imagen'>Imagen del producto</h5>
          <label htmlFor="Imagenes" className="custom-file-upload btn btn-outline-primary">
            Subir Imágenes
          </label>
            <input type="file" id="Imagenes" onChange={handleImageUpload} multiple style={{display: 'none'}}/>
          <div className="image-preview">
        {images.map((image, index) => (
          <div key={index} className="image-container">
            <img
              src={URL.createObjectURL(image)}
              alt={`imagen-${index}`}
              style={{ width: '100px', height: '100px' }}
            />
            <button type='button' className='btn btn-outline-danger' onClick={() => handleImageRemove(index)}>Eliminar</button>
          </div>
        ))}
      </div>
            <div className='buttons'>
              <button type="submit" className="btn btn-primary btn-lg">Aceptar</button>
              <button type="button" className="btn btn-primary btn-lg">Cancelar</button>
              
            </div>
          </div>
          
      </form>
      <footer></footer>
    </div>
  );
};

export default Pedido;
