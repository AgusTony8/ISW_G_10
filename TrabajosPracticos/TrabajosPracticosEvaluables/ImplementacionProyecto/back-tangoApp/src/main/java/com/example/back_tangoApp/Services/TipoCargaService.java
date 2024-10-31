package com.example.back_tangoApp.Services;

import com.example.back_tangoApp.Entities.TipoCarga;
import com.example.back_tangoApp.Repositories.TipoCargaRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class TipoCargaService {

    private final TipoCargaRepository tipoCargaRepository;

    public TipoCarga getById(Long id) {
        Optional<TipoCarga> tipoCarga = this.tipoCargaRepository.findById(id);
        if (tipoCarga.isEmpty()) {
            throw new EntityNotFoundException("Tipo de carga no encontrado");
        }
        return tipoCarga.get();

    }

}
