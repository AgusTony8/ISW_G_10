package com.example.back_tangoApp.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="TIPOS_CARGAS")
public class TipoCarga {
    @Id
    @GeneratedValue(generator = "TIPOS_CARGAS")
    @TableGenerator(name = "TIPOS_CARGAS", table = "sqlite_sequence",
            pkColumnName = "name", valueColumnName = "seq",
            pkColumnValue = "TIPOS_CARGAS", allocationSize = 1,
            initialValue = 1)
    private Long idTipoCarga;

    @Column(name = "nombre")
    private String nombre;

    @OneToMany(mappedBy = "tipoDeCarga")
    @JsonIgnore
    private Set<Pedido> pedidos = new HashSet<>();
}
