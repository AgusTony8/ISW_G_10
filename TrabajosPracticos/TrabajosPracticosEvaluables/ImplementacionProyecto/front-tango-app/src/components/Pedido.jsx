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
  const [peso, setPeso] = useState(0);

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
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getUTCDate()).padStart(2, '0');
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const year = d.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };


  const PublicarPedido = async (pedido) => {
    const response = await pedidosService.RegistrarPedido(pedido)
    console.log(pedido)
    console.log(response)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Llamar a saveInfo y esperar su finalización
    const urls = await saveInfo();

    // Obtener fecha actual
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Quitar las horas, minutos, segundos para comparar solo la fecha

    // Convertir las fechas seleccionadas
    const fechaRetiroDate = new Date(fechaRetiro);
    const fechaEnvioDate = new Date(fechaEnvio);
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
      PublicarPedido(data)
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
      <footer></footer>
    </div>
  );
};

export default Pedido;

