package com.example.back_tangoApp.Repositories;

import com.example.back_tangoApp.Entities.DadorDeCarga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DadorRespository extends JpaRepository<DadorDeCarga, Long> {
}
