package com.example.back_tangoApp.Entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonAppend;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="DADORES_DE_CARGAS")
@Entity
public class DadorDeCarga {
    @Id
    @GeneratedValue(generator = "DADORES_DE_CARGA")
    @TableGenerator(name = "DADORES_DE_CARGA", table = "sqlite_sequence",
            pkColumnName = "name", valueColumnName = "seq",
            pkColumnValue = "DADORES_DE_CARGA", allocationSize = 1,
            initialValue = 1)
    private Long idDador;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellido")
    private String apellido;

    @Column(name = "nro_documento")
    private String nroDocumento;

    @Column(name = "sexo")
    private String sexo;

    @Column(name = "nro_telefono")
    private String nroTelefono;

    @Column(name = "email")
    private String email;

    @OneToMany(mappedBy = "dadorDeCarga")
    @JsonIgnore
    private Set<Pedido> pedidos = new HashSet<>();

}
