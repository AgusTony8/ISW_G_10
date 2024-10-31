import {config} from "../config";
import httpService from "./http.service";

async function RegistrarPedido(pedido) {
    const resp = await httpService.post(config.urlPostPedido, pedido)
    return resp.data
}

export const pedidosService = {
    RegistrarPedido
};