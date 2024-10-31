import {config} from "../config";
import httpService from "./http.service";

async function ObtenerProvincias() {
  const resp = await httpService.get(config.urlProvincias);
  return resp.data;
}

async function LocalidadesPorProvincia(idProvincia) {
  const resp = await httpService.get(config.urlLocalidades + '?provincia=' + idProvincia + '&' + 'max=' + 1000)
  return resp.data
}

async function CallePorProvinciaYLocalidad(idProvincia, id_localCensal){
  const resp =  await httpService.get(config.urlCalles + '?provincia=' + idProvincia + '&' + 'localidad_censal=' + id_localCensal + '&' + 'max=' + 5000)
  let callesFiltradas = resp.data.calles.filter(calle => !calle.nombre.toUpperCase().endsWith('S N'));
  return callesFiltradas
}

export const domiciliosService = {
    ObtenerProvincias, LocalidadesPorProvincia, CallePorProvinciaYLocalidad
  };
