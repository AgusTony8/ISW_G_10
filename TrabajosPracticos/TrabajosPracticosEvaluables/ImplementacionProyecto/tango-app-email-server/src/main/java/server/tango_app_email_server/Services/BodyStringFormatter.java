package server.tango_app_email_server.Services;

import server.tango_app_email_server.Services.Dtos.EmailBodyDto;

public class BodyStringFormatter {

    public String bodyToString(EmailBodyDto emailBodyDto) {
        return "Nuevo pedido para retiro en una de tus localidades!" + "\n" +
                "Ingresa a la app para mas detalles, a continuacion un breve resumen:" + "\n" +
                "Fecha de retiro: " + emailBodyDto.getFechaRetiro() + "\n" +
                "Fecha de entrega: " + emailBodyDto.getFechaEntrega() + "\n" +
                "Dador de carga: " + emailBodyDto.getDadorDeCarga().getNombre() + " " + emailBodyDto.getDadorDeCarga().getApellido() + "\n" +
                "Sexo: " + emailBodyDto.getDadorDeCarga().getSexo() + "\n" +
                "Nro de documento: " + emailBodyDto.getDadorDeCarga().getNroDocumento() + "\n" +
                "Tipo de carga: " + emailBodyDto.getTipoDeCarga();
    }

}
