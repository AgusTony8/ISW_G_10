package com.example.back_tangoApp.Repositories;

import com.example.back_tangoApp.Entities.Imagen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImagenRepository extends JpaRepository<Imagen, Long> {
}
