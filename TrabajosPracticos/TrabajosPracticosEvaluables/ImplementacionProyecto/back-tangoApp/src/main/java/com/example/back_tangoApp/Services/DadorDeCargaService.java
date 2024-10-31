package com.example.back_tangoApp.Services;

import com.example.back_tangoApp.Entities.DadorDeCarga;
import com.example.back_tangoApp.Repositories.DadorRespository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@AllArgsConstructor
@Service
public class DadorDeCargaService {

    private final DadorRespository dadorRespository;

    public DadorDeCarga getById(Long id) {
        Optional<DadorDeCarga> dadorDeCarga = this.dadorRespository.findById(id);
        if (dadorDeCarga.isEmpty()) {
            throw new EntityNotFoundException("Dador de carga no encontrado");
        }
        return dadorDeCarga.get();
    }

}
