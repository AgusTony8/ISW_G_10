import React, { useState } from 'react';
import Domicilio from './Domicilio';
import ListaDesplegable from './ListaDesplegable.jsx';
import '../styles/formStyles.css'
import appFirebase from "../credenciales.js";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { pedidosService } from '../services/pedidos.service.js';


const storage = getStorage(appFirebase);

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
  const [files, setFiles] = useState([]);
  const [peso, setPeso] = useState(0)
  const [toasts, setToasts] = useState([]);


  const handleChangeTipoCarga = (event) => {
    setTipoDeCargaSeleccionado(event.target.value);
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

  const saveInfo = async () => {
    let newFilesUrls = [];
    for (const file of files) {
      if (peso > 10) {
        alert(`El peso de las imágenes es mayor a 10 MB. Peso actual: ${peso}`);
        return;
      }

      // Cargar imagen al storage
      const refImagen = ref(storage, `images/${file.name}`);
      await uploadBytes(refImagen, file);

      // Obtener URL de la imagen
      let urlImgDownload = await getDownloadURL(refImagen);
      newFilesUrls.push(urlImgDownload);
    }
    setFiles([]);
    setPeso(0);
    return newFilesUrls;
  };

  const handleImageUpload = (e) => {
    const filesToAdd = Array.from(e.target.files);
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (files.length + filesToAdd.length > 3) {
      alert('Solo puedes subir un máximo de 3 imágenes en total.');
      return;
    }

    const newImages = filesToAdd.filter((file) => {
      if (!validImageTypes.includes(file.type)) {
        alert('Solo se permiten archivos de imagen (JPEG, PNG, JPG).');
        return false;
      }

      const newPeso = peso + (file.size / 1024 / 1024);
      if (newPeso > 10) {
        alert('El peso de las imágenes no puede superar los 10MB.');
        return false;
      }

      return true;
    });

    setPeso(peso + newImages.reduce((total, file) => total + (file.size / 1024 / 1024), 0));
    setFiles((prevFiles) => [...prevFiles, ...newImages]);
  };

  const handleImageRemove = (index) => {
    const imageToRemove = files[index];
    setFiles(files.filter((_, i) => i !== index));
    setPeso(peso - (imageToRemove.size / 1024 / 1024));
    // Resetea el valor del input de archivos para permitir volver a agregar la imagen
    document.getElementById("fileInput").value = "";
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getUTCDate()).padStart(2, '0');
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const year = d.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleCloseToast = (indexToRemove) => {
    setToasts((prevToasts) => prevToasts.filter((_, index) => index !== indexToRemove));
  };

  const PublicarPedido = async (pedido) => {
    const response = await pedidosService.RegistrarPedido(pedido)
    return response
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Llamar a saveInfo y esperar su finalización
    const urls = await saveInfo();

    // Obtener fecha actual
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Quitar las horas, minutos, segundos para comparar solo la fecha
    console.log(today)

    // Convertir las fechas seleccionadas
    const fechaRetiroDate = new Date(fechaRetiro + 'T00:00:00');
    fechaRetiroDate.setHours(0, 0, 0, 0);
    console.log(fechaRetiroDate)

    const fechaEnvioDate = new Date(fechaEnvio + 'T00:00:00');
    fechaEnvioDate.setHours(0, 0, 0, 0);
    // Validar que ambas fechas sean mayores o iguales a la fecha actual
    if (fechaRetiroDate < today || fechaEnvioDate < today) {
      setErrorFecha('Las fechas deben ser iguales o mayores a la fecha actual.');
      return;
    }

      // Validar que la fecha de retiro sea anterior a la de envío
      if (fechaRetiroDate > fechaEnvioDate) {
      setErrorFecha('La fecha de retiro debe ser anterior a la fecha de envío.');
      return;
    }

      setErrorFecha('');
      const verificarDomicilio = (domicilio) => {
        return Object.entries(domicilio).every(([key, value]) => {
          if (key === "referencia" || key === "numero") return true;
          return value !== "";
        });
      };
      
      const domicilioRetiroValido = verificarDomicilio(domicilioRetiro);
      const domicilioEnvioValido = verificarDomicilio(domicilioEnvio);
      if (tipoDeCargaSeleccionado === '' || tipoDeCargaSeleccionado === isNaN || !domicilioRetiroValido || !domicilioEnvioValido || fechaRetiro === '' || fechaEnvio === '')
      {
        alert('No se ha completado el formulario con los valores correspondientes')
        return false
      }
      const data = {
        "tipoDeCarga": parseInt(tipoDeCargaSeleccionado),
        "domicilioRetiro": domicilioRetiro,
        "domicilioEntrega": domicilioEnvio,
        "fechaRetiro": formatDate(fechaRetiro),
        "fechaEntrega": formatDate(fechaEnvio),
        "urlImagenes": urls,
        "dadorDeCarga": 1
      };
      const response = await PublicarPedido(data)
      if (response.transportistasANotificar.length > 0) {
        const toastMessages = response.transportistasANotificar.map((transportista) => 
          `Notificación enviada al transportista ${transportista}`
        );
        setToasts(toastMessages);
        // Resetea el valor del input de archivos para permitir volver a agregar la imagen
        document.getElementById("fileInput").value = "";
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
          <label htmlFor="fileInput" className="custom-file-upload btn btn-outline-primary">
            Subir Imágenes
          </label>
          <input type="file" id="fileInput" onChange={handleImageUpload} multiple style={{display: 'none'}}/>
          <div className="image-preview">
            {files.map((image, index) => (
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
      {toasts.length > 0 && (
      <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 11 }}>
        {toasts.map((message, index) => (
          <div key={index} className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <strong className="me-auto">Notificacion</strong>
              <small>Justo ahora</small>
              <button type="button" className="btn-close" onClick={() => handleCloseToast(index)} aria-label="Close"></button>
            </div>
            <div className="toast-body">
              {message}
            </div>
          </div>
        ))}
      </div>
    )}
      <footer></footer>
    </div>
  );
};

export default Pedido;

