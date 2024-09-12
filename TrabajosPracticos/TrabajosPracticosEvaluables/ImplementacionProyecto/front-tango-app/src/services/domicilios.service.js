import {config} from "../config";
import httpService from "./http.service";

async function ObtenerProvincias() {
  const resp = await httpService.get(config.urlProvincias);
  return resp.data;
}

async function LocalidadesPorProvincia(idProvincia) {
    const resp = await httpService.get(config.urlLocalidades + '?provincia=' + idProvincia + '&' + 'max=' + 514)
    return resp.data
}

export const domiciliosService = {
    ObtenerProvincias, LocalidadesPorProvincia
  };
