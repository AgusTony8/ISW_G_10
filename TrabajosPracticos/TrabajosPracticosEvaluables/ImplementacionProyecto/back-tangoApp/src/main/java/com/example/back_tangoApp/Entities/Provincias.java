package com.example.back_tangoApp.Entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="PROVINCIAS")
@Entity
public class Provincias {

    @Id
    private String id_provincia;

    @Column(name = "nombre")
    private String nombre;

    @OneToMany(mappedBy = "provincia")
    @JsonIgnore
    private List<Localidades> localidades = new ArrayList<>();

}
