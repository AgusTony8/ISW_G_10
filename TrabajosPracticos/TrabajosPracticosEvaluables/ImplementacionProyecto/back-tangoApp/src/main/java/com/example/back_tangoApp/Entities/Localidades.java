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
@Table(name="LOCALIDADES")
@Entity
public class Localidades {

    @Id
    private String id_localidad;

    @ManyToOne
    @JoinColumn(name = "id_provincia")
    private Provincias provincia;

    @Column(name = "nombre")
    private String nombre;

    @ManyToMany(mappedBy = "localidadesTransportista")
    @JsonIgnore
    private List<Transportista> transportistasLocalidad  = new ArrayList<>();
}
