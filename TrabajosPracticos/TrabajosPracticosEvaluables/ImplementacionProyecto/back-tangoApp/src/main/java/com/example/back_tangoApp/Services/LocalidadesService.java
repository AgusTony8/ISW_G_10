package com.example.back_tangoApp.Services;

import com.example.back_tangoApp.Entities.Transportista;
import com.example.back_tangoApp.Repositories.LocalidadRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
@AllArgsConstructor
public class LocalidadesService {

    private final LocalidadRepository localidadRepository;

    public ArrayList<Transportista> getTransportistasLocalidad(String id_localidad) {
        Optional<ArrayList<Transportista>> transportistasLocalidad = localidadRepository.findById(id_localidad)
                .map(localidades -> new ArrayList<>(localidades.getTransportistasLocalidad()));
        return transportistasLocalidad.orElseGet(ArrayList::new);
    }
}
