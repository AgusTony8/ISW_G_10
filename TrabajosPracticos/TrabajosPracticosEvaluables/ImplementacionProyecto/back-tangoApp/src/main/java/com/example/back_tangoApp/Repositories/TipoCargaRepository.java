package com.example.back_tangoApp.Repositories;

import com.example.back_tangoApp.Entities.TipoCarga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TipoCargaRepository extends JpaRepository<TipoCarga, Long> {

}
