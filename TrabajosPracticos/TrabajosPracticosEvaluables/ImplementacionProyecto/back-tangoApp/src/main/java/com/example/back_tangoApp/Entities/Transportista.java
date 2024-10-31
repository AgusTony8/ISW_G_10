package com.example.back_tangoApp.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="TRANSPORTISTAS")
@Entity
public class Transportista {

    @Id
    @GeneratedValue(generator = "TRANSPORTISTAS")
    @TableGenerator(name = "TRANSPORTISTAS", table = "sqlite_sequence",
            pkColumnName = "name", valueColumnName = "seq",
            pkColumnValue = "TRANSPORTISTAS", allocationSize = 1,
            initialValue = 1)
    private Long idTransportistas;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellido")
    private String apellido;

    @Column(name = "email")
    private String email;

    @Column(name = "vehiculo")
    private String vehiculo;

    @Column(name="cbu")
    private String cbu;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "TRANSPORTISTAS_X_LOCALIDAD",
            joinColumns = @JoinColumn(name = "id_transportistas"),
            inverseJoinColumns = @JoinColumn(name = "id_localidad")
    )
    private List<Localidades> localidadesTransportista  = new ArrayList<>();
}
