package com.example.back_tangoApp.Services;

import com.example.back_tangoApp.Entities.Transportista;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@AllArgsConstructor
public class TransportistasService {
    private final LocalidadesService localidadesService;

    public ArrayList<String> getEmailTransportistasByLocalidadId(String id_localidad) {

        ArrayList<Transportista> transportistas = localidadesService.getTransportistasLocalidad(id_localidad);
        ArrayList<String> emails = new ArrayList<>();

        transportistas.forEach(transportista -> emails.add(transportista.getEmail()));

        return emails;
    }

}
